import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { Row } from '../App'

type Props = {
    columns: GridColDef[]
    rows: Row[]
    removeParcelOrders: (parcelIdList: GridSelectionModel) => void
}

export const ParcelTable: React.FC<Props> = ({
    columns,
    rows,
    removeParcelOrders,
}) => {
    const [selectedParcels, setSelectedParcels] = useState<GridSelectionModel>(
        []
    )

    const handleRowSelection = (selection: GridSelectionModel) => {
        setSelectedParcels(selection)
    }

    const showRemoveParcelOrderButton = () => {
        const isSelectedParcels = selectedParcels.length > 0

        if (isSelectedParcels) {
            return (
                <Button
                    onClick={() => removeParcelOrders(selectedParcels)}
                    variant="contained"
                >
                    Auswahl löschen
                </Button>
            )
        }
    }

    return (
        <React.Fragment>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={true}
                onSelectionModelChange={(event) => handleRowSelection(event)}
                sx={{ mb: 4 }}
            />

            {showRemoveParcelOrderButton()}
        </React.Fragment>
    )
}
