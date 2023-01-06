function getLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        resolve({ latitude, longitude });
      });
    });
  }
  
  async function initMap() {
    const { latitude: lat, longitude: lng } = await getLocation();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat, lng },
      disableDefaultUI: true,
    });
  
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("sidebar"));
  
    const control = document.getElementById("floating-panel");
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  
    directionsService
      .route({
        origin: 'Atlanta, GA',
        destination: 'Jacksonville, FL',
        travelMode: google.maps.TravelMode.BICYCLING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }
  
  window.initMap = initMap;