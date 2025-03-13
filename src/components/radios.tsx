'use client';
import { useEffect, useState } from 'react';
import RadiosStations from '../app/api/radios';


interface RadioListProps {
    stationuuid: string;
    name: string;
    tags: string;
    country: string;
    favicon: string;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/50';

const RadioList = () => {
    const [stations, setStations] = useState<RadioListProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRadios() {
            try {
                const data = await RadiosStations(); 
                if (Array.isArray(data)) {
                    setStations(data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error fetching radio stations:', err);
                setError('Failed to load radio stations.');
            }
        }

        fetchRadios();
    }, []);

    if (error) return <p>{error}</p>;

    console.log(RadiosStations);

    return (
        <ul className='list-radios'>
        {stations.map((station) => {
            const imageUrl = station.favicon && station.favicon.trim() !== '' 
                ? station.favicon 
                : DEFAULT_IMAGE;

            return (
                <li key={station.stationuuid} className='radio-station'>                    
                    {station.name} 
                </li>
            );
        })}
    </ul>
    );

}

export default RadioList;