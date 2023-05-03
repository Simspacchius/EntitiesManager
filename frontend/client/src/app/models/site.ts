export interface Site {
    id: number,
    name: string;
    created_at: Date;
    updated_at: Date;
    longitude: number;
    latitude: number;
    address: string;
    post_code: string;
    customer_id: number;
}

export interface SiteFormValues {
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    post_code: string;
    customer_id: number;
}