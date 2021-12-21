import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "react-leaflet-fullscreen/dist/styles.css";
import "leaflet/dist/leaflet.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import AerisWeather from "@aerisweather/javascript-sdk";
import "@aerisweather/javascript-sdk/dist/styles/styles.css";
import React from "react";

const center = [52.22977, 21.01178];

const layers = [
  {
    name: "Osm Mapnik",
    attribution:
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>OpenStreetMap</a> contributors',
    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "CartoDB",
    attribution:
      '&copy; <a href="http://cartodb.com/attributions">CartoDB</a> contributors',
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
  },
  {
    name: "Aeris Map",
    attribution:
      '&copy; <a href=""https://www.aerisweather.com">Aeris Map</a> contributors',
    url: "https://maps1.aerisapi.com/Zo1OUzOxuZfj4uSLirYhj_1ZQN0VhcaCH9n6aMBpe4bV1QkEOuBHPLdx1l8EEr/flat,satellite-infrared-color,admin-cities-dk/{z}/{x}/{y}/current.png",
  },
];

const MapWrapper = () => {
  const [map, setMap] = React.useState(null);
  const aeris = new AerisWeather(
    "Zo1OUzOxuZfj4uSLirYhj",
    "1ZQN0VhcaCH9n6aMBpe4bV1QkEOuBHPLdx1l8EEr"
  );
  React.useLayoutEffect(() => {
    if (map) {
      aeris.views().then((views: any) => {
        const app = new views.InteractiveMap(map, {
          center: {
            lat: 39.0,
            lon: -95.5,
          },
          zoom: 4,
          layers: "radar",
          timeline: {
            from: -3 * 3600,
            to: 0,
          },
        });
        console.log(app);
        app.on("ready", () => {
          // show info panel for location when map is clicked
          console.log(app.map._container);
          //   app.map._container.on("click", (e: any) => {
          //     app.showInfoAtCoord(e.data.coord, "localweather", "Local Weather");
          //   });
        });
      });
    } else {
      console.log("Map Instance not created ");
    }
  }, [map]);
  const fullScreenControlPosition = "bottomright";
  return (
    <MapContainer
      center={center as any}
      zoom={13}
      fullscreenControl={true}
      scrollWheelZoom={false}
      id="fareye-leaflet"
      whenCreated={setMap as any}
      style={{ width: "100%", height: "100%" }}
    >
      <LayersControl position="topright">
        {layers.map((layer, index) => {
          return (
            <LayersControl.BaseLayer
              key={index}
              checked={index === 0 ? true : false}
              name={layer.name}
            >
              <TileLayer attribution={layer.attribution} url={layer.url} />
            </LayersControl.BaseLayer>
          );
        })}
      </LayersControl>
    </MapContainer>
    // <div style={{ width: "", height: "100vh" }} id="map"></div>
  );
};

export default MapWrapper;
