      function initMap() {
        const position = { lat: 35.681236, lng: 139.767125 }; // 東京駅
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 5,
          center: position,
        });
      }

