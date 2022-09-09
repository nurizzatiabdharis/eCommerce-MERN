import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Image,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { item: item })}
      >
        <Box
          borderBottomWidth="1"
          borderColor={"gainsboro"}
          pl={["0", "4"]}
          pr={["0", "5"]}
          py="2"
        >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: item.image
                  ? item.image
                  : "https://www.pngall.com/wp-content/uploads/5/Cardboard-Box-Transparent.png",
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {item.name}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.description}this is description
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Products not available</Text>
      )}
    </View>
  );
};

export default SearchedProduct;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
