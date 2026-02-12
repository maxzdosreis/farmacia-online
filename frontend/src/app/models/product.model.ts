export type Category = 
    | 'Destino'
    | 'Rotina'
    | 'Sazonal'
    | 'Conveniência';

export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    category?: Category;
    active: boolean;
    created_at: string;
    updated_at: string;
}