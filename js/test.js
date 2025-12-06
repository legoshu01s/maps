function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 }, // 東京中心
  });

  // GeoJSON（東京23区の詳細データ）を読み込み
  map.data.loadGeoJson("tokyo.geojson");

  // スタイル
  map.data.setStyle({
    fillColor: "transparent",
    strokeColor: "#333",
    strokeWeight: 1
  });

  // ホバー時のハイライト
  map.data.addListener("mouseover", (e) => {
    map.data.overrideStyle(e.feature, {
      strokeColor: "red",
      strokeWeight: 3
    });
  });

  map.data.addListener("mouseout", () => {
    map.data.revertStyle();
  });
}
