import { Button, Grid, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Parcel } from '../../models/models';

type Props = {
    addParcel: (parcel: Parcel) => void;
};

export const AddParcel: React.FC<Props> = ({ addParcel }) => {
    const [parcelName, setParcelname] = useState<string>('');
    const [trackingId, setTrackingId] = useState<string>('');

    const handleOnSubmit = () => {
        addParcel({
            id: uuidv4(),
            name: parcelName,
            date: new Date().toLocaleDateString(),
            tracking: {
                id: trackingId ?? '',
            },
            retoure: false,
            retoureDate: null,
        });
    };

    const resetInputField = (): void => {
        setParcelname('');
        setTrackingId('');
    };

    return (
        <React.Fragment>
            <h1>New parcel</h1>
            <Stack spacing={1}>
                <form
                    onSubmit={(event: React.FormEvent) => {
                        event.preventDefault();
                        handleOnSubmit();
                        resetInputField();
                    }}
                >
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={7}>
                            <TextField
                                id="parcel-name"
                                variant="outlined"
                                onChange={(event) =>
                                    setParcelname(event.target.value)
                                }
                                placeholder="Name of the parcel"
                                name="name"
                                value={parcelName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="parcel-tracking"
                                variant="outlined"
                                onChange={(event) =>
                                    setTrackingId(event.target.value)
                                }
                                placeholder="Tracking ID"
                                name="tracking"
                                value={trackingId}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!parcelName}
                    >
                        Add parcel
                    </Button>
                </form>
            </Stack>
        </React.Fragment>
    );
};
