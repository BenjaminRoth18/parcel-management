import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { ParcelRow } from '../../models/models';
import { ButtonBar } from '../ButtonBar/ButtonBar';

type Props = {
    columns: GridColDef[];
    parcelRows: ParcelRow[];
    removeParcels: (parcelIdList: GridSelectionModel) => void;
    setRetoure: (parcelIdList: GridSelectionModel) => void;
};

export const RetoureTable: React.FC<Props> = ({
    columns,
    parcelRows,
    removeParcels,
    setRetoure,
}) => {
    const [selectedParcels, setSelectedParcels] = useState<GridSelectionModel>(
        []
    );

    const handleRowSelection = (selection: GridSelectionModel) => {
        setSelectedParcels(selection);
    };

    const retroureOnlyRows = parcelRows.filter(
        (row: ParcelRow) => row.parcelRetoure
    );

    let dataTable;

    if (parcelRows.length > 0) {
        dataTable = (
            <DataGrid
                autoHeight
                rows={retroureOnlyRows}
                checkboxSelection={true}
                onSelectionModelChange={(event) => handleRowSelection(event)}
                columns={columns}
                sx={{ mb: 4 }}
            />
        );
    } else {
        dataTable = (
            <Typography variant="body1" gutterBottom>
                No retoure parcels set at the moment
            </Typography>
        );
    }

    return (
        <React.Fragment>
            {dataTable}
            <ButtonBar
                parcelList={retroureOnlyRows}
                selectedParcels={selectedParcels}
                removeParcels={removeParcels}
                setRetoure={setRetoure}
            ></ButtonBar>
        </React.Fragment>
    );
};
