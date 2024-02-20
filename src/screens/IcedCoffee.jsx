import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import CoffeeCard from '../components/home/CoffeeCard';
import {useDispatch, useSelector} from 'react-redux';
import {getIcedCoffee} from '../redux/slices/coffeeSlice';
import {colors} from '../styles/color';
import {getFavoriteCoffee} from '../redux/slices/favoriteSlice';

const IcedCoffee = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.icedCoffee);

  const handleDetail = (id, price) => {
    const item = data?.icedCoffee.find(item => item.id === id);
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
        onPress={() => handleDetail(item.id, 1.12)}
        onFavoriteClick={() => handleFavorite(item, 1.12)}
      />
    );
  };

  useEffect(() => {
    dispatch(getIcedCoffee());
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Iced Coffee" />
      {data.isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.brown100} />
        </View>
      ) : (
        <FlatList
          data={data.icedCoffee === undefined ? [] : data.icedCoffee}
          style={{paddingBottom: 24, paddingHorizontal: 16}}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default IcedCoffee;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    paddingTop: 8,
    flex: 1,
  },
});
