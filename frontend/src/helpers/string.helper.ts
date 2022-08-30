export const upperFirst = (s: string) => {
  if (s.length === 0) {
    return s; // Return input unchanged if it's an empty string
  }

  const firstLetter = s.charAt(0).toUpperCase();
  const restOfTheString = s.slice(1);

  return firstLetter + restOfTheString;
};

export const toReadable = (s: string) => {
  return s.replace('_', ' ');
};

export function formatNumber(number: number | string) {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const toNumber = (val: unknown): number => {
  return parseInt(String(val));
};

export const toFloat = (val: number | string): number => {
  return parseFloat(String(val));
};

export const toPrice = (val: number | string, currency?: string) => {
  return toFloat(val).toFixed(2).replace('.', ',') + currency;
};
