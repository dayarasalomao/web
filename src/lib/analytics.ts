// =================================================================
// CONVERSION ANALYTICS
// =================================================================
// The site's only real conversions are off-site: a WhatsApp message,
// a phone call, or a route to the clinic. None of them produce a page
// view, so without explicit events the funnel is invisible and the
// only measurable metric is sessions — which is not what the practice
// is optimising for.
//
// Events fan out to both sinks so measurement does not depend on a
// single integration being configured:
//   - GTM  (only present when NEXT_PUBLIC_GOOGLE_TAG_ID is set)
//   - Vercel Analytics (always on in production)
// =================================================================

import { sendGTMEvent } from '@next/third-parties/google'
import { track } from '@vercel/analytics'

export const CONVERSION_EVENTS = {
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  maps: 'maps_click',
  social: 'social_click',
} as const

export type ConversionEventName =
  (typeof CONVERSION_EVENTS)[keyof typeof CONVERSION_EVENTS]

export interface ConversionEvent {
  /** Which CTA fired, e.g. `whatsapp-hero`, `phone-footer`. */
  placement: string
  /** Route the visitor converted from, e.g. `/blog/fissura-anal-causas-sintomas`. */
  pagePath: string
  /** Destination the click resolved to. */
  destination: string
}

/**
 * Report one conversion to every configured analytics sink.
 *
 * Never throws: a failing analytics call must not break a patient's
 * click through to WhatsApp.
 */
export function trackConversion(
  name: ConversionEventName,
  event: ConversionEvent,
): void {
  const payload = {
    placement: event.placement,
    page_path: event.pagePath,
    destination: event.destination,
  }

  try {
    sendGTMEvent({ event: name, ...payload })
  } catch {
    // GTM absent or blocked — the Vercel sink below still records it.
  }

  try {
    track(name, payload)
  } catch {
    // Analytics blocked by the browser. Nothing to recover.
  }
}
