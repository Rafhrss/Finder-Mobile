export type ReportItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string;
  status: "lost" | "found";
  created_at: string;
};

export const DUMMY_ITEMS: ReportItem[] = [
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
