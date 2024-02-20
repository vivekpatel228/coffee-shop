import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import CoffeeCard from '../components/home/CoffeeCard';
import {useDispatch, useSelector} from 'react-redux';
import {getHotCoffee} from '../redux/slices/coffeeSlice';
import {colors} from '../styles/color';
import {getFavoriteCoffee} from '../redux/slices/favoriteSlice';

const HotCoffee = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.hotCoffee);

  const handleDetail = (id, price) => {
    const item = data?.hotCoffee.find(item => item.id === id);
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
    dispatch(getHotCoffee());
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Hot Coffee" />
      {data.isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.brown100} />
        </View>
      ) : (
        <FlatList
          data={data.hotCoffee === undefined ? [] : data.hotCoffee}
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

export default HotCoffee;

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flex: 1,
  },
});
