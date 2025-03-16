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
  const [isRadioListVisible, setRadioListVisible] = useState(true);

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

  const toggleRadioListVisibility = () => {
    setRadioListVisible(prevState => !prevState);
  };

  return (
    <div className="flex">
      
      <div className={isRadioListVisible ? "w-1/3 bg-slate-950 h-svw p-10" : "hidden"}>
               
          <RadioList favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />        
      </div>
      
      <div className={isRadioListVisible ? "w-2/3 bg-slate-900 h-svw p-10" : "w-screen bg-slate-900 h-svw p-10"}>
      <button 
          onClick={toggleRadioListVisibility} 
          className="cursor-pointer mb-4 text-white p-2 bg-gray-700 rounded"
        >
          <img src="/assets/menu.png" alt="Menu" />
        </button> 
        <FavoritesList favorites={favorites} onUpdateFavorites={setFavorites} />
      </div>
    </div>
  );

}
