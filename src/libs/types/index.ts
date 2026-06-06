import type { ReportItem } from "@libs/dummyData";

export type JumpToProps = {
  jumpTo: (key: string) => void;
};

export type DetailNavigation = {
  openDetail: (item: ReportItem) => void;
};
