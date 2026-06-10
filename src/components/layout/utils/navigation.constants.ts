import { RouteItem } from "./navigation.types";

export const routeScreen: RouteItem[] = [
  {
    key: "home",
    title: "Beranda",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  {
    key: "search",
    title: "Cari",
    focusedIcon: "magnify",
  },
  {
    key: "report",
    focusedIcon: "plus",
    unfocusedIcon: "plus",
  },
  {
    key: "chat",
    title: "Chat",
    focusedIcon: "chat",
    unfocusedIcon: "chat-outline",
  },
  {
    key: "profile",
    title: "Profil",
    focusedIcon: "account",
    unfocusedIcon: "account-outline",
  },
];
