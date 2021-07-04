import Colors from '../../styles/Colors';

export const amountToShow = (value: number): string =>
  value
    .toFixed(2)
    .toString()
    .replace('.', ',');

export const amountToNumber = (value: string): number =>
  parseFloat(value.replace(',', '.'));

export const getAmountColor = (value: number): string => {
  if (value === 0) {
    return Colors.graySecondary;
  }

  return value > 0 ? Colors.green : Colors.primary;
};
