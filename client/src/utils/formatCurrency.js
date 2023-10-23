const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  
  export function formatCurrency (number) {
    return CURRENCY_FORMATTER.format(number).replace('$', '₡')
    // return new Intl.NumberFormat().format(number);
  }