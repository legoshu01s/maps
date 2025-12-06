function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 },
  });

  map.data.loadGeoJson("tokyo.geojson");

  // 区名から色を自動生成（区別色）
  function colorFromWardName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  // ★スタイル変更を行う関数
  function updateStyleByZoom() {
    const zoom = map.getZoom();

    if (zoom >= 11) {
      // 近く→区ごとに色分け
      map.data.setStyle((feature) => {
        const ward = feature.getProperty("ward_ja");
        return {
          fillColor: colorFromWardName(ward),
          fillOpacity: 0.2,
          strokeColor: "#333",
          strokeWeight: 1,
        };
      });
    } else {
      // 遠く→東京都全体を同じ色
      map.data.setStyle({
        fillColor: "#f53302ff",   // ← 好きな色でOK
        fillOpacity: 0.6,
        strokeColor: "#555",
        strokeWeight: 1,
      });
    }
  }

  // 初期スタイル
  updateStyleByZoom();

  // ★ズーム変更イベントでスタイル切り替え
  map.addListener("zoom_changed", updateStyleByZoom);

  // hover ハイライト（ズームが近いときのみ有効）
  map.data.addListener("mouseover", (e) => {
    if (map.getZoom() >= 8) {
      map.data.overrideStyle(e.feature, {
        fillOpacity: 0.5,
        strokeColor: "red",
        strokeWeight: 2,
      });
    }
  });

  map.data.addListener("mouseout", () => {
    map.data.revertStyle();
  });
}
