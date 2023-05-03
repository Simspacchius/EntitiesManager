export interface Meter {
    id: number,
    name: string;
    created_at: Date;
    updated_at: Date;
    serial_number: string;
    installation_date: Date;
    site_id: number;
}

export interface MeterFormValues {
    name: string;
    serial_number: string;
    installation_date: Date;
    site_id: number;
}