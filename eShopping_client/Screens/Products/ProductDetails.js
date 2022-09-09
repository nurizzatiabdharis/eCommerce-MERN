import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  return (
    <View>
      <Text>ProductDetails</Text>
      <Text>{JSON.stringify(item)}</Text>
      <Image
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
        source={{
          uri: item.image
            ? item.image
            : "https://www.pngall.com/wp-content/uploads/5/Cardboard-Box-Transparent.png",
        }}
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
