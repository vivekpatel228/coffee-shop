import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header';
import {colors} from '../styles/color';
import OfferCard from '../components/home/OfferCard';
import {fontFamily} from '../styles/font_family';
import {offerData} from '../constant/offerData';
import CoffeeCard from '../components/home/CoffeeCard';
import {useDispatch, useSelector} from 'react-redux';
import {getHotCoffee, getIcedCoffee} from '../redux/slices/coffeeSlice';
import {getFavoriteCoffee} from '../redux/slices/favoriteSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const hotCoffee = useSelector(state => state.hotCoffee);
  const icedCoffee = useSelector(state => state.icedCoffee);

  const handleDetail = (item, price) => {
    const detail = {...item, price};
    navigation.navigate('Details', {detail});
  };

  const handleFavorite = (item, price) => {
    dispatch(getFavoriteCoffee({...item, price}));
  };

  useEffect(() => {
    dispatch(getHotCoffee());
    dispatch(getIcedCoffee());
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Header title="Coffee Shop" />
        <View style={styles.searchbarContainer}>
          <Image
            source={require('../../assets/images/search.png')}
            style={{width: 16, height: 16}}
          />
          <TextInput
            inputMode="search"
            placeholder="Find your coffee..."
            placeholderTextColor={colors.gray10}
            style={styles.searchbar}
          />
        </View>
        <View style={styles.offerContainer}>
          <View style={styles.offerTitleContainer}>
            <Text style={styles.offferTitle}>Exclusive Offer</Text>
            <TouchableOpacity>
              <Text style={styles.offferTitleButton}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            style={{paddingLeft: 15}}
            data={offerData}
            renderItem={renderOfferItem}
            keyExtractor={(_, index) => index}
          />
        </View>
        {!hotCoffee.isLoading && !icedCoffee.isLoading ? (
          <>
            <View style={styles.offerContainer}>
              <View style={styles.offerTitleContainer}>
                <Text style={styles.offferTitle}>Hot Coffee</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Hot Coffee');
                  }}>
                  <Text style={styles.offferTitleButton}>See More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.coffeeContainer}>
                <CoffeeCard
                  name={hotCoffee.hotCoffee[0]?.title}
                  price={1.12}
                  imgUri={hotCoffee.hotCoffee[0]?.image}
                  onPress={() => handleDetail(hotCoffee.hotCoffee[0], 1.12)}
                  onFavoriteClick={() =>
                    handleFavorite(hotCoffee.hotCoffee[0], 1.12)
                  }
                />
                <CoffeeCard
                  name={hotCoffee.hotCoffee[1]?.title}
                  price={3.25}
                  imgUri={hotCoffee.hotCoffee[1]?.image}
                  onPress={() => handleDetail(hotCoffee.hotCoffee[1], 3.25)}
                  onFavoriteClick={() =>
                    handleFavorite(hotCoffee.hotCoffee[1], 3.25)
                  }
                />
              </View>
            </View>
            <View style={styles.offerContainer}>
              <View style={styles.offerTitleContainer}>
                <Text style={styles.offferTitle}>Iced Coffee</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Iced Coffee');
                  }}>
                  <Text style={styles.offferTitleButton}>See More</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.coffeeContainer}>
                <CoffeeCard
                  name={icedCoffee.icedCoffee[0]?.title}
                  price={2.19}
                  imgUri={icedCoffee.icedCoffee[0]?.image}
                  onPress={() => handleDetail(icedCoffee.icedCoffee[0], 2.19)}
                  onFavoriteClick={() =>
                    handleFavorite(icedCoffee.icedCoffee[0], 2.19)
                  }
                />
                <CoffeeCard
                  name={icedCoffee.icedCoffee[1]?.title}
                  price={2.82}
                  imgUri={icedCoffee.icedCoffee[1]?.image}
                  onPress={() => handleDetail(icedCoffee.icedCoffee[1], 2.82)}
                  onFavoriteClick={() =>
                    handleFavorite(icedCoffee.icedCoffee[1], 2.82)
                  }
                />
              </View>
            </View>
          </>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.brown100} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Home;

const renderOfferItem = ({item}) => {
  return (
    <OfferCard
      imageUrl={item.imageUrl}
      title={item.title}
      flavour={item.flavour}
      price={item.price}
      offer={item.offer}
      size={item.size}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'column',
    gap: 16,
  },
  searchbarContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchbar: {
    flex: 1,
    fontFamily: fontFamily.poppinsRegular,
    bottom: -2,
  },
  offerContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  offerTitleContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offferTitle: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: 14,
    color: colors.blcak,
  },
  offferTitleButton: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 12,
    color: colors.gray10,
  },
  coffeeContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
});
