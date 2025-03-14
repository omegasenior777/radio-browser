'use client';
import { useEffect, useState } from 'react';
import { APIRadios } from '@/lib/radios';

interface RadioListProps {
    stationuuid: string;
    name: string;
    tags: string;
    country: string;
    favicon: string;
    language: string;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/50';

const RadioList = () => {
    const [stations, setStations] = useState<RadioListProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState<'name' | 'country' | 'language'>('name');
    const [favorites, setFavorites] = useState<RadioListProps[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteRadios');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites) as RadioListProps[]);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
                setFavorites([]);
            }
        }
    }, []);

    useEffect(() => {
        async function fetchRadios() {
            try {
                let name = '', country = '', language = '';

                if (searchBy === 'name') name = searchTerm;
                if (searchBy === 'country') country = searchTerm;
                if (searchBy === 'language') language = searchTerm;

                const data = await APIRadios(name, country, language);

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
    }, [searchTerm, searchBy]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBy(event.target.value as 'name' | 'country' | 'language');
    };

    const toggleFavorite = (station: RadioListProps) => {
        let updatedFavorites = [...favorites];

        const isFavorite = favorites.some((fav: RadioListProps) => fav.stationuuid === station.stationuuid);

        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav.stationuuid !== station.stationuuid);
        } else {
            updatedFavorites.push(station);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteRadios', JSON.stringify(updatedFavorites));
    };

    if (error) return <p>{error}</p>;

    return (
        <>
            <div className='flex justify-end mb-10'>
                <button className='cursor-pointer'>
                    <img src="/assets/menu.png" alt="Menu" />
                </button>
            </div>

            <div className='flex flex-col items-center mb-10 space-y-2'>
                <div className="flex space-x-4">
                    <label>
                        <input className='cursor-pointer'
                            type="radio"
                            name="filter"
                            value="name"
                            checked={searchBy === 'name'}
                            onChange={handleFilterChange}
                        /> Name
                    </label>
                    <label>
                        <input className='cursor-pointer'
                            type="radio"
                            name="filter"
                            value="country"
                            checked={searchBy === 'country'}
                            onChange={handleFilterChange}
                        /> Country
                    </label>
                    <label>
                        <input className='cursor-pointer'
                            type="radio"
                            name="filter"
                            value="language"
                            checked={searchBy === 'language'}
                            onChange={handleFilterChange}
                        /> Language
                    </label>
                </div>

                <input
                    type="text"
                    placeholder='Search here'
                    className='bg-gray-800 text-white rounded-md border border-neutral-300 p-2 w-64'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <ul>
                {stations.map((station) => {
                    const imageUrl = station.favicon?.trim() !== '' ? station.favicon : DEFAULT_IMAGE;
                    const isFavorite = favorites.some(fav => fav.stationuuid === station.stationuuid);

                    return (
                        <button
                            key={station.stationuuid} onClick={() => toggleFavorite(station)}
                            className='transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-900 bg-gray-800 rounded-lg flex items-center p-3 mb-2 w-full cursor-pointer'
                        >
                            <img src={imageUrl} alt={station.name} width={50} height={50} className="mr-3 rounded-md" />
                            <span>{station.name}</span>
                            {isFavorite && (
                                <span className="ml-auto"><img src="./assets/check.png" alt="check" /></span>
                            )}
                        </button>
                    );
                })}
            </ul>
        </>
    );
};

export default RadioList;
