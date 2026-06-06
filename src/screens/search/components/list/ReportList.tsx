import React from "react";
import { FlatList } from "react-native";
import Card, { Item } from "../Card";

const DUMMY_ITEMS: Item[] = [
  {
    id: "1",
    title: "Dompet Kulit Coklat",
    description: "Dompet kulit warna coklat tua, berisi KTM dan kartu ATM",
    category: "Aksesoris",
    location: "Gedung Kuliah A Lt. 2",
    image_url: "",
    status: "lost",
    created_at: "18 Apr",
  },
  {
    id: "2",
    title: "Kunci Motor Honda",
    description:
      "Gantungan kunci motor Honda Beat warna merah dengan gantungan boneka",
    category: "Aksesoris",
    location: "Parkiran Fakultas Teknik",
    image_url: "",
    status: "found",
    created_at: "19 Apr",
  },
  {
    id: "3",
    title: "Laptop Asus ROG",
    description:
      "Laptop gaming Asus ROG warna hitam, ada stiker di bagian belakang",
    category: "Elektronik",
    location: "Lab Komputer B",
    image_url: "",
    status: "lost",
    created_at: "17 Apr",
  },
  {
    id: "4",
    title: "Payung Lipat Biru",
    description: "Payung lipat warna biru dengan motif garis putih",
    category: "Aksesoris",
    location: "Kantin Fakultas",
    image_url: "",
    status: "found",
    created_at: "20 Apr",
  },
  {
    id: "5",
    title: "Tas Ransel Hitam",
    description: "Tas ransel warna hitam, ada gantungan kunci di resleting",
    category: "Aksesoris",
    location: "Gedung Kuliah C Lt. 3",
    image_url: "",
    status: "lost",
    created_at: "16 Apr",
  },
];

import { useRouter } from "expo-router";

type ReportListProps = {
  activeTab: "all" | "lost" | "found";
  searchQuery: string;
};

const ReportList = ({ activeTab, searchQuery }: ReportListProps) => {
  const router = useRouter();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = DUMMY_ITEMS.filter((item) => {
    const matchedTab =
      activeTab === "all"
        ? true
        : activeTab === "lost"
          ? item.status === "lost"
          : item.status === "found";
    if (!matchedTab) return false;
    if (!normalizedQuery) return true;

    return [item.title, item.description, item.location, item.category]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card
          item={item}
          onPress={() =>
            router.push({ pathname: "/report-detail", params: { ...item } })
          }
        />
      )}
      className="px-4 pt-3 pb-4"
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ReportList;
