'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  CONVERSION_EVENTS,
  trackConversion,
  type ConversionEventName,
} from '@/lib/analytics'

/**
 * Classify an outbound href into the conversion it represents.
 * Returns null for links that are not conversions (internal navigation,
 * anchors, mailto, and anything else).
 */
function classify(href: string): ConversionEventName | null {
  if (href.startsWith('tel:')) return CONVERSION_EVENTS.phone
  if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
    return CONVERSION_EVENTS.whatsapp
  }
  if (
    href.includes('maps.app.goo.gl') ||
    href.includes('google.com/maps') ||
    href.includes('goo.gl/maps')
  ) {
    return CONVERSION_EVENTS.maps
  }
  if (href.includes('institutodigestivo.com.br')) {
    return CONVERSION_EVENTS.institution
  }
  if (
    href.includes('instagram.com') ||
    href.includes('facebook.com') ||
    href.includes('doctoralia')
  ) {
    return CONVERSION_EVENTS.social
  }
  return null
}

/**
 * A `tel:` link only starts a call on a device that can place one. Desktop
 * browsers accept the click and do nothing — the visitor is usually just
 * reading or copying the number — so counting it books a conversion that
 * never happened. A coarse pointer with no hover is the closest thing the
 * platform gives us to "this is a phone".
 */
function canPlaceCalls(): boolean {
  return window.matchMedia('(pointer: coarse) and (hover: none)').matches
}

/**
 * Where on the page the click happened. Prefers an explicit
 * `data-conversion` marker, then the enclosing landmark, so a CTA that
 * has not been labelled still reports something more useful than
 * "unknown".
 */
function resolvePlacement(anchor: HTMLAnchorElement): string {
  const marked = anchor.closest<HTMLElement>('[data-conversion]')
  const explicit = marked?.dataset.conversion
  if (explicit) return explicit

  const section = anchor.closest<HTMLElement>('section[id], header, footer, nav')
  if (!section) return 'unlabelled'

  if (section.id) return section.id

  // Bare tag names collide: treatment and blog pages carry their own
  // <header> inside <article> on top of the site header, and both would
  // report "header" — indistinguishable once the events reach GA4.
  // Qualifying by scope keeps the two apart.
  const tag = section.tagName.toLowerCase()
  return section.closest('article') ? `article-${tag}` : `page-${tag}`
}

/**
 * Records off-site conversions site-wide.
 *
 * Uses one delegated listener instead of wrapping each CTA: the WhatsApp
 * link alone appears in a dozen server components, and a document-level
 * listener keeps those components server-rendered while automatically
 * covering CTAs added later.
 */
export default function ConversionTracker() {
  const pathname = usePathname()

  useEffect(() => {
    function handleClick(nativeEvent: MouseEvent) {
      const target = nativeEvent.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const eventName = classify(href)
      if (!eventName) return

      if (eventName === CONVERSION_EVENTS.phone && !canPlaceCalls()) return

      // Recorded immediately, and deliberately without consulting
      // `defaultPrevented`. Deferring the decision until dispatch ends is
      // the only way to read that flag reliably — a microtask checkpoint
      // can run before the bubble phase — and a deferred callback is not
      // guaranteed to run at all once a same-tab navigation starts. Losing
      // real conversions is worse than counting a cancelled click, and no
      // CTA on this site cancels one.
      trackConversion(eventName, {
        placement: resolvePlacement(anchor),
        pagePath: pathname,
        destination: href,
      })
    }

    // Capture phase so the event is recorded even when a handler
    // further down stops propagation.
    document.addEventListener('click', handleClick, { capture: true })
    return () =>
      document.removeEventListener('click', handleClick, { capture: true })
  }, [pathname])

  return null
}
