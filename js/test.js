function initMap() { 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 },
  });

  // 関東1都6県のGeoJSON読み込み
  map.data.loadGeoJson("ibaraki.geojson");
  map.data.loadGeoJson("totigi.geojson");
  map.data.loadGeoJson("gunma.geojson");
  map.data.loadGeoJson("saitama.geojson");
  map.data.loadGeoJson("chiba.geojson");
  map.data.loadGeoJson("tokyo.geojson");
  map.data.loadGeoJson("kanagawa.geojson");

  // ▼ 色生成（市町村・区・県共通）
  function colorFromName(name) {
    if (!name) name = "unknown";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }

  // ▼ 地方名判定（今回は関東のみ）
  function getRegionName(pref) {
    const kanto = ["東京都", "埼玉県", "千葉県", "神奈川県", "茨城県", "栃木県", "群馬県"];
    if (kanto.includes(pref)) return "関東地方";
    return "その他";
  }

  // ▼ 地方レベルの色（統一色）
  function colorFromRegion(region) {
    return "hsla(0, 93%, 41%, 1.00)"; // 関東地方の色（好きに変更可能）
  }

  function updateStyleByZoom() {
    const zoom = map.getZoom();

    // ======================================================
    // 1️⃣ zoom ≥ 11 → 市区町村レベルで色分け
    // ======================================================
    if (zoom >= 11) {
      map.data.setStyle((feature) => {
        // 東京23区
        const tokyoWard = feature.getProperty("ward_ja");

        // 市区町村（国交省 N03 データ）
        const city = feature.getProperty("N03_004"); // 市
        const ward = feature.getProperty("N03_005"); // 区

        const name = tokyoWard || ward || city;

        return {
          fillColor: colorFromName(name),
          fillOpacity: 0.35,
          strokeColor: "",
          strokeWeight: 1,
        };
      });

    // ======================================================
    // 2️⃣ 7 ≤ zoom < 11 → 都県レベルで色分け
    // ======================================================
    } else if (zoom >= 8) {
      map.data.setStyle((feature) => {
        const pref = feature.getProperty("N03_001");
        return {
          fillColor: colorFromName(pref),
          fillOpacity: 0.6,
          strokeColor: "transparent",
          strokeWeight: 0,
        };
      });

    // ======================================================
    // 3️⃣ zoom < 7 → 地方レベルで色分け（関東は1色）
    // ======================================================
    } else {
      map.data.setStyle((feature) => {
        const pref = feature.getProperty("N03_001");
        const region = getRegionName(pref); // 関東地方に分類
        return {
          fillColor: colorFromRegion(region), // 関東は1色
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
