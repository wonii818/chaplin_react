import React from "react";
import "./Plan.css";

import MapContainer from "../container/MapContainer";
import SearchPlace from "./SearchPlace";
import Schedule from "./Schedule";
import useZusStore from "../store";
const Plan = () => {
  const place = useZusStore((state) => state.place);

  return (
    <div className="Plans">
      <div className="map_schedule">
        <Schedule />
      </div>

      <div className="map_main">
        <MapContainer searchPlace={place} />
      </div>

      <div className="map_search">
        <SearchPlace />
      </div>
    </div>
  );
};

export default Plan;
