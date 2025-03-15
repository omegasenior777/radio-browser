'use client';
import { useState, useEffect } from 'react';
import FavoritesList from "@/components/favorites";
import RadioList from "@/components/radios";

interface RadioListProps {
  stationuuid: string;
  name: string;
  tags: string;
  country: string;
  favicon: string;
  language: string;
  url: string;
}

export default function Home() {

  const [favorites, setFavorites] = useState<RadioListProps[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRadios');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFavoriteToggle = (station: RadioListProps) => {
    let updatedFavorites = [];

    if (favorites.some(fav => fav.stationuuid === station.stationuuid)) {
      updatedFavorites = favorites.filter(fav => fav.stationuuid !== station.stationuuid);
    } else {
      updatedFavorites = [...favorites, station];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRadios', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex">
      <div className="w-1/3 bg-slate-950 h-svw p-10">
        <RadioList favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />      </div>
      <div className="w-2/3 bg-slate-900 h-svw p-10">
      <FavoritesList favorites={favorites} onUpdateFavorites={setFavorites} />
      </div>
    </div>

  );
}
