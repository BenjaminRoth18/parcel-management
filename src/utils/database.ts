import { GridRowId, GridSelectionModel } from '@mui/x-data-grid';
import {
    child,
    get,
    getDatabase,
    ref,
    remove,
    set,
    update,
} from 'firebase/database';
import { db } from '../external/firebase';
import { Parcel } from '../models/models';

interface FirebaseParcelResponse {
    [id: string]: {
        name: string;
        date: string;
        tracking?: {
            id: string;
        };
        retoure: boolean;
        retoureDate: string;
    };
}

export const createParcelOnDb = async (parcel: Parcel): Promise<void> => {
    await set(ref(db, '/' + parcel.id), {
        name: parcel.name,
        date: parcel.date,
        tracking: parcel.tracking,
        retoure: parcel.retoure,
        retoureDate: parcel.retoureDate,
    });
};

export const removeParcelOnDb = (parcelIdList: GridSelectionModel): void => {
    parcelIdList.forEach(async (selection: GridRowId): Promise<void> => {
        await remove(ref(db, '/' + selection));
    });
};

export const fetchParcelsFromDb = async (
    setter: React.Dispatch<React.SetStateAction<Parcel[]>>
): Promise<void> => {
    const dbRef = ref(getDatabase());

    try {
        const snapshot = await get(child(dbRef, `/`));
        if (!snapshot.exists()) {
            setter([]);
        }
        const entries = mapEntriesFromDb(snapshot.val());
        setter(entries);
    } catch (error) {
        new Error('Eror while fetching data from firebase');
    }
};

export const updateParcelOnDb = async (parcel: Parcel): Promise<void> => {
    const { id, ...updatedParcel } = parcel;

    await update(ref(db, '/' + parcel.id), updatedParcel);
};

const mapEntriesFromDb = (snapshot: FirebaseParcelResponse): Parcel[] => {
    return Object.keys(snapshot).map((id) => {
        return {
            id: id,
            name: snapshot[id].name,
            date: snapshot[id].date,
            tracking: snapshot[id].tracking,
            retoure: snapshot[id].retoure,
            retoureDate: snapshot[id].retoureDate,
        };
    });
};
