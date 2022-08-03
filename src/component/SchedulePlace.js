import React from "react";
import { BiMinus } from "react-icons/bi";
import useZusStore from "../store";

function SchedulePlace({ item, day, i }) {
  const removePlaceFromStore = useZusStore(
    (state) => state.removePlaceFromStore
  );

  return (
    <div className="list" style={{ marginTop: "10px" }}>
      <div className="listinfo">
        <span>{i + 1}</span>
        <div className="place_name">{item.place_name}</div>

        {item.road_address_name ? (
          <div className="place_address">
            <span>{item.road_address_name}</span>
            <span>{item.address_name}</span>
          </div>
        ) : (
          <span>{item.address_name}</span>
        )}
        <button
          className="removeplanbtn"
          onClick={() => removePlaceFromStore(item.id, day)}
        >
          <BiMinus />
        </button>
      </div>
    </div>
  );
}

export default SchedulePlace;
