export interface Currency {
  sign: string;
  name: string;
}

export const Currencies: Currency[] = [
  {
    sign: 'zł',
    name: 'PLN',
  },
  {
    sign: '$',
    name: 'EUR',
  },
  {
    sign: '$',
    name: 'USD',
  },
];
