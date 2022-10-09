import { useEffect } from 'react';
import { ParcelManagement } from './components/ParcelManagement/ParcelManagement';

function App() {
    useEffect(() => {
        document.title = 'Parcel Management';
    }, []);

    return <ParcelManagement />;
}

export default App;
