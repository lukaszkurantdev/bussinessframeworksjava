import { Category } from './Category.model';
import { Account } from './Account.model';
export interface Transaction {
  id: number;
  description: string;
  value: number;
  date: string;
  account: Account;
  accountTo?: Account;
  category?: Category;
  type: 'income' | 'expence' | 'transfer';
}
