import React, { useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { TabBar, TabView } from "react-native-tab-view";
import ReportList from "../components/list/ReportList";
import { convertStatus } from "../utils";
import type { ReportItem } from "@libs/dummyData";

const TAB_ITEMS = ["all", "lost", "found", "done"] as const;
type TabKey = (typeof TAB_ITEMS)[number];
type SearchProps = {
  goReport: () => void;
  openDetail: (item: ReportItem) => void;
};

const Index = (props: SearchProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { colors } = useTheme();
  const layout = useWindowDimensions();
  const routes = useMemo(
    () =>
      TAB_ITEMS.map((tab) => ({
        key: tab,
        title: convertStatus(tab),
      })),
    [],
  );

  return (
    <View className="flex-1 bg-[#060E17]">
      <View className="mx-4 mt-4 mb-4">
        <Searchbar
          placeholder="Cari Barang..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="flex-1">
        <TabView
          navigationState={{ index: activeIndex, routes }}
          onIndexChange={setActiveIndex}
          initialLayout={{ width: layout.width }}
          renderScene={({ route }) => (
            <ReportList
              activeTab={route.key as TabKey}
              searchQuery={searchQuery}
              openDetail={props.openDetail}
            />
          )}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: "transparent",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#1D2A39",
                marginHorizontal: 16,
              }}
              indicatorStyle={{
                backgroundColor: "#0AF3B9",
                height: 2,
                borderRadius: 999,
              }}
              activeColor="#0AF3B9"
            />
          )}
        />
      </View>
    </View>
  );
};

export default Index;
