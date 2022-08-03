import React, { useEffect } from "react";
import useZusStore from "../store";
const { kakao } = window;

const SIZE = 5;
const MapContainer = ({ searchPlace }) => {
  // 검색결과 배열에 담아줌
  const setPagination = useZusStore((state) => state.setPagination);
  const setSearchResult = useZusStore((state) => state.setSearchResult);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    let pageOption = {
      size: SIZE,
      page: 1,
    };
    if (searchPlace) {
      ps.keywordSearch(searchPlace, placesSearchCB, pageOption);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        setPagination(pagination);
        setSearchResult(data);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace, setPagination, setSearchResult]);

  return <div id="myMap" />;
};

export default MapContainer;
