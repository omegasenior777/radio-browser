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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(checkMobile);

    const savedFavorites = localStorage.getItem('favoriteRadios');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const handleResize = () => {
      const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileNow);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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

  const radioListClasses = isRadioListVisible  ? isMobile  ? "w-full bg-slate-950 h-screen p-10"  : "w-1/3 bg-slate-950 h-screen p-10"  : "hidden";

  const favoritesClasses = isRadioListVisible  ? isMobile ? "hidden" : "w-2/3 bg-slate-900 h-screen p-10" : "w-full bg-slate-900 h-screen p-10";


  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>

      <div className={radioListClasses}>
      <button
          onClick={toggleRadioListVisibility}
          className={isMobile ? "cursor-pointer mb-4 text-white p-2 bg-gray-700 rounded" : "hidden"}
        >
          <img src="/assets/menu.png" alt="Menu" />
        </button>
        <RadioList favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
      </div>
      <div className={favoritesClasses}>
        <button
          onClick={toggleRadioListVisibility}
          className="cursor-pointer mb-4 text-white p-2 bg-gray-700 rounded"
        >
          <img src="/assets/menu.png" alt="Menu" />
        </button>
        <FavoritesList favorites={favorites} onUpdateFavorites={setFavorites} />
      </div>

    </div >
  );
}
