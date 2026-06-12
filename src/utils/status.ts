import { theme } from "@/src/libs/theme";

export type StatusConfig = {
  label: string;
  color: string;
  icon: string;
};

export const getStatusConfig = (status: string): StatusConfig => {
  const normalizedStatus = status?.toUpperCase();

  switch (normalizedStatus) {
    case "LOST":
      return {
        label: "Hilang",
        color: "#EF4444", // Danger (Red)
        icon: "alert-circle-outline",
      };
    case "FOUND":
      return {
        label: "Menemukan",
        color: "#F59E0B", // Warning (Amber)
        icon: "information-outline",
      };
    case "CLAIMED":
      return {
        label: "Selesai",
        color: "#10B981", // Success (Green)
        icon: "check-circle-outline",
      };
    default:
      return {
        label: "Tidak Diketahui",
        color: theme.colors.outline,
        icon: "help-circle-outline",
      };
  }
};
