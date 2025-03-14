import FavoritesList from "@/components/favorites";
import RadioList from "@/components/radios";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/3 bg-slate-950 h-svw p-10">
        <RadioList />
      </div>
      <div className="w-2/3 bg-slate-900 h-svw p-10">
        <FavoritesList/>
      </div>
    </div>

  );
}
