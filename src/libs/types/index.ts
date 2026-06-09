export type UserInfo = {
  id: string;
  email: string;
  name: string;
};

export type ReportItem = {
  id: string;
  user: UserInfo | null;
  title: string;
  description: string;
  location: string;
  image: string | null;
  status: string; // LOST, FOUND, CLAIMED
  created_at: string;
};

export type JumpToProps = {
  jumpTo: (key: string) => void;
};

export type DetailNavigation = {
  openDetail: (item: ReportItem) => void;
};
