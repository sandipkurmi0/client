
export interface user {
    createdAt: string;
    email: string;
    name: string;
    password: string;
    role: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }
  
export interface Expense {
    description: string;
    amount: number;
    createdAt: string;
    expenseCatgory: string;
    expenseDate: string;
    expenseName: string;
    paymentType: string;
    type: string;
    uesr: string;
    updatedAt: string;
    __v: number;
    _id: string;
  }

 export interface IsEdit {
    isEdit: boolean,
  }