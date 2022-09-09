import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  VStack,
  Divider,
  Box,
  Heading,
  Input,
  Icon,
  NativeBaseProvider,
} from "native-base";
import ProductList from "./ProductList";

import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import Categories from "./Categories";
import colors from "../../assets/colors/colors";
const categoriesData = require("../../assets/data/categories.json");

const data = require("../../assets/data/products.json");
const windowWidth = Dimensions.get("window").width;

const SearchBar = (props) => {
  const { openList, onChangeText, focus, onBlur } = props;
  return (
    <VStack
      w="100%"
      space={5}
      alignSelf="center"
      maxWidth={windowWidth - 20}
      marginTop={2}
      marginBottom={2}
    >
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        height={30}
        borderRadius="10"
        py="1"
        px="2"
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          />
        }
        onFocus={openList}
        onChangeText={onChangeText}
        InputRightElement={
          focus == true && (
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<Ionicons name="ios-close-sharp" color="black" />}
              onPress={onBlur}
            />
          )
        }
      />
    </VStack>
  );
};

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(categoriesData);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <NativeBaseProvider>
      <SearchBar
        openList={openList}
        onChangeText={(text) => searchProduct(text)}
        focus={focus}
        onBlur={onBlur}
      />
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={{ backgroundColor: colors.softWhite, paddingTop: 20 }}>
          <Categories listCategories={categories} />
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Feautured Products</Text>
            <View style={styles.moreWrapper}>
              <Text style={styles.moreLabel}>More</Text>
              <Ionicons name="ios-search" color={colors.primaryYellow} />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <ProductList
                  key={item.id}
                  item={item}
                  navigation={props.navigation}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  sectionWrapper: { flexDirection: "row", marginHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    flex: 1,
    color: colors.primaryBlack,
    fontSize: 18,
    fontWeight: "bold",
  },
  moreWrapper: { flexDirection: "row" },
  moreLabel: {},
});
