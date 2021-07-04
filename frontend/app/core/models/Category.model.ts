export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  subcategories?: Category[];
  is_payout?: boolean;
  base_category?: Category;
}
