export interface Circuit {
    id: number,
    name: string;
    created_at: Date;
    updated_at: Date;
    installation_date: Date;
    is_main: boolean;
    meter_id: number;
    parent_circuit_id: number;
}

export interface CircuitFormValues {
    name: string;
    installation_date: Date;
    meter_id: number;
    parent_circuit_id: number | null;
}