import SearchView from "@/src/screens/search/views";
import React from "react";
import type { JumpToProps, DetailNavigation } from "@/src/libs/types";

const search = ({ jumpTo, openDetail }: JumpToProps & DetailNavigation) => {
  return (
    <SearchView
      goReport={() => jumpTo("report")}
      openDetail={openDetail}
    />
  );
};

export default search;
