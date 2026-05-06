type StatusType = "all" | "lost" | "found";

export const convertStatus = (status: StatusType) => {
    return status === "all" ? "Semua" : status === "lost" ? "Hilang" : "Ditemukan";
};