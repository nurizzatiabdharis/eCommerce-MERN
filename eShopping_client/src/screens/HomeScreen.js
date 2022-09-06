import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../assets/colors/colors";
const dataCat = require("../../assets/data/categories.json");
const dataProd = require("../../assets/data/products.json");
import Ionicons from "@expo/vector-icons/Ionicons";
import ItemCard from "../components/ItemCard";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [listCategories, setListCategories] = useState([]);
  const [listFeaturedProd, setListFeaturedProd] = useState([]);

  useEffect(() => {
    setListCategories(dataCat);
    setListFeaturedProd(dataProd);

    return () => {
      setListCategories([]);
      setListFeaturedProd([]);
    };
  }, []);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryWrapper, { marginLeft: index === 0 ? 20 : 0 }]}
        onPress={() => navigation.navigate("List")}
      >
        <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
          <Ionicons name="md-heart-outline" size={30} color="black" />
        </View>
        <Text style={styles.categoryLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderFeaturedItem = ({ item, index }) => {
    return <ItemCard item={item} index={index} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.sectionLabel}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
        />
      </View>

      <Text style={styles.sectionLabel}>Featured</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listFeaturedProd}
          renderItem={renderFeaturedItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  categoryWrapper: {},
  iconWrapper: {
    padding: 10,
    width: windowWidth / 5,
    height: windowWidth / 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  categoryLabel: {
    fontSize: 14,
    //backgroundColor: colors.yellow,
    textAlign: "center",
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 30,
  },
});
