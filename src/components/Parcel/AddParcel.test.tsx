import { fireEvent, render, screen } from '@testing-library/react';
import { AddParcel } from './AddParcel';
import * as uuid from 'uuid';
import { Parcel } from '../../models/models';

const uuidMock = 'randomUUID';
jest.mock('uuid', () => ({ v4: () => uuidMock }));

describe('AddParcel', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(2022, 0, 1));
    });

    test('should render all elements from start', () => {
        render(<AddParcel addParcel={jest.fn()} />);

        expect(screen.getByText('New parcel')).toBeVisible();
        expect(screen.getByPlaceholderText('Name of the parcel')).toBeVisible();
        expect(screen.getByPlaceholderText('Tracking ID')).toBeVisible();
        expect(screen.getByText('Add parcel')).toBeDisabled();
    });

    test('should enable button if a parcel name is entered', () => {
        render(<AddParcel addParcel={jest.fn()} />);

        const inputParcelName =
            screen.getByPlaceholderText('Name of the parcel');

        fireEvent.change(inputParcelName, { target: { value: 'foo' } });

        expect(screen.getByText('Add parcel')).toBeEnabled();
    });

    test('should emit parcel which is entered', () => {
        const addParcelCallback = jest.fn();
        const parcelName = 'foo';
        render(<AddParcel addParcel={addParcelCallback} />);

        const inputParcelName =
            screen.getByPlaceholderText('Name of the parcel');

        fireEvent.change(inputParcelName, { target: { value: parcelName } });

        const button = screen.getByText('Add parcel');

        button.click();

        jest.spyOn(uuid, 'v4').mockReturnValue('foos');

        const expectedParcel: Parcel = {
            id: uuidMock,
            name: parcelName,
            date: new Date().toLocaleDateString(),
            tracking: { id: '' },
            retoure: false,
            retoureDate: null,
        };

        expect(addParcelCallback).toHaveBeenCalled();
        expect(addParcelCallback).toHaveBeenCalledWith(expectedParcel);
    });
});
