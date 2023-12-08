import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaGFydWNvbWV0IiwiYSI6ImNscHRtdnpibjBnMjkya29wbnJqZjFlOWYifQ.f3m64a0NuW85BYyUXabJ_A"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default App;
