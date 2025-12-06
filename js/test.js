function initMap() { 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 35.6895, lng: 139.6917 },
  });

  // 北海道のGeoJSON読み込み
  map.data.loadGeoJson("data/hokkaido/hokkaido.geojson");
  // 東北6県のGeoJSON読み込み
  map.data.loadGeoJson("data/touhoku/aomori.geojson");
  map.data.loadGeoJson("data/touhoku/iwate.geojson");
  map.data.loadGeoJson("data/touhoku/miyagi.geojson");
  map.data.loadGeoJson("data/touhoku/akita.geojson");
  map.data.loadGeoJson("data/touhoku/yamagata.geojson");
  map.data.loadGeoJson("data/touhoku/fukusima.geojson");
  // 関東1都6県のGeoJSON読み込み
  map.data.loadGeoJson("data/kantou/ibaraki.geojson");
  map.data.loadGeoJson("data/kantou/totigi.geojson");
  map.data.loadGeoJson("data/kantou/gunma.geojson");
  map.data.loadGeoJson("data/kantou/saitama.geojson");
  map.data.loadGeoJson("data/kantou/chiba.geojson");
  map.data.loadGeoJson("data/kantou/tokyo.geojson");
  map.data.loadGeoJson("data/kantou/kanagawa.geojson");
  // 甲信越・北陸6県のGeoJSON読み込み
  map.data.loadGeoJson("data/kousinetu-hokuriku/niigata.geojson");
  map.data.loadGeoJson("data/kousinetu-hokuriku/toyama.geojson");
  map.data.loadGeoJson("data/kousinetu-hokuriku/isikawa.geojson");
  map.data.loadGeoJson("data/kousinetu-hokuriku/fukui.geojson");
  map.data.loadGeoJson("data/kousinetu-hokuriku/yamanasi.geojson");
  map.data.loadGeoJson("data/kousinetu-hokuriku/nagano.geojson");
  // 東海4県のGeoJSON読み込み
  map.data.loadGeoJson("data/toukai/gihu.geojson");
  map.data.loadGeoJson("data/toukai/sizuoka.geojson");
  map.data.loadGeoJson("data/toukai/aiti.geojson");
  map.data.loadGeoJson("data/toukai/mie.geojson");
  // 近畿2府4県のGeoJSON読み込み
  map.data.loadGeoJson("data/kinki/siga.geojson");
  map.data.loadGeoJson("data/kinki/kyoto.geojson");
  map.data.loadGeoJson("data/kinki/osaka.geojson");
  map.data.loadGeoJson("data/kinki/hyougo.geojson");
  map.data.loadGeoJson("data/kinki/nara.geojson");
  map.data.loadGeoJson("data/kinki/wakayama.geojson");
  // 中国5県のGeoJSON読み込み
  map.data.loadGeoJson("data/chuugoku/tottori.geojson");
  map.data.loadGeoJson("data/chuugoku/simane.geojson");
  map.data.loadGeoJson("data/chuugoku/okayama.geojson");
  map.data.loadGeoJson("data/chuugoku/hiroshima.geojson");
  map.data.loadGeoJson("data/chuugoku/yamaguchi.geojson");
  // 四国4県のGeoJSON読み込み
  map.data.loadGeoJson("data/sikoku/tokushima.geojson");
  map.data.loadGeoJson("data/sikoku/kagawa.geojson");
  map.data.loadGeoJson("data/sikoku/ehime.geojson");
  map.data.loadGeoJson("data/sikoku/kouchi.geojson");
  // 九州7県のGeoJSON読み込み
  map.data.loadGeoJson("data/kyusyuu/fukuoka.geojson");
  map.data.loadGeoJson("data/kyusyuu/saga.geojson");
  map.data.loadGeoJson("data/kyusyuu/nagasaki.geojson");
  map.data.loadGeoJson("data/kyusyuu/kumamoto.geojson");
  map.data.loadGeoJson("data/kyusyuu/ooita.geojson");
  map.data.loadGeoJson("data/kyusyuu/miyazaki.geojson");
  map.data.loadGeoJson("data/kyusyuu/kagoshima.geojson");
  // 沖縄県のGeoJSON読み込み
  map.data.loadGeoJson("data/okinawa/okinawa.geojson");

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
          strokeWeight: 0.5,
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
