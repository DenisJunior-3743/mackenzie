// Files in app/utils are auto-imported everywhere — no import statement needed.

/** '2024-03-15' -> '15 March 2024' (UTC so the server and browser always agree) */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso))
}

export function formatMoney(amount: number, currency: 'UGX' | 'USD'): string {
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
