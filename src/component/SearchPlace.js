import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import useZusStore from "../store";
import PagenationFooter from "./PagenationFooter";

const SearchPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function SearchPlace() {
  const [InputText, setInputText] = useState("");
  const pagination = useZusStore((state) => state.pagination);

  const searchPlace = useZusStore((state) => state.searchPlace);
  const searchResult = useZusStore((state) => state.searchResult);
  const addPlaceToStore = useZusStore((state) => state.addPlaceToStore);

  const onChange = (e) => setInputText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlace(InputText);
    setInputText("");
  };

  return (
    <SearchPlaceContainer>
      <form className="mapsearch" onSubmit={handleSubmit}>
        <input
          className="search"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
        />
        <button type="submit" className="searchbtn">
          <FaSearch />
        </button>
      </form>
      <div className="result_list">
        {searchResult.map((item, i) => {
          return (
            <div className="list" key={i} style={{ marginTop: "10px" }}>
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
                  className="addplanbtn"
                  onClick={() => addPlaceToStore(item)}
                >
                  <BsPlus />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div id="pagination">
        {pagination && <PagenationFooter showCount={5} />}
      </div>
    </SearchPlaceContainer>
  );
}

export default SearchPlace;
