import React from "react";
import { Avatar } from "react-native-paper";

import Btn from "../../btn";
import styled from "styled-components/native";

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PagerBtn = styled(Avatar.Icon)`
  background: transparent;
`;

const PageText = styled.Text`
  color: white;
  font-size: 12px;
`;

// const PageBtn = styled(Btn)`
//   color: white;
// `;

const Pager = ({
  currentPage,
  fetchMovies,
  hasNextPage,
  setFocusing,
  focusing,
}) => {
  return (
    <Wrapper>
      {currentPage > 1 ? (
        <Btn
          onFocus={() => {
            setFocusing({
              type: "pager",
              index: 0,
            });
          }}
          onPress={() => {
            fetchMovies(currentPage - 1);
          }}
        >
          <PagerBtn
            icon="chevron-left"
            size={35}
            color={
              focusing.type === "pager" && focusing.index === 0
                ? "#1e8effe8"
                : "white"
            }
          />
        </Btn>
      ) : null}
      <PageText>第{currentPage}頁</PageText>
      {hasNextPage ? (
        <Btn
          onFocus={() => {
            setFocusing({
              type: "pager",
              index: 1,
            });
          }}
          onPress={() => {
            fetchMovies(currentPage + 1);
          }}
        >
          <PagerBtn
            icon="chevron-right"
            size={35}
            color={
              focusing.type === "pager" && focusing.index === 1
                ? "#1e8effe8"
                : "white"
            }
          />
        </Btn>
      ) : null}
    </Wrapper>
  );
};

export default Pager;
