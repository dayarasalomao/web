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
  return section.tagName.toLowerCase()
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
