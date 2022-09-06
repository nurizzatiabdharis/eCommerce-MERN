import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../../assets/colors/colors";

const ItemCard = (props) => {
  const { item, index } = props;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.white,
        width: 150,
        //   height: windowHeight / 4,
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        shadowColor: colors.gray,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 3.2,
        elevation: 7,
        marginVertical: 20,
        marginLeft: index === 0 ? 20 : 0,
      }}
      onPress={() => console.log(item)}
    >
      <Image
        source={{
          uri: "https://www.nocibe.fr/medias/produits/234185/234185-maybelline-new-york-fit-me-fond-de-teint-ton-sur-ton-matifiant-1000x1000.jpg",
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{item.name}</Text>
      <Text>{item.brand}</Text>
      <Text>MYR{item.price}</Text>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({});
