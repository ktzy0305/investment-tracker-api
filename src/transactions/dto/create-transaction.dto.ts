export class CreateTransactionDto {
    action: string;
    asset: string;
    quantity: number;
    price_per_unit: number;
    fees: number;
    transaction_date: Date;
    notes: string;
}
