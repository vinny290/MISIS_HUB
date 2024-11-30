ymaps.ready(function () {
  var myMap = new ymaps.Map("map", {
    center: [55.753994, 37.622093],
    zoom: 9,
    // Добавим кнопку для построения маршрутов на карту.
    controls: ["routeButtonControl"],
  });

  var control = myMap.controls.get("routeButtonControl");

  // Откроем панель для построения маршрутов.
  control.state.set("expanded", true);

  // Укажем координаты точки отправления и точки прибытия.
  control.routePanel.state.set({
    from: "55.641785,37.725065", // Координаты точки отправления
    to: "55.683699,37.714149", // Координаты точки прибытия
    type: "masstransit",
  });
});
