import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

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
          <input
            style={{ width: "100%", marginBottom: "10px" }}
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          />
        </div>
        <div>
          <label>Куда:</label>
          <input
            style={{ width: "100%", marginBottom: "10px" }}
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
          />
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
            {/* Пример добавления причалов */}
            <Placemark
              geometry={[55.75222, 37.61556]}
              options={{ preset: "islands#circleIcon", iconColor: "#ffcc00" }}
            />
            <Placemark
              geometry={[55.75583, 37.6173]}
              options={{ preset: "islands#circleIcon", iconColor: "#ffcc00" }}
            />
            <Placemark
              geometry={[55.75856, 37.62044]}
              options={{ preset: "islands#circleIcon", iconColor: "#ffcc00" }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default RiverTaxiApp;
