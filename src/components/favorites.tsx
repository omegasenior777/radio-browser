'use client';
import { useEffect, useState } from 'react';

interface RadioListProps {
    stationuuid: string;
    name: string;
    tags: string;
    country: string;
    favicon: string;
    language: string;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/50';

const FavoritesList = () => {
    const [favorites, setFavorites] = useState<RadioListProps[]>([]);

    const loadFavorites = () => {
        const savedFavorites = localStorage.getItem('favoriteRadios');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites) as RadioListProps[]);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
                setFavorites([]);
            }
        }
    };

    // Carregar os favoritos ao inicializar o componente
    useEffect(() => {
        loadFavorites();
    }, []);

    // Função para remover um favorito
    const removeFavorite = (stationuuid: string) => {
        const updatedFavorites = favorites.filter(station => station.stationuuid !== stationuuid);
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteRadios', JSON.stringify(updatedFavorites));
    };

    return (
        <>
            <div className='flex justify-center mb-10'>
                <h1>Radio Browser</h1>
            </div>
            <div className='flex justify-center mb-10'>
                <input type="text" placeholder='Search here' className='bg-gray-800 rounded-md border border-neutral-300 p-2' />
            </div>
            <ul>
                {favorites.map((station) => {
                    const imageUrl = station.favicon?.trim() !== '' ? station.favicon : DEFAULT_IMAGE;

                    return (
                        <button
                            key={station.stationuuid}
                            className='transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-blue-900 bg-gray-800 rounded-lg flex items-center p-3 mb-2 w-full cursor-pointer'
                        >
                            <img src={imageUrl} alt={station.name} width={50} height={50} className="mr-3 rounded-md" />
                            <span>{station.name}</span>
                        </button>
                    );
                })}
            </ul>
        </>
    );

}

export default FavoritesList;