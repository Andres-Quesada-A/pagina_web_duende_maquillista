const CURRENCY_FORMATTER = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0
  })
  
  export function formatCurrency (number) {
    return CURRENCY_FORMATTER.format(number)
    // return new Intl.NumberFormat().format(number);
  }