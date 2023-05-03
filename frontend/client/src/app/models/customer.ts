export interface Customer {
    id: number,
    name: string;
    created_at: Date;
    updated_at: Date;
    email: string;
    vat_number: string;
}

export interface CustomerFormValues {
    name: string;
    email: string;
    vat_number: string;
}