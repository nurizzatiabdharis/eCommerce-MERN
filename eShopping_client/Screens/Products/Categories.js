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
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const dataCat = require("../../assets/data/categories.json");

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Categories = (props) => {
  //   const [listCategories, setListCategories] = useState([]);
  const { listCategories } = props;

  const renderCategoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.categoryWrapper, { marginLeft: index === 0 ? 20 : 0 }]}
        onPress={() => navigation.navigate("List")}
      >
        <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={35} color="gray" />
        </View>
        <Text style={styles.categoryLabel}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  //   useEffect(() => {
  //     setListCategories(dataCat);

  //     return () => {
  //       setListCategories([]);
  //     };
  //   }, []);
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={listCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryWrapper: {},
  iconWrapper: {
    padding: 10,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryLabel: {
    fontSize: 14,
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
