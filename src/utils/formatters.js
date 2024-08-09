// utils/formatters.js

/**
 * Formats a number as currency
 * @param {number} value - The value to format
 * @param {string} [currency='$'] - The currency symbol to use
 * @param {number} [decimals=2] - The number of decimal places to show
 * @returns {string} The formatted currency string
 */
export function formatCurrency(value, currency = '$', decimals = 2) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  // Replace the default '$' with the provided currency symbol
  return formatter.format(value).replace('$', currency);
}

/**
 * Formats a number as a percentage
 * @param {number} value - The value to format (e.g., 0.15 for 15%)
 * @param {number} [decimals=2] - The number of decimal places to show
 * @returns {string} The formatted percentage string
 */
export function formatPercentage(value, decimals = 2) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value);
}