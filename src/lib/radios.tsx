export async function APIRadios(name = '', country = '', language = '') {
    try {
        const url = `https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}&language=${encodeURIComponent(language)}&limit=10`;

        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const stations = await response.json();

        if (!Array.isArray(stations)) {
            throw new Error('Invalid data format received');
        }

        return stations;
    } catch (error) {
        console.error('Error fetching radio stations:', error);
        return [];
    }
}
