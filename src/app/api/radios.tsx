
export default async function APIRadios() {
    try {
        const response = await fetch('http://de1.api.radio-browser.info/json/stations/search?limit=10', 
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const stations = await response.json();

        if (!Array.isArray(stations)) {
            throw new Error('Invalid data format received');
        }
        return stations;

        // return (
        //     <ul>
        //         {stations.map((station: { stationuuid: string; name: string; tags: string; country: string }) => (
        //             <li key={station.stationuuid}>{station.name}
        //                 {station.tags} {station.country}
        //             </li>
        //         ))}
        //     </ul>
        // );
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        return error;
    }
}
