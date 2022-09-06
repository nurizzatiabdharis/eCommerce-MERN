import { StyleSheet, Text, View, Fl, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
const dataProd = require("../../assets/data/products.json");

const ListProductScreen = () => {
  const [listProd, setListProd] = useState([]);

  useEffect(() => {
    setListProd(dataProd);

    return () => {
      setListProd([]);
    };
  }, []);

  const renderItem = ({ item }) => {
    return <Text>{item.name}</Text>;
  };

  const renderFeaturedItem = ({ item, index }) => {
    return <ItemCard item={item} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Test</Text>
      <FlatList
        data={listProd}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={renderFeaturedItem}
      />
    </View>
  );
};

export default ListProductScreen;

const styles = StyleSheet.create({});
