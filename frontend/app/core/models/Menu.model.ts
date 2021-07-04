export type Icon =
  | 'Account'
  | 'Category'
  | 'Statistic'
  | 'Barcode'
  | 'Card'
  | 'Setting'
  | 'Logout';

export interface MenuElement {
  id: string;
  icon?: Icon;
  page: string;
  text: string;
}
