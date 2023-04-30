
enum CURRENCY {
    NGN = 'NGN',
    USD = 'USD',
}   

enum LOCALE {
    NG = 'en-NG',
    US = 'en-US'
}

const CURRENCY_FORMATTER = new Intl.NumberFormat(LOCALE.NG, {
    currency: CURRENCY.NGN, style: 'currency'
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}

// export function formatDate(date: Date) {
//   const f = new Intl.DateTimeFormat(LOCALE.NG, {
    // dateStyle: 'medium',
    // timeStyle: 'short',
  // });
//   return f.format(date);
// }

export function formatDate(date: string): string {
  const parsedDate = Date.parse(date);
  if (isNaN(parsedDate)) {
    return 'Invalid Date';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    // hour: 'numeric',
    // minute: 'numeric',
    // hour12: true,
  }).format(parsedDate);

  return formattedDate;
}
