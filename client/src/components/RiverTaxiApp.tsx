import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import names from "./name.json";

const RiverTaxiApp: React.FC = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const handleSearch = () => {
    // Логика поиска маршрута
    console.log("Searching route from", startPoint, "to", endPoint);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        style={{ width: "30%", padding: "20px", backgroundColor: "#f0f0f0" }}
      >
        <div>
          <label>Откуда:</label>
          <select
            style={{ width: "100%", marginBottom: "10px" }}
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          >
            <option value="">Выберите пункт</option>
            {names.map((name) => (
              <option key={name.ID} value={name.Name}>
                {name.Name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Куда:</label>
          <select
            style={{ width: "100%", marginBottom: "10px" }}
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
          >
            <option value="">Выберите пункт</option>
            {names.map((name) => (
              <option key={name.ID} value={name.Name}>
                {name.Name}
              </option>
            ))}
          </select>
        </div>
        <button
          style={{ width: "100%", backgroundColor: "#a0d468", padding: "10px" }}
          onClick={handleSearch}
        >
          Найти
        </button>
      </div>
      <div style={{ width: "70%" }}>
        <YMaps>
          <Map
            defaultState={{ center: [55.751244, 37.618423], zoom: 14 }}
            height="100%"
            width="100%"
          >
            {names.map((name) => (
              <Placemark
                key={name.ID}
                geometry={[name.Longitude, name.Latitude]}
                options={{ preset: "islands#circleIcon", iconColor: "#000" }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default RiverTaxiApp;
