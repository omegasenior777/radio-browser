'use client';
import { useEffect, useRef, useState } from 'react';

interface RadioListProps {
    stationuuid: string;
    name: string;
    tags: string;
    country: string;
    favicon: string;
    language: string;
    url: string;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/50';

const FavoritesList = ({ favorites, onUpdateFavorites }: { favorites: RadioListProps[], onUpdateFavorites: (updatedFavorites: RadioListProps[]) => void }) => {
    const [playingStation, setPlayingStation] = useState<RadioListProps | null>(null);
    const [editingStation, setEditingStation] = useState<RadioListProps | null>(null);
    const [editedName, setEditedName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlayStop = (station: RadioListProps) => {
        if (playingStation?.stationuuid === station.stationuuid) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
            setPlayingStation(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const newAudio = new Audio(station.url);
            newAudio.play().catch(err => console.error("Erro ao reproduzir áudio:", err));
            audioRef.current = newAudio;
            setPlayingStation(station);
        }
    };

    const handleDelete = (stationuuid: string) => {
        const updatedFavorites = favorites.filter(station => station.stationuuid !== stationuuid);
        onUpdateFavorites(updatedFavorites);
        localStorage.setItem('favoriteRadios', JSON.stringify(updatedFavorites));
    };

    const handleEdit = (station: RadioListProps) => {
        setEditingStation(station);
        setEditedName(station.name);
    };

    const handleSaveEdit = () => {
        if (!editingStation) return;

        const updatedFavorites = favorites.map(station =>
            station.stationuuid === editingStation.stationuuid
                ? { ...station, name: editedName }
                : station
        );

        onUpdateFavorites(updatedFavorites);
        localStorage.setItem('favoriteRadios', JSON.stringify(updatedFavorites));
        setEditingStation(null);
    };

    const filteredFavorites = favorites.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className='flex justify-center mb-5'>
                <h1>Radio Browser</h1>
            </div>

            <div className="flex justify-center mb-5">
                <input 
                    type="text" 
                    placeholder="Pesquisar rádio..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white rounded-md border border-gray-400 p-2 w-full"
                />
            </div>

            {playingStation && (
                <div className="p-4 bg-gray-800 text-white rounded-md mb-5 flex items-center justify-between border-2 border-blue-900">
                    <div className="flex items-center">
                    <button onClick={() => handlePlayStop(playingStation)} className="text-white p-1 mr-5 rounded-md">
                        <img src="/assets/Stop.png" alt="Stop" className="w-10 h-10" />
                    </button>
                        <img src={playingStation.favicon || DEFAULT_IMAGE} alt={playingStation.name} width={50} height={50} className="mr-3 rounded-md" />
                        <span className="font-bold text-lg">{playingStation.name}</span>
                    </div>                    
                </div>
            )}

            <div className='bg-gray-700 p-1 rounded-md'>
                <ul>
                    {filteredFavorites.map((station) => {
                        const imageUrl = station.favicon?.trim() !== '' ? station.favicon : DEFAULT_IMAGE;
                        const isPlaying = playingStation?.stationuuid === station.stationuuid;

                        return (
                            <div key={station.stationuuid} className={`flex items-center justify-between p-3 rounded-md w-full mb-2 ${isPlaying ? 'border-2 border-blue-900' : 'bg-gray-800'}`}>
                                <div className="flex items-center">
                                    <button onClick={() => handlePlayStop(station)} className="text-white p-1 mr-5 rounded-md">
                                        {isPlaying ? <img src="/assets/Stop.png" alt="Stop" className="w-10 h-10" /> : <img src="/assets/Play.png" alt="Play" className="w-10 h-10" />}
                                    </button>
                                    <audio ref={audioRef} src={station.url} />
                                    <img src={imageUrl} alt={station.name} width={50} height={50} className="mr-3 rounded-md" />
                                    {editingStation?.stationuuid === station.stationuuid ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="bg-gray-700 text-white rounded-md border p-1 w-40"
                                        />
                                    ) : (
                                        <span>{station.name}</span>
                                    )}
                                </div>

                                <div className="flex space-x-3">
                                    {editingStation?.stationuuid === station.stationuuid ? (
                                        <button onClick={handleSaveEdit} className="text-white p-1 rounded-md">
                                            <img src="/assets/Edit.png" alt="Edit" className="w-10 h-10" />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleEdit(station)} className="text-white p-1 rounded-md">
                                            <img src="/assets/Edit.png" alt="Edit" className="w-10 h-10" />
                                        </button>
                                    )}

                                    <button onClick={() => handleDelete(station.stationuuid)} className="text-white p-1 rounded-md">
                                        <img src="/assets/trash.png" alt="Trash" className="w-10 h-10" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default FavoritesList;
