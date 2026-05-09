import SearchView from "@/src/screens/search/views";
import React from "react";
import { JumpToProps } from "../libs/types";

const search = ({ jumpTo }: JumpToProps) => {
  return <SearchView goReport={() => jumpTo("report")} />;
};

export default search;
