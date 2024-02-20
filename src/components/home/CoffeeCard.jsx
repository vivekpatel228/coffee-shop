import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import {fontFamily} from '../../styles/font_family';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;

const CoffeeCard = ({onPress, name, imgUri, price, onFavoriteClick}) => {
  const favoriteCoffee = useSelector(state => state.favorite.favorite);
  const isFav = favoriteCoffee?.find(item => item.title === name);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{uri: imgUri}}
        style={{
          width: '100%',
          height: 140,
          borderRadius: 18,
        }}
      />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
        <TouchableOpacity onPress={onFavoriteClick}>
          <Icon
            size={20}
            color={colors.primary}
            name={isFav ? 'heart' : 'heart-outline'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray0,
    padding: 10,
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 8,
    width: '50%',
    margin: 4,
  },
  title: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: 14,
    color: colors.brown100,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontFamily: fontFamily.poppinsMedium,
    color: colors.gray10,
  },
});
