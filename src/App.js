import Map, { Layer, Source } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { dev } from "./constants";
import "./App.css";
import wildfire from "./wildfire.json";
import { useState } from "react";
import { HeatmapLayer, IconLayer } from "deck.gl";

function App() {
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const data = wildfire; //[{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };

  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data,
    getPosition: (d) => [d.longitude, d.latitude],
    getWeight: (d) => d.brightness,
    aggregation: "SUM",
  });

  const tooltip = (object) => {
    if (object)
      return {
        html: `<h2>hello</h2><div>world</div>`,
        style: {
          backgroundColor: "#f00",
          fontSize: "0.8em",
        },
      };
  };

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layer} /*getTooltip={tooltip}*/>
      <Map
        // style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={dev.mapboxAccessToken}
      />
    </DeckGL>
  );
}

export default App;
