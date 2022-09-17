import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { DayPickerRangeController } from "react-dates";
import { ReactComponent as PrevIcon } from "./PrevIcon.svg";
import { ReactComponent as NextIcon } from "./NextIcon.svg";
import "moment/locale/ko";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";


const DatePicker = ({ start, end, blockedDates, gapBetweenMonth }) => {
  const [startDate, setStartDate] = useState(start ? moment(start) : null);
  const [endDate, setEndDate] = useState(end ? moment(end) : null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const blockedDate = useState(blockedDates)[0];

  const closestPrevBlockedDate = (target, blockedDates) => {
    const prevBlockedDate = blockedDates
      ?.map(date => moment(date, "YYYY-MM-DD"))
      .sort(date => date.valueOf())
      .reverse()
      .find(date => date.isBefore(target));
    return prevBlockedDate;
  };


  const isBlocked = day => {
    let result = false;
    const newDay = moment(day.format("YYYY-MM-DD"));

  // Case #1. 시작, 끝 날짜 둘 다 선택
  if (startDate !== null && endDate !== null) {
    result = blockedDate?.some(date => day.format("YYYY-MM-DD") === date) || day.isBefore(moment().subtract(1,'days'));
    return result;


    // Case #2. 둘다 선택 되지 않음.
  } else {
    result = blockedDate?.some(date => day.format("YYYY-MM-DD") === date) || day.isBefore(moment().subtract(1,'days'));
    return result;
  }
};

  return (
    <>
      <DatePickerSection>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            console.log(startDate, endDate)
          }}
          
          focusedInput={focusedInput}
          onFocusChange={focusedInput => {
            setFocusedInput(focusedInput || "startDate");
          }}
          numberOfMonths={2}
          horizontalMonthPadding={gapBetweenMonth || 25}
          isDayBlocked={isBlocked}
          monthFormat="YYYY[년 ]MMMM"
          navPrev={
            <PrevButton>
              <PrevIcon />
            </PrevButton>
          }
          navNext={
            <NextButton>
              <NextIcon />
            </NextButton>
          }
          noBorder
          
        />
        <SelectButtonWrapper>
          <SelectButton>
            적용하기
          </SelectButton>
        </SelectButtonWrapper>

      </DatePickerSection>
    </>
  );
};

export default DatePicker;



const DatePickerSection = styled.section`
  width:98.7%;
  height:100%;
  overflow:hidden;
  position:fixed;
  z-index:2;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  background-color: rgba(0,0,0,0.3);
  

  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
  .CalendarMonthGrid{
   background-color:#f7f7f700
  }

  .DayPicker_transitionContainer{
    border-radius:0px;
    width: 740px !important;
    height:503px !important;
  }
  
  .CalendarMonthGrid__horizontal {
    left:0px;
  }
  
  
.CalendarDay__selected_span:last-of-type {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;

}

.CalendarDay__selected_span:first-of-type {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}

.CalendarMonthGrid__horizontal {
  left:0px;
}

.DayPicker_focusRegion {
  width:740px;
}

  element.style {
    width: 740px;
    margin: auto;
    margin-top: 25%;
}

.DayPicker__horizontal{
  margin:150px auto;
  height:503px;
  width:740px !important;
  text-aligin:center;
}

.CalendarMonth{
    margin-top:53px;
    margin-left:30px;
   
}

.DayPicker_weekHeader:nth-child(1) {
  padding:0px !important;
  margin-top:53px;
  margin-left:48px;
  width: 273px;
  color:black;
  font-size:14px;
  font-weight:bold;
}
.DayPicker_weekHeader:nth-child(2) {
  padding:0px !important;
  margin-top:53px;
  margin-left:75px;
  width: 273px;
  color:black;
  font-size:14px;
  font-weight:bold;
}
.DayPicker_weekHeaders__horizontal {
  width:100%;
}

  .CalendarDay__default {
    font-size:13px;
    font-weight:regular;
    border-radius:50%;
    border: none;
    vertical-align: middle;
    outline: none;
  }

  .CalendarDay__default:hover {
    background: transparent;
    border: none;
    color: black;
    box-shadow: inset 0 0 0 1px #566AF0;
  }

  .CalendarDay__selected_span {
    background-color: #D8E0FA;
    border-radius: 50%;
    border: none;
    color: black;
    
  }
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: white;
    border: none;
    color: #d2d2d2;
    box-shadow: none;
    text-decoration: line-through;
  }
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    color: black;
    background-color: #D8E0FA;
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: none;
    box-shadow: inset 0 0 0 1px #566AF0;
    z-index:1;
    border-radius:50%;
    border: none;
    color: black;
  }
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    background: white;
  }

  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span:hover {
    color: black;
    background-color: white;
    border: none;
  }
  .CalendarMonth_caption {
    margin-bottom: 10px;
    color:black;
    font-size:16px;
  }

`;

const NavButtonForm = styled.div`
  position: absolute;
  top: 52px;
  .svg-icon {
    width: 18px;
    height: 18px;
    path,
    polygon,
    rect {
      fill: #484848;
    }
  }
`;

const PrevButton = styled(NavButtonForm)`
  margin-top:27px;
  left:60px;
`;

const NextButton = styled(NavButtonForm)`
  margin-top:27px;
  right: 60px;
`;
const SelectButtonWrapper = styled.div`
display: flex;
vertical-align: middle;
justify-content: center;
width:100%;
height:50px;
`;

const SelectButton = styled.button`
  position: absolute;
  transform: translate(0, -500%);
  width: 200px;
  height: 50px;
  font-weight: bold;
  color: white;
  background:#566AF0;
  outline: none;
  cursor: pointer;
`;
