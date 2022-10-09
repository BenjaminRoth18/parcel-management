import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Tab,
    ThemeProvider,
} from '@mui/material';
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AddParcel } from '../Parcel/AddParcel';
import { ParcelTable } from '../Parcel/ParcelTable';
import { RetoureTable } from '../Retoure/RetoureTable';
import * as firebase from '../../utils/database';
import { Parcel, ParcelRow } from '../../models/models';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5c6bc0',
        },
        secondary: red,
    },
});

enum TabContent {
    CREATE_PARCEL = 'CREATE_PARCEL',
    CREATE_RETOURE = 'RETOURE',
}

export const ParcelManagement: React.FC = () => {
    const [parcelList, setParcelList] = useState<Parcel[]>([]);
    const [tabIndex, setTabIndex] = useState<TabContent>(
        TabContent.CREATE_PARCEL
    );

    const handleCreateParcel = (parcel: Parcel): void => {
        setParcelList([...parcelList, parcel]);
        firebase.createParcelOnDb(parcel);
    };

    const handleRemoveParcels = (parcelIdList: GridSelectionModel): void => {
        const updatedParcelList = parcelList.filter((parcel) => {
            return !parcelIdList.includes(parcel.id);
        });
        setParcelList(updatedParcelList);
        firebase.removeParcelOnDb(parcelIdList);
    };

    const handleRetoure = (parcelIdList: GridSelectionModel): void => {
        const updatedParcelList = parcelList.map((parcel) => {
            if (!parcelIdList.includes(parcel.id)) {
                return parcel;
            }

            const updatedParcel = {
                ...parcel,
                retoure: !parcel.retoure,
                retoureDate: parcel.retoureDate
                    ? null
                    : new Date().toLocaleDateString(),
            };

            firebase.updateParcelOnDb(updatedParcel);

            return updatedParcel;
        });

        setParcelList(updatedParcelList);
    };

    const handleTabChange = (
        event: React.SyntheticEvent,
        newValue: TabContent
    ): void => {
        setTabIndex(newValue);
    };

    const parcelColumns: GridColDef[] = [
        { field: 'parcelName', headerName: 'Name', width: 250 },
        { field: 'parcelDate', headerName: 'Date', width: 100 },
        { field: 'parcelTracking', headerName: 'Tracking ID', width: 180 },
    ];

    const retoureColumns: GridColDef[] = [
        {
            field: 'parcelName',
            headerName: 'Parcel name',
            width: 300,
        },
        {
            field: 'parcelRetoureDate',
            headerName: 'Date of retoure',
            width: 300,
        },
    ];

    const parcelRows: ParcelRow[] = parcelList.map((parcel) => {
        return {
            id: parcel.id,
            parcelName: parcel.name,
            parcelDate: parcel.date,
            parcelTracking: parcel.tracking ? parcel.tracking.id : '',
            parcelRetoure: parcel.retoure,
            parcelRetoureDate: parcel.retoureDate,
        };
    });

    useEffect(() => {
        void firebase.fetchParcelsFromDb(setParcelList);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <TabContext value={tabIndex}>
                    <TabList onChange={handleTabChange}>
                        <Tab
                            label="Create Parcel"
                            value={TabContent.CREATE_PARCEL}
                        />
                        <Tab
                            label="Retoure"
                            value={TabContent.CREATE_RETOURE}
                        />
                    </TabList>
                    <TabPanel value={TabContent.CREATE_PARCEL}>
                        <AddParcel addParcel={handleCreateParcel} />
                        <Box sx={{ mt: 8, height: 500 }}>
                            {parcelList.length ? (
                                <ParcelTable
                                    columns={parcelColumns}
                                    parcelRows={parcelRows}
                                    removeParcels={handleRemoveParcels}
                                    setRetoure={handleRetoure}
                                />
                            ) : null}
                        </Box>
                    </TabPanel>
                    <TabPanel value={TabContent.CREATE_RETOURE}>
                        <Box sx={{ mt: 8, height: 500 }}>
                            <RetoureTable
                                columns={retoureColumns}
                                parcelRows={parcelRows}
                                removeParcels={handleRemoveParcels}
                                setRetoure={handleRetoure}
                            />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Container>
        </ThemeProvider>
    );
};
