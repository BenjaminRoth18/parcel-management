export interface Parcel {
    id: string;
    name: string;
    date: string;
    tracking?: {
        id: string;
    };
    retoure: boolean;
    retoureDate: string | null;
}
export interface ParcelRow {
    id: string;
    parcelName: string;
    parcelDate: string;
    parcelTracking: string;
    parcelRetoure: boolean;
}
