import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import { DUMMY_ITEMS, type ReportItem } from "@libs/dummyData";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReportCard from "@components/common/ReportCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_CARD_WIDTH = SCREEN_WIDTH - 32;

interface HomeViewProps {
  openDetail: (item: ReportItem) => void;
}

const HomeView = ({ openDetail }: HomeViewProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList<ReportItem>>(null);

  // Latest 3 items for carousel (most recent)
  const carouselItems = DUMMY_ITEMS.slice(0, 3);
  // Latest reports list
  const latestReports = DUMMY_ITEMS.slice(0, 3);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CAROUSEL_CARD_WIDTH);
    setActiveSlide(index);
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * CAROUSEL_CARD_WIDTH,
      animated: true,
    });
    setActiveSlide(index);
  };

  const navigateToDetail = (item: ReportItem) => {
    openDetail(item);
  };

  const renderCarouselItem = ({
    item,
  }: {
    item: ReportItem;
  }) => {
    const isLost = item.status === "lost";
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateToDetail(item)}
        style={{ width: CAROUSEL_CARD_WIDTH }}
        className="px-1"
      >
        <View
          className="overflow-hidden rounded-2xl"
          style={{
            backgroundColor: theme.colors.surfaceVariant,
            borderWidth: 1,
            borderColor: theme.colors.outline,
          }}
        >
          {/* Date Badge */}
          <View
            className="absolute left-3 top-3 z-10 rounded-full px-3 py-1.5"
            style={{
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderColor: theme.colors.outline,
            }}
          >
            <Text className="text-xs font-medium text-white">
              {item.created_at.length > 6
                ? item.created_at
                : `19 april 2026`}
            </Text>
          </View>

          {/* Image Placeholder */}
          <View className="h-36 w-full items-center justify-center">
            <MaterialCommunityIcons
              name="image-outline"
              size={48}
              color={theme.colors.outline}
            />
          </View>

          {/* Arrow Navigation Hints */}
          <TouchableOpacity
            className="absolute left-1 top-1/2 -translate-y-4"
            onPress={() =>
              scrollToIndex(
                activeSlide > 0 ? activeSlide - 1 : carouselItems.length - 1,
              )
            }
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="absolute right-1 top-1/2 -translate-y-4"
            onPress={() =>
              scrollToIndex(
                activeSlide < carouselItems.length - 1 ? activeSlide + 1 : 0,
              )
            }
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>

          {/* Bottom Info */}
          <View className="px-4 pb-4 pt-2">
            <View className="flex-row items-center">
              <View
                className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: theme.colors.background }}
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs font-bold uppercase"
                  style={{
                    color: isLost ? "#EF4444" : theme.colors.primary,
                  }}
                >
                  {isLost ? "HILANG" : "DITEMUKAN"}
                </Text>
                <Text
                  className="text-base font-bold text-white"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Carousel Section */}
      <View className="mt-4">
        <FlatList
          ref={flatListRef}
          data={carouselItems}
          keyExtractor={(item) => `carousel-${item.id}`}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={CAROUSEL_CARD_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />

        {/* Dots Indicator */}
        <View className="mt-3 flex-row items-center justify-center">
          {carouselItems.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              className="mx-1"
            >
              <View
                className="rounded-full"
                style={{
                  width: activeSlide === index ? 10 : 8,
                  height: activeSlide === index ? 10 : 8,
                  backgroundColor:
                    activeSlide === index
                      ? theme.colors.primary
                      : theme.colors.outline,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Laporan Terbaru Section */}
      <View className="mt-8 px-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-white">Laporan Terbaru</Text>
          <TouchableOpacity
            className="rounded-full border px-4 py-2"
            style={{ borderColor: theme.colors.primary }}
          >
            <Text
              className="text-sm font-semibold"
              style={{ color: theme.colors.primary }}
            >
              Selengkapnya
            </Text>
          </TouchableOpacity>
        </View>

        {latestReports.map((item) => (
          <ReportCard
            key={item.id}
            item={item}
            onPress={() => navigateToDetail(item)}
          />
        ))}
      </View>

      {/* Bottom Spacer */}
      <View className="h-4" />
    </ScrollView>
  );
};

export default HomeView;
