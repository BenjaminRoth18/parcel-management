import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { GridSelectionModel } from '@mui/x-data-grid';
import { ParcelRow } from '../../models/models';

type Props = {
    parcelList: ParcelRow[];
    selectedParcels: GridSelectionModel;
    removeParcels: (parcelIdList: GridSelectionModel) => void;
    setRetoure: (parcelIdList: GridSelectionModel) => void;
};

export const ButtonBar: React.FC<Props> = ({
    parcelList,
    selectedParcels,
    removeParcels,
    setRetoure,
}) => {
    const isRetoureParcelList = parcelList.some(
        (parcel) => parcel.parcelRetoure === true
    );

    const renderButtonBar = () => {
        return (
            <Stack spacing={2} direction="row">
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeParcels(selectedParcels);
                    }}
                    variant="contained"
                >
                    Delete selection
                </Button>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        setRetoure(selectedParcels);
                    }}
                    variant="contained"
                >
                    {isRetoureParcelList ? 'Unset retoure' : 'Set retoure'}
                </Button>
            </Stack>
        );
    };

    return <>{selectedParcels.length > 0 ? renderButtonBar() : null}</>;
};
