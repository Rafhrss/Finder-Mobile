import { formatDateString } from "@/src/utils/date";
import { getStatusConfig } from "@/src/utils/status";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "@libs/theme";
import type { ReportItem } from "@libs/types";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip } from "react-native-paper";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_CARD_WIDTH = SCREEN_WIDTH - 32;

interface CarouselProps {
  items: ReportItem[];
  openDetail: (item: ReportItem) => void;
}

const Carousel = ({ items, openDetail }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef<FlatList<ReportItem>>(null);

  // Auto-slide effect
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % items.length;
        flatListRef.current?.scrollToOffset({
          offset: nextSlide * CAROUSEL_CARD_WIDTH,
          animated: true,
        });
        return nextSlide;
      });
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [items.length, activeSlide]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CAROUSEL_CARD_WIDTH);
    if (index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * CAROUSEL_CARD_WIDTH,
      animated: true,
    });
    setActiveSlide(index);
  };

  const renderCarouselItem = ({ item }: { item: ReportItem }) => {
    const statusConfig = getStatusConfig(item.status);

    const userName = item.user?.name || "ANONYMOUS";
    const initial = userName.charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openDetail(item)}
        style={{ width: CAROUSEL_CARD_WIDTH, height: 200 }}
        className="px-1"
      >
        <View
          className="h-full w-full overflow-hidden rounded-[20px]"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
        >
          {/* Background Image */}
          {item.image ? (
            <Image
              source={item.image}
              style={StyleSheet.absoluteFillObject}
              contentFit="cover"
            />
          ) : (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { alignItems: "center", justifyContent: "center" },
              ]}
            >
              <MaterialCommunityIcons
                name="image-outline"
                size={48}
                color={theme.colors.outline}
              />
            </View>
          )}

          {/* Dark Overlay for better text readability */}
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(15, 23, 42, 0.75)" },
            ]}
          />

          {/* Top Left Badge */}
          <View className="absolute left-4 top-4">
            <Chip
              compact
              mode="outlined"
              icon={statusConfig.icon}
              theme={{
                colors: {
                  primary: statusConfig.color,
                  surface: `${statusConfig.color}30`,
                  onSurfaceVariant: statusConfig.color,
                  outline: statusConfig.color,
                },
              }}
            >
              {statusConfig.label}
            </Chip>
          </View>

          {/* Left Arrow */}
          <TouchableOpacity
            className="absolute left-3 top-1/2 -translate-y-5 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            onPress={() =>
              scrollToIndex(
                activeSlide > 0 ? activeSlide - 1 : items.length - 1,
              )
            }
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Right Arrow */}
          <TouchableOpacity
            className="absolute right-3 top-1/2 -translate-y-5 h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            onPress={() =>
              scrollToIndex(
                activeSlide < items.length - 1 ? activeSlide + 1 : 0,
              )
            }
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Bottom Content */}
          <View className="absolute bottom-5 left-16 right-16 flex-row items-center">
            <View
              className="h-14 w-14 items-center justify-center rounded-full overflow-hidden"
              style={{
                backgroundColor: item.user?.profile_picture
                  ? "#0A1118"
                  : "#F97316",
              }}
            >
              {item.user?.profile_picture ? (
                <Image
                  source={{ uri: item.user.profile_picture }}
                  style={{ width: 56, height: 56 }}
                  contentFit="cover"
                />
              ) : (
                <Text className="text-2xl font-semibold text-white">
                  {initial}
                </Text>
              )}
            </View>

            {/* Info */}
            <View className="ml-3 flex-1">
              <Text
                className="text-[10px] font-bold text-gray-300 uppercase"
                numberOfLines={1}
              >
                {userName}
              </Text>
              <Text
                className="mt-0.5 text-xl font-bold text-white"
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <View className="mt-1 flex-row items-center">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={12}
                    color="#9CA3AF"
                  />
                  <Text
                    className="ml-1 text-xs text-gray-400"
                    numberOfLines={1}
                    style={{ maxWidth: 100 }}
                  >
                    {item.location}
                  </Text>
                </View>
                <View className="ml-3 flex-row items-center">
                  <MaterialCommunityIcons
                    name="calendar-outline"
                    size={12}
                    color="#9CA3AF"
                  />
                  <Text className="ml-1 text-xs text-gray-400">
                    {formatDateString(item.created_at)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
        data={items}
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
    </View>
  );
};

export default Carousel;
