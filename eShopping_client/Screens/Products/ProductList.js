import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const windowWidth = Dimensions.get("window").width;

const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() =>
        props.navigation.navigate("ProductDetails", { item: item })
      }
    >
      <View style={{ width: windowWidth / 2 }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
