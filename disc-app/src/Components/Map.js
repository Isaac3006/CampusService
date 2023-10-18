import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef, useState, useEffect } from "react";
import { projDB } from "../firebase/config.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import L from "leaflet";

import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import NavBar from "./Navbar";

const markerIcon = new L.Icon({
  iconUrl: require("./marker.png"),
  iconSize: [40, 45],
  // iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -20],
});

const api_key = `2d66a209a1e88c7202c486cdf96eee13309899ce`;
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const eventsRef = projDB.collection("events");
const query = eventsRef.orderBy("createdAt");

const MapObject = (props) => {
  // Querying firestore
  let [events] = useCollectionData(query, { idField: "id" }); // Use this array for markers
  const [gCodes, setGCodes] = useState(new Map([]));

  useEffect(() => {
    if (!events) {
      return;
    }
    for (let i = 0; i < events.length; i++) {
      let q = `https://api.geocodify.com/v2/geocode?api_key=${api_key}&q=${events[i].location}, Atlanta, Georgia`;
      // console.log("Query: ", q);
      const id = events[i].docId;
      fetch(q, requestOptions)
        .then((out) => out.json())
        .then((data) => {
          if (!data.response.features[0]) {
            return;
          }
          let coords = data.response.features[0].geometry.coordinates;
          // console.log("here ", q, [coords[1], coords[0]]);
          let coords2 = [coords[1], coords[0]]; // lat, lng
          setGCodes(new Map(gCodes.set(id, coords2)));
        });
    }
  }, [events]);

  const center = [33.775489, -84.397403];

  let ZOOM_LEVEL = 16;
  const mapRef = useRef();

  return (
    <div>
      <NavBar />
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        style={{ width: "98.9vw", height: "92vh" }}
      >
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        ></TileLayer>
        {events &&
          gCodes &&
          events.map((ev, idx) => {
            if (props.toFilter) {
              if (
                props.hostToFilter.length !== 0 &&
                ev.host !== props.hostToFilter
              ) {
                return <span key={idx}></span>;
              }
              if (
                props.dateToFilter.length !== 0 &&
                ev.date !== props.dateToFilter
              ) {
                return <span key={idx}></span>;
              }
              if (
                props.locationToFilter.length !== 0 &&
                ev.location !== props.locationToFilter
              ) {
                return <span key={idx}></span>;
              }
            }
            const c = gCodes.get(ev.docId);
            if (!c) {
              return <span key={idx}></span>;
            }
            return (
              <Marker key={idx} position={c} icon={markerIcon}>
                <Popup
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={idx}
                >
                  <h2>{ev.title}</h2>
                  <p>{ev.host}</p>
                  <p>{ev.desc}</p>
                  <p>
                    {ev.date} || {ev.time}
                  </p>
                  <p>{ev.location}</p>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapObject;
