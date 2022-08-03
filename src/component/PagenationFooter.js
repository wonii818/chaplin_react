import styled from "styled-components";
import useZusStore from "../store";

const RightIcon10 = ({ fill = "#FFFFFF" }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.25 8.5L6.75 5L3.25 1.5"
      stroke={fill}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const PagenationFooterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  cursor: pointer;
  ${(props) =>
    props.isDisable &&
    `
	  pointer-events: none; 
	`}
`;
const LeftIconWrapper = styled(RightIconWrapper)`
  transform: rotate(180deg);
`;

const NumberBox = styled(RightIconWrapper)`
  border-radius: 6px;
  font-size: 12px;
  color: "#C9C9C9";

  &.active {
    color: black;
    background-color: #fafafa;
    font-weight: 700;
  }
`;

// totalPage가 5개 이하
// totalPage가 5개 이상

const PagenationFooter = () => {
  const page = useZusStore((state) => state.page);
  const pagination = useZusStore((state) => state.pagination);
  const setPagePrev = useZusStore((state) => state.setPagePrev);
  const setPageNext = useZusStore((state) => state.setPageNext);
  const setPagePrevPagination = () => {
    setPagePrev();
    pagination.prevPage();
  };
  const setPageNextPagination = () => {
    if (pagination.hasNextPage) {
      setPageNext();
      pagination.nextPage();
    }
  };

  return (
    <PagenationFooterContainer>
      <LeftIconWrapper
        isDisable={page === 1}
        onClick={() => setPagePrevPagination()}
      >
        <RightIcon10 fill={page === 1 ? "#C9C9C9" : "black"} />
      </LeftIconWrapper>
      {/*  */}
      <NumberBox className={`active`}>{page}</NumberBox>
      {/*  */}
      <RightIconWrapper onClick={() => setPageNextPagination()}>
        <RightIcon10 fill={"black"} />
      </RightIconWrapper>
    </PagenationFooterContainer>
  );
};

export default PagenationFooter;
