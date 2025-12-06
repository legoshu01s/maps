function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 },
  });

  map.data.loadGeoJson("tokyo.geojson");

  // 区名から色を自動生成する関数
  function colorFromWardName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`; // 彩度70% 明度60%で見やすい色
  }

  // スタイル設定（自動色＋透明度高め）
  map.data.setStyle((feature) => {
    const ward = feature.getProperty("ward_ja");
    return {
      fillColor: colorFromWardName(ward),
      fillOpacity: 0.2,  // ← ★透明度を高める（0〜1）
      strokeColor: "#333",
      strokeWeight: 1,
    };
  });

  // ハイライト（濃く）
  map.data.addListener("mouseover", (e) => {
    map.data.overrideStyle(e.feature, {
      fillOpacity: 0.4,
      strokeColor: "red",
      strokeWeight: 2,
    });
  });

  map.data.addListener("mouseout", () => {
    map.data.revertStyle();
  });
}
