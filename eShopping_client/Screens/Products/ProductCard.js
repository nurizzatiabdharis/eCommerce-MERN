import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
} from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://www.pngall.com/wp-content/uploads/5/Cardboard-Box-Transparent.png",
        }}
      />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button title="Add" color={"green"} />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2 - 20,
    height: windowWidth / 1.7,
    padding: 10,
    borderRadius: 10,
    //marginTop: 55,
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
