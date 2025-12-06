function initMap() { 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 },
  });

  // 一都三県のGeoJSON読み込み
  map.data.loadGeoJson("ibaraki.geojson");
  map.data.loadGeoJson("totigi.geojson");
  map.data.loadGeoJson("gunma.geojson");
  map.data.loadGeoJson("saitama.geojson");
  map.data.loadGeoJson("chiba.geojson");
  map.data.loadGeoJson("tokyo.geojson");
  map.data.loadGeoJson("kanagawa.geojson");

  // 市町村レベルの色（市名 or 区名）
  function colorFromName(name) {
    if (!name) name = "unknown";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  // 東京23区向け
  function colorFromTokyoWard(name) {
    return colorFromName(name);
  }

  function updateStyleByZoom() {
    const zoom = map.getZoom();

    if (zoom >= 11) {
      // ▼ ズームイン → 市区町村レベルで色分け（東京含む）
      map.data.setStyle((feature) => {

        // 東京23区（ward_ja がある場合）
        const tokyoWard = feature.getProperty("ward_ja");

        // N03_004 = 市名（例：さいたま市、横浜市）
        const city = feature.getProperty("N03_004");

        // N03_005 = 区名（例：西区、鶴見区）
        const ward = feature.getProperty("N03_005");

        // 市町村名を決定
        let name = tokyoWard || ward || city;

        return {
          fillColor: colorFromName(name),
          fillOpacity: 0.35,
          strokeColor: "#333",
          strokeWeight: 1,
        };
      });

    } else {
      // ▼ ズームアウト → 県ごと色分け
      map.data.setStyle((feature) => {
        const pref = feature.getProperty("N03_001");
        return {
          fillColor: colorFromName(pref),
          fillOpacity: 0.6,
          strokeColor: "transparent",
          strokeWeight: 0,
        };
      });
    }
  }

  updateStyleByZoom();
  map.addListener("zoom_changed", updateStyleByZoom);
}

