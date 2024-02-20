import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import CoffeeCard from '../components/home/CoffeeCard';
import {getFavoriteCoffee} from '../redux/slices/favoriteSlice';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';

const Favorite = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.favorite.favorite);

  const handleDetail = (name, price) => {
    const item = data.find(item => item.title === name);
    const detail = {...item, price};
    navigation.navigate('Details', {detail});
  };

  const handleFavorite = (item, price) => {
    dispatch(getFavoriteCoffee({...item, price}));
  };

  const renderItem = ({item}) => {
    return (
      <CoffeeCard
        imgUri={item.image}
        name={item.title}
        price={1.12}
        onPress={() => handleDetail(item.title, 1.12)}
        onFavoriteClick={() => handleFavorite(item, 1.12)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Favorite Coffee" />
      {data?.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fontFamily.poppinsMedium,
              fontSize: 14,
            }}>
            Opps! You have no favorite coffee yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          style={{paddingBottom: 24, paddingHorizontal: 16}}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flex: 1,
  },
});
