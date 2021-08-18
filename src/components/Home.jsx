import { useState, useEffect } from "react";
import Leaflet from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/";

function Home() {
  const [query, setQuery] = useState("");
  const centroMapa = [-36.270691, -61.197114];
  const [pin, setPin] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setPin([position.coords.latitude, position.coords.longitude])
      );
    }
  }, []);
  const fetchQuery = (event) => {
    event.preventDefault();
    var queryString = `${event.target.calle.value} ${event.target.nro.value}, ${event.target.localidad.value}, ${event.target.partido.value}, ${event.target.provincia.value}`;

    fetch(
      "https://geocode.search.hereapi.com/v1/geocode?apikey=fRq2_Hu121OnXssewxT-R8IORDpC9cH_jMYX1e1ABEY&q=" +
        queryString
    )
      .then((response) => response.json())
      .then((data) =>
        setPin([data.items[0].position.lat, data.items[0].position.lng])
      );
  };

  function MyComponent(props) {
    const map = useMap();
    if (pin !== null) {
      map.flyTo(props.latlng, 15);
    }
    return null;
  }
  useEffect(() => {}, [pin]);
  return (
    <div>
      <div className="bg-gray-400 ">
        <form onSubmit={fetchQuery}>
          <div className="grid grid-cols-3 gap-4 px-8">
            <div>
              <p>Calle</p>
              <input name="calle" type="text" />
            </div>
            <div>
              <p>Nro</p>
              <input name="nro" type="text" />
            </div>
            <div>
              <p>Localidad</p>
              <input name="localidad" type="text" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 px-8">
            <div>
              <p>Partido</p>
              <input name="partido" type="text" />
            </div>
            <div>
              <p>Provincia</p>
              <input name="provincia" type="text" />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
      <div className="border-2 border-socios-primary rounded">
        <MapContainer
          center={centroMapa}
          dragging={window.innerWidth > 800 ? true : false}
          touchZoom={true}
          zoom={6}
          scrollWheelZoom={true}
        >
          <MyComponent latlng={pin} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable={true} position={pin !== null ? pin : [0, 0]}>
            <Tooltip direction="auto" permanent>
              Esta es tu ubicación aproximada.
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
export default Home;
