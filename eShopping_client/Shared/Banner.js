import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

import Swiper from "react-native-swiper";
const width = Dimensions.get("window").width;

const Banner = () => {
  return (
    <Swiper
      style={styles.wrapper}
      height={240}
      onMomentumScrollEnd={(e, state, context) =>
        console.log("index:", state.index)
      }
      dot={
        <View
          style={{
            backgroundColor: "yellow",
            width: 5,
            height: 5,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: "#000",
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      paginationStyle={{
        bottom: -23,
        left: null,
        right: 10,
      }}
      loop
    >
      <View
        style={styles.slide}
        title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}
      >
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
          }}
        />
      </View>
      <View
        style={styles.slide}
        title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}
      >
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
          }}
        />
      </View>
      <View
        style={styles.slide}
        title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}
      >
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
          }}
        />
      </View>
      <View
        style={styles.slide}
        title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}
      >
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg",
          }}
        />
      </View>
    </Swiper>
  );
};

export default Banner;

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "blue",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },

  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width,
    flex: 1,
  },
});
