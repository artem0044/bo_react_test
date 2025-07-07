export const formatNumber = (num) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 3,
  }).format(num);
};


export const formatNumberWithCommas = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? '——' : num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatCost = (value) => {
  const rounded = Math.round(value * 100) / 100
  const str = rounded.toString()
  return str.endsWith('.0') ? str.slice(0, -2) : str
}