function initMap() { 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
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
  map.data.loadGeoJson("data/touhoku/fukushima.geojson");
  // 関東1都6県のGeoJSON読み込み
  map.data.loadGeoJson("data/kantou/ibaraki.geojson");
  map.data.loadGeoJson("data/kantou/tochigi.geojson");
  map.data.loadGeoJson("data/kantou/gunma.geojson");
  map.data.loadGeoJson("data/kantou/saitama.geojson");
  map.data.loadGeoJson("data/kantou/chiba.geojson");
  map.data.loadGeoJson("data/kantou/tokyo.geojson");
  map.data.loadGeoJson("data/kantou/kanagawa.geojson");
  // 中部8県のGeoJSON読み込み
  map.data.loadGeoJson("data/tyubu/niigata.geojson");
  map.data.loadGeoJson("data/tyubu/toyama.geojson");
  map.data.loadGeoJson("data/tyubu/ishikawa.geojson");
  map.data.loadGeoJson("data/tyubu/fukui.geojson");
  map.data.loadGeoJson("data/tyubu/yamanashi.geojson");
  map.data.loadGeoJson("data/tyubu/nagano.geojson");
  map.data.loadGeoJson("data/tyubu/gihu.geojson");
  map.data.loadGeoJson("data/tyubu/shizuoka.geojson");
  map.data.loadGeoJson("data/tyubu/aichi.geojson");
  // 近畿2府5県のGeoJSON読み込み
  map.data.loadGeoJson("data/kinki/mie.geojson");
  map.data.loadGeoJson("data/kinki/shiga.geojson");
  map.data.loadGeoJson("data/kinki/kyoto.geojson");
  map.data.loadGeoJson("data/kinki/osaka.geojson");
  map.data.loadGeoJson("data/kinki/hyogo.geojson");
  map.data.loadGeoJson("data/kinki/nara.geojson");
  map.data.loadGeoJson("data/kinki/wakayama.geojson");
  // 中国5県のGeoJSON読み込み
  map.data.loadGeoJson("data/chuugoku/tottori.geojson");
  map.data.loadGeoJson("data/chuugoku/shimane.geojson");
  map.data.loadGeoJson("data/chuugoku/okayama.geojson");
  map.data.loadGeoJson("data/chuugoku/hiroshima.geojson");
  map.data.loadGeoJson("data/chuugoku/yamaguchi.geojson");
  // 四国4県のGeoJSON読み込み
  map.data.loadGeoJson("data/sikoku/tokushima.geojson");
  map.data.loadGeoJson("data/sikoku/kagawa.geojson");
  map.data.loadGeoJson("data/sikoku/ehime.geojson");
  map.data.loadGeoJson("data/sikoku/kochi.geojson");
  // 九州7県のGeoJSON読み込み
  map.data.loadGeoJson("data/kyusyuu/fukuoka.geojson");
  map.data.loadGeoJson("data/kyusyuu/saga.geojson");
  map.data.loadGeoJson("data/kyusyuu/nagasaki.geojson");
  map.data.loadGeoJson("data/kyusyuu/kumamoto.geojson");
  map.data.loadGeoJson("data/kyusyuu/oita.geojson");
  map.data.loadGeoJson("data/kyusyuu/miyazaki.geojson");
  map.data.loadGeoJson("data/kyusyuu/kagoshima.geojson");
  map.data.loadGeoJson("data/kyusyuu/okinawa.geojson");

// ▼ 都道府県ごとに十分離れた色を作るバージョン
const prefColorMap = {};
let prefIndex = 0;
const TOTAL_PREFS = 47;

// Golden angle を使って均等に色相をバラけさせる
function colorFromName(name) {
  if (!name) name = "unknown";

  if (!prefColorMap[name]) {
    const goldenAngle = 137.508;
    const hue = (prefIndex * goldenAngle) % 360;
    prefColorMap[name] = `hsl(${hue}, 70%, 60%)`;

    prefIndex++;
    if (prefIndex > TOTAL_PREFS) prefIndex = 0;
  }

  return prefColorMap[name];
}


function getRegionName(pref) {
  const regions = {
    "北海道地方": ["北海道"],
    "東北地方": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
    "関東地方": ["東京都", "神奈川県", "千葉県", "埼玉県", "茨城県", "栃木県", "群馬県"],
    "中部地方": ["新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県"],
    "近畿地方": ["三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県"],
    "中国地方": ["鳥取県","島根県","岡山県","広島県","山口県"],
    "四国地方": ["徳島県","香川県","愛媛県","高知県"],
    "九州地方": ["福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"]
  };

  for (const region in regions) {
    if (regions[region].includes(pref)) return region;
  }
  return "その他";
}


function colorFromRegion(region) {
  const regionColors = {
    "北海道地方": "hsl(210, 70%, 60%)",
    "東北地方":   "hsl(185, 70%, 60%)",
    "関東地方":   "hsl(120, 70%, 60%)",
    "中部地方":   "hsl(60, 70%, 60%)",
    "近畿地方":   "hsl(30, 70%, 60%)",
    "中国地方":   "hsl(0, 70%, 60%)",
    "四国地方":   "hsl(280, 70%, 60%)",
    "九州地方":   "hsl(330, 70%, 60%)",
    "その他":     "hsl(0, 0%, 80%)"
  };
  return regionColors[region] || "hsl(0,0%,70%)";
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

// ▼ クリックして次のレベルにズームイン
map.data.addListener("click", (event) => {
  const zoom = map.getZoom();
  const feature = event.feature;

  // ポリゴンの中心座標を取得
  const bounds = new google.maps.LatLngBounds();
  feature.getGeometry().forEachLatLng((latlng) => bounds.extend(latlng));
  const center = bounds.getCenter();

  // ------------------------------------
  // 1️⃣ zoom < 7 → 地方クリック → zoom 8へ
  // ------------------------------------
  if (zoom < 7) {
    map.panTo(center);
    map.setZoom(8);
    return;
  }

  // ------------------------------------
  // 2️⃣ 7 ≤ zoom < 11 → 都道府県クリック → zoom 11へ
  // ------------------------------------
  if (zoom >= 7 && zoom < 11) {
    map.panTo(center);
    map.setZoom(11);
    return;
  }

  // ------------------------------------
  // 3️⃣ zoom ≥ 11 → 市区町村クリック → zoom 13へ
  // ------------------------------------
  if (zoom >= 11) {
    map.panTo(center);
    map.setZoom(13);
    return;
  }
});


  updateStyleByZoom();
  map.addListener("zoom_changed", updateStyleByZoom);
}
