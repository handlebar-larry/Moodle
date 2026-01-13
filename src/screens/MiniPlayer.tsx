import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayerStore } from "../stores/playerStore";
import { Ionicons } from "@expo/vector-icons";

const MiniPlayer = () => {
  const navigation = useNavigation<any>();

  const currentSong = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const togglePlayPause = usePlayerStore((s) => s.togglePlayPause);

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Player")}
      style={styles.container}
    >
      <Image
        source={{ uri: currentSong.image?.[1]?.link }}
        style={styles.artwork}
      />

      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {currentSong.name}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {currentSong.primaryArtists}
        </Text>
      </View>

      <TouchableOpacity
        onPress={togglePlayPause}
        hitSlop={10}
        style={styles.control}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={26}
          color="#000"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60, // sits above tab bar
    left: 10,
    right: 10,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  artist: {
    fontSize: 13,
    color: "#6e6e73",
    marginTop: 2,
  },
  control: {
    padding: 8,
  },
});
