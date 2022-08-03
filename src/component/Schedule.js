import React, { useEffect } from "react";
import { useRef } from "react";
import useZusStore from "../store";
import "./Schedule.css";
import SchedulePlace from "./SchedulePlace";
import { BsPlus } from "react-icons/bs";

const Schedule = () => {
  const daysRef = useRef(null);
  const days = useZusStore((state) => state.days);
  const dayCount = useZusStore((state) => state.dayCount);
  const increaseDayCount = useZusStore((state) => state.increaseDayCount);

  const day1 = days[0];
  const hasPlace = day1.length !== 0;

  useEffect(() => {
    if (daysRef.current) {
      daysRef.current.scrollTop = daysRef.current.scrollHeight;
    }
  }, [dayCount]);

  useEffect(() => {
    if (daysRef.current) {
      daysRef.current.scrollTop =
        daysRef.current.children[0].scrollHeight - daysRef.current.clientHeight;
    }
  }, [day1]);

  return (
    <div className="schedule">
      {/*  */}
      <div className="plan_info">
        <div className="eng_area">지역을 선택하세요.</div>
        <div className="area"></div>
        <div className="date">
          <p>날짜를 선택하세요.</p>
        </div>
      </div>
      {/*  */}
      <div className="place">
        {hasPlace ? ( 
          <div className="planner pointer" >
            일정표 
            <BsPlus className="add_day" onClick={increaseDayCount}/>
          </div>
        ) : (
          <div className="planner">
            <p>일정표</p>
          </div>
        )}
        {hasPlace && (
          <div className="schedule-container" ref={daysRef}>
            {new Array(dayCount).fill(0).map((_, idx, arr) => {
              const title = `DAY ${idx + 1}`;
              const daySchedule = days[idx] || [];
              return (
                <div key={title} className="schedule-wrapper">
                  <div className="schedule-day-title">{title}</div>
                  {daySchedule.map((item, i) => {
                    return (
                      <SchedulePlace
                        key={`item-${i}`}
                        item={item}
                        day={idx}
                        i={i}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/*  */}
      <div className="btnsaveplan">일정 생성하기</div>
    </div>
  );
};

export default Schedule;
