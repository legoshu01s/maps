function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 35.681236, lng: 139.767125 }, // 東京駅中心
  });

  // 北海道の GeoJSON（国土地理院の境界データを簡略化したもの）
  const hokkaidoGeoJson = {
    "type": "Feature",
    "properties": { "name": "Hokkaido" },
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [141.6, 45.6], 
        [145.4, 44.5],
        [146.2, 43.3],
        [143.2, 41.7],
        [139.8, 41.2],
        [139.0, 43.1],
        [141.6, 45.6]
      ]]
    }
  };

  // 地図に読み込む
  map.data.addGeoJson(hokkaidoGeoJson);

  // 通常のスタイル
  map.data.setStyle({
    fillColor: "transparent",
    strokeColor: "#555",
    strokeWeight: 2
  });

  // ホバー時に赤く
  map.data.addListener("mouseover", function (event) {
    map.data.overrideStyle(event.feature, {
      strokeColor: "red",
      strokeWeight: 4
    });
  });

  // ホバー解除で元に戻す
  map.data.addListener("mouseout", function (event) {
    map.data.revertStyle();
  });
}
