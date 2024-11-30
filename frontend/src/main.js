$(document).ready(function() {
  ymaps.ready(init);

  function init() {
      // Create a new map instance
      var myMap = new ymaps.Map("app", {
          center: [55.641785, 37.725065], // Set the center of the map to the given coordinates
          zoom: 10 // Adjust the zoom level as needed
      });

      // Create a new placemark at the given coordinates
      var myPlacemark = new ymaps.Placemark([55.641785, 37.725065], {
          hintContent: 'This is a placemark',
          balloonContent: 'Coordinates: 55.641785, 37.725065'
      });

      // Add the placemark to the map
      myMap.geoObjects.add(myPlacemark);
  }
});