import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from '@mui/material'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { useState } from 'react'
import './App.css'
import { AddParcel } from './components/AddParcel'
import { ParcelTable } from './components/ParcelTable'

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export interface Parcel {
    id: string
    name: string
    date: string
    tracking?: {
        id: string
    }
}
export interface Row {
    id: string
    orderName: string
    orderDate: string
}

function App() {
    const [parcelOrderList, setParcelOrderList] = useState<Parcel[]>([])

    const handleParcelOrder = (parcel: Parcel): void => {
        setParcelOrderList([...parcelOrderList, parcel])
    }

    const handleRemoveParcelOrders = (
        parcelIdList: GridSelectionModel
    ): void => {
        const newParcelOrders = parcelOrderList.filter((parcelOrder) => {
            return !parcelIdList.includes(parcelOrder.id)
        })

        setParcelOrderList(newParcelOrders)
    }

    const columns: GridColDef[] = [
        { field: 'orderName', headerName: 'Order name' },
        { field: 'orderDate', headerName: 'Date' },
        { field: 'orderTracking', headerName: 'Tracking ID' },
    ]

    const rows: Row[] = parcelOrderList.map((parcelOrder) => {
        return {
            id: parcelOrder.id,
            orderName: parcelOrder.name,
            orderDate: parcelOrder.date,
            orderTracking: parcelOrder.tracking?.id,
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <AddParcel addParcel={handleParcelOrder} />
                <Box sx={{ mt: 8, height: 500 }}>
                    {parcelOrderList.length ? (
                        <ParcelTable
                            columns={columns}
                            rows={rows}
                            removeParcelOrders={handleRemoveParcelOrders}
                        />
                    ) : null}
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default App
