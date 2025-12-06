function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 43.0, lng: 142.0 }, // 北海道の中心
  });

  fetch('./hokkaido.geojson')
    .then(res => res.json())
    .then(geojson => {
      console.log("読み込んだ GeoJSON:", geojson);
      map.data.addGeoJson(geojson);

      map.data.setStyle({
        fillColor: "transparent",
        strokeColor: "#f00",
        strokeWeight: 2
      });
    })
    .catch(err => console.error("エラー:", err));
}
