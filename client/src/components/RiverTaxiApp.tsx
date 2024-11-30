/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Button } from "@nextui-org/button";

import names from "./name.json";
import schedules from "./infos.json";

const RiverTaxiApp: React.FC = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null); // Состояние для хранения расписания

  const handleSearch = () => {
    // Логика поиска маршрута
    console.log("Searching route from", startPoint, "to", endPoint);
  };

  // Получение данных для выбранного причала (функция мемоизирована для оптимизации)
  const getDetailsForPlace = useCallback(
    (placeName: string) => {
      return (
        schedules.filter((schedule) => schedule.Name === placeName) || null
      );
    },
    [schedules],
  );

  // Обработчик нажатия на Placemark
  const handlePlacemarkClick = (placeName: string) => {
    const details = getDetailsForPlace(placeName);

    setSelectedDetails(details); // Изменение состояния только при клике
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
        <Button
          style={{ width: "100%", backgroundColor: "#a0d468", padding: "10px" }}
          onClick={handleSearch}
        >
          Найти
        </Button>
      </div>
      <div style={{ width: "70%" }}>
        <YMaps>
          <Map
            defaultState={{ center: [55.751244, 37.618423], zoom: 14 }}
            height="100%"
            width="100%"
          >
            {names.map((name) => {
              const isSelected =
                name.Name === startPoint || name.Name === endPoint;

              return (
                <Placemark
                  key={name.ID}
                  geometry={[name.Longitude, name.Latitude]}
                  options={{
                    preset: "islands#circleIcon",
                    iconColor: isSelected ? "#000ade" : "#a4a4a4",
                  }}
                  onClick={() => handlePlacemarkClick(name.Name)} // При нажатии показываем расписание
                />
              );
            })}
          </Map>
        </YMaps>
      </div>
      {/* Модальное окно для показа расписания */}
      {selectedDetails && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            maxWidth: "500px",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <h3>Детали расписания</h3>
          {selectedDetails.map((detail: any) => (
            <div key={detail.uniq} style={{ marginBottom: "15px" }}>
              <p>
                <strong>Название причала:</strong> {detail.Name}
              </p>
              <p>
                <strong>Название судна:</strong> {detail.ShipName || "Отменено"}
              </p>
              <p>
                <strong>Маршрут:</strong> {detail["NameRoute"]}
              </p>
              <p>
                <strong>Швартовочное место:</strong> {detail.BerthLetter}
              </p>
              <p>
                <strong>Дата действия:</strong> {detail.StartRecord} -{" "}
                {detail.EndRecord}
              </p>
              <p>
                <strong>Причаливание:</strong> {detail.Approach}
              </p>
              <p>
                <strong>Отход:</strong> {detail.Waste}
              </p>
            </div>
          ))}
          <button
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setSelectedDetails(null)}
          >
            Закрыть
          </button>
        </div>
      )}
      {/* Затемнение фона */}
      {selectedDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setSelectedDetails(null)}
        />
      )}
    </div>
  );
};

export default RiverTaxiApp;
