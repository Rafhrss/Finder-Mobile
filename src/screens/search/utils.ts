type StatusType = "all" | "lost" | "found" | "done";

export const convertStatus = (status: StatusType) => {
  return status === "all"
    ? "Semua"
    : status === "lost"
      ? "Hilang"
      : status === "found"
        ? "Ketemu"
        : "Selesai";
};
