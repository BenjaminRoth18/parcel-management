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

export const ParcelTable: React.FC<Props> = ({
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

    const rowsWithoutRetoure = parcelRows.filter(
        (row: ParcelRow) => !row.parcelRetoure
    );

    return (
        <React.Fragment>
            <DataGrid
                autoHeight
                rows={rowsWithoutRetoure}
                columns={columns}
                checkboxSelection={true}
                onSelectionModelChange={(event) => handleRowSelection(event)}
                sx={{ mb: 4 }}
            />

            <ButtonBar
                parcelList={rowsWithoutRetoure}
                selectedParcels={selectedParcels}
                removeParcels={removeParcels}
                setRetoure={setRetoure}
            ></ButtonBar>
        </React.Fragment>
    );
};
