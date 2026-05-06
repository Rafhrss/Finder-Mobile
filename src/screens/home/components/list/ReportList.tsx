import React from "react";
import { ScrollView, View } from "react-native";
import Card, { Item } from "../Card";

export const DUMMY_ITEMS: Item[] = [
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
];

type ReportListProps = {
  activeTab: "all" | "lost" | "found";
};

const ReportList = ({ activeTab }: ReportListProps) => {
  const filteredItems = DUMMY_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "lost") return item.status === "lost";
    if (activeTab === "found") return item.status === "found";
    return true;
  });

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="p-5"
      showsVerticalScrollIndicator={false}
    >
      {filteredItems.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      <View className="h-20" />
    </ScrollView>
  );
};

export default ReportList;
