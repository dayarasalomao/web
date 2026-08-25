// Campo Grande/MS is UTC-04:00 year-round (Brazil dropped DST in 2019).
const SITE_UTC_OFFSET = '-04:00'

/**
 * Google's Rich Results Test rejects date-only values for schema and
 * OpenGraph datetime fields, so expand `YYYY-MM-DD` into a full ISO 8601
 * timestamp with offset. Values that already carry a time pass through.
 */
export function toSchemaDateTime(value: string): string {
  if (!value) return value
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00${SITE_UTC_OFFSET}` : value
}
