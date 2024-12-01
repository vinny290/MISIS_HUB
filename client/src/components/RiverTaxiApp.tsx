/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Image } from "@nextui-org/image";
import { Switch } from "@nextui-org/switch";
import axios from "axios";

import schedules from "./schedules.json";
import { calculateDistance } from "./CalculateDistance";

import { Name, Ships } from "@/types";
import "../styles/taxi.css";

const RiverTaxiApp: React.FC = () => {
  const [names, setNames] = useState<Name[]>([]);
  const [ships, setShips] = useState<Ships[]>([]);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [selectedDetails, setSelectedDetails] = useState<any | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const startLocation = names.find((name) => name.Name === startPoint);
    const endLocation = names.find((name) => name.Name === endPoint);

    if (startLocation && endLocation) {
      const calculatedDistance = calculateDistance(
        startLocation.Latitude,
        startLocation.Longitude,
        endLocation.Latitude,
        endLocation.Longitude,
      );

      setDistance(calculatedDistance);
      const speed = 20; // Скорость корабля в км/ч
      const time = (calculatedDistance / speed) * 60;

      setTravelTime(time);
    }
  };

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const apiUrl = "http://localhost:3000/data";

    axios
      .get(apiUrl)
      .then((resp) => {
        const names = resp.data;

        setNames(names);
      })
      .catch((error) => {
        console.error("Error fetching names:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/ships";

    axios
      .get(apiUrl)
      .then((resp) => {
        const ships = resp.data;

        setShips(ships);
      })
      .catch((error) => {
        console.error("Error fetching ships:", error);
      });
  }, []);

  const getDetailsForPlace = useCallback(
    (placeName: string) => {
      return (
        schedules.filter((schedule) => schedule.Name === placeName) || null
      );
    },
    [schedules],
  );

  const handlePlacemarkClick = (placeName: string) => {
    const details = getDetailsForPlace(placeName);

    setSelectedDetails(details); // Изменение состояния только при клике
  };

  const handleOrderClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleSearch();
    }, 2000);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="image mb-2">
          <Image
            alt="Речной транспорт"
            src="../../public/logo.svg"
            width="300%"
          />
        </div>
        <h1 className="text-left font-semibold text-2xl mb-3">
          Параметры маршрута:
        </h1>
        <div>
          <Autocomplete
            className="mb-5"
            inputValue={startPoint}
            placeholder="Откуда"
            style={{ width: "100%", marginBottom: "10px" }}
            onInputChange={(value) => setStartPoint(value)}
            onSelectionChange={(key) => setStartPoint(key)}
          >
            {names.map((name) => (
              <AutocompleteItem key={name.ID} value={name.Name}>
                {name.Name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div>
          <Autocomplete
            className="mb-5"
            inputValue={endPoint}
            placeholder="Куда"
            style={{ width: "100%", marginBottom: "10px" }}
            onInputChange={(value) => setEndPoint(value)}
            onSelectionChange={(key) => setEndPoint(key)}
          >
            {names.map((name) => (
              <AutocompleteItem key={name.ID} value={name.Name}>
                {name.Name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="mb-3">
          <Switch>Буду с инвалидным креслом</Switch>
        </div>
        <div className="mb-3">
          <Switch>Буду с собакой-повадырем</Switch>
        </div>
        <Button
          className="w-full bg-[#00aae6] p-2"
          isLoading={loading}
          onClick={handleOrderClick}
        >
          <p className="font-medium text-white p-0 text-xl">Заказать</p>
        </Button>
        {distance !== null && travelTime !== null && (
          <Card className="mt-5 p-2">
            <h4 className="font-medium">Расстояние между пунктами:</h4>
            <p>{distance.toFixed(2)} км</p>
            <h4 className="font-medium">Время в пути:</h4>
            <p>~{travelTime.toFixed(1)} Минут(ы)</p>
          </Card>
        )}
      </div>
      <div className="map">
        <YMaps>
          <Map
            defaultState={{ center: [55.751244, 37.618423], zoom: 14 }}
            height="100vh"
            width="100vw"
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
                    iconColor: isSelected ? "#00AAE6" : "#a4a4a4",
                  }}
                  onClick={() => handlePlacemarkClick(name.Name)} // При нажатии показываем расписание
                />
              );
            })}
            {ships.map((ship) => {
              return (
                <Placemark
                  key={ship.ID}
                  geometry={ship.Coordinates}
                  options={{
                    // Используем эмодзи корабля 🚢 или изображение
                    iconLayout: "default#image",
                    iconImageHref:
                      "https://cdn0.iconfinder.com/data/icons/citycons/150/Citycons_ship-1024.png", // Ссылка на изображение корабля
                    iconImageSize: [32, 32], // Размер изображения (ширина, высота)
                    iconImageOffset: [-16, -16], // Смещение иконки относительно точки (центрирование)
                  }}
                />
              );
            })}
          </Map>
        </YMaps>
      </div>
      {/* Модальное окно для показа расписания */}

      {selectedDetails && (
        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 shadow-lg z-[1000] max-w-[500px] h-[500px] overflow-y-auto">
          <CardBody>
            <h3 className="text-center">Детали расписания:</h3>
            {selectedDetails.map((detail: any) => (
              <div key={detail.uniq} style={{ marginBottom: "15px" }}>
                <p>
                  <strong>Название причала:</strong> {detail.Name}
                </p>
                <p>
                  <strong>Название судна:</strong>{" "}
                  {detail.ShipName || "Отменено"}
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
          </CardBody>
        </Card>
      )}
      {/* Затемнение фона */}
      {selectedDetails && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-[999]"
          onClick={() => setSelectedDetails(null)}
        />
      )}
    </div>
  );
};

export default RiverTaxiApp;
