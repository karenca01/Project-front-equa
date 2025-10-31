export interface User {
    userId: string;
    username: string;
    userFullName: string;
    userEmail: string;
    userPassword: string;
    createdEvents?: Event[];
    joinedEvents?: Event[];
}

export interface Event {
    eventId: string;
    eventName: string;
    eventDescription: string;
    eventType?: string;
    createdBy?: User;
    participants?: User[];
    expenses?: Expense[];
}

export interface Expense {
    expenseId: string;
    expenseDescription: string;
    expenseAmount: number;
    paidBy?: User; // quién pagó
    event?: Event;
    splits?: Expensesplit[];
}

export interface Expensesplit {
    expenseSplitId: string;
    expense?: Expense;
    user?: User; // quién debe pagar 2 })
    expenseSplitAmount: number; // si se divide por monto fijo
    expenseSplitPercentage: number; // si se divide por porcentaje
}