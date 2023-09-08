// import './App.css';
// import NATIONAL_PARK_DATA from './data.json';
// import { Map } from 'react-map-gl';
// import DeckGl, { GeoJsonLayer } from 'deck.gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MAP_BOX_ACCESS_TOKEN =
// 	'pk.eyJ1IjoiYXBvdXJlIiwiYSI6ImNsbTBxcjM4cDNjbnIzZXRoNXJ4dmNxNXYifQ.f4HXQKOwyG3sfH1TShrCmA';
// const MAP_STYLE =
// 	'https://basemap.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

// const INITIAL_VIEW_STATE = {
// 	latitude: 48.84018584673442,
// 	longitude: 2.384921117488586,
// 	zoom: 3,
// 	bearing: 0,
// 	pitch: 30,
// };

// function App() {
// 	return (
// 		<DeckGl initialViewState={INITIAL_VIEW_STATE} controller={true}>
// 			<Map mapStyle={MAP_STYLE} mapBoxAccessToken={MAP_BOX_ACCESS_TOKEN} />
// 		</DeckGl>
// 	);
// }

// export default App;
import './App.css';
import { useState, useEffect } from 'react';
import { Map } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'; // Import d'Axios
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
const MAP_BOX_ACCESS_TOKEN =
	'pk.eyJ1IjoiYXBvdXJlIiwiYSI6ImNsbTlzY3VqMTBteXczZG81M3Uyc3l1ZTAifQ.nhX1h-VDwrmmPQjjLD9Yvw';
const INITIAL_VIEW_STATE = {
	latitude: 48.84018584673442,
	longitude: 2.384921117488586,
	zoom: 3,
	bearing: 0,
	pitch: 30,
};

function App() {
	const [data, setData] = useState(null); // données géospatiales

	useEffect(() => {
		axios
			.get('https://api.seiki.co/v1/pois', {
				headers: {
					'X-API-KEY':
						'XgxHDnDJGSFLck-puloZZhyDaaycszcpsNjIMLkuX6gXzL5Dsdp1jypopfbvwQx8J-ywLNV0FxEleNIrW2OjgWLM60d9FFQxFlpTg7Glz61BQMVU7PUUob89U-NzltyMB4XsEQ',
				},
			})

			.then((response) => {
				setData(response.data.items);
				console.log(response.data.items);
			})
			.catch((error) => {
				console.error('Erreur lors de la récupération des données:', error);
			});
	}, []); // Le tableau vide [] montage du composant

	if (!data) {
		return <div>Chargement en cours...</div>;
	}

	// GeoJsonLayer avec les données reçues de l'API
	const geoJsonLayer = new GeoJsonLayer({
		id: 'geojson-layer',
		data: data, // 'API
		pickable: true,
		stroked: false,
		filled: true,
		extruded: true,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		getFillColor: [255, 0, 0, 200],
	});

	return (
		<DeckGL
			initialViewState={INITIAL_VIEW_STATE}
			controller={true}
			layers={[geoJsonLayer]}
		>
			<Map mapStyle={MAP_STYLE} mapboxApiAccessToken={MAP_BOX_ACCESS_TOKEN} />
		</DeckGL>
	);
}

export default App;
