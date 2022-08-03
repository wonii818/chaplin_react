import React from "react";
import { ReactComponent as Chaplinlogo } from "../assets/images/chaplin_logo.svg";

const Header = () => (
  <div className="header">
    <div className="gnb">
      <div>
        <a href="#" className="info">
          채플린
        </a>
      </div>
      <div>
        <a href="#" className="chat">
          챗봇 추천지
        </a>
      </div>
      <div>
        <Chaplinlogo width="80" height="80" />
      </div>
      <div>
        <a href="#" className="plan">
          일정 계획
        </a>
      </div>
      <div>
        <a href="#" className="fes">
          전국 축제
        </a>
      </div>
    </div>
  </div>
);

export default Header;
