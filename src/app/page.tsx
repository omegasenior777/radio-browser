import RadioList from "@/components/radios";

export default function Home() {
  return (
    <div className="container">
      <div className="search-container">
        <RadioList />
      </div>
      <div className="fav-container">
        <RadioList />
      </div>
    </div>

  );
}
