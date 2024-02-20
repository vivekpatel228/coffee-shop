import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';
import {useDispatch, useSelector} from 'react-redux';
import {getFavoriteCoffee} from '../redux/slices/favoriteSlice';
import {addToCart, decreaseQnt, increaseQnt} from '../redux/slices/cartSlice';
import CartButton from '../components/CartButton';

const Details = ({navigation, route}) => {
  const {detail} = route.params;
  const dispatch = useDispatch();
  const favoriteCoffee = useSelector(state => state.favorite.favorite);
  const cart = useSelector(state => state.cart.cart);
  const isFav = favoriteCoffee.find(item => item.title === detail?.title);
  const inCart = cart.find(item => item.title === detail?.title);

  const handleFavorite = item => {
    dispatch(getFavoriteCoffee(item));
  };

  const handleCart = () => {
    dispatch(addToCart(detail));
  };

  const handleIncrement = () => {
    dispatch(increaseQnt(detail.title));
  };

  const handleDecrement = () => {
    dispatch(decreaseQnt(detail.title));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="chevron-back-outline" size={24} color={colors.white} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => handleFavorite(detail)}>
        <Icon
          name={isFav ? 'heart' : 'heart-outline'}
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <Image
          source={{uri: detail?.image}}
          style={{height: 378, borderRadius: 18}}
        />
        <View style={styles.titleContainer}>
          <View style={{width: '50%'}}>
            <Text style={styles.title}>{detail?.title}</Text>
            <Text style={styles.ingredients}>
              {detail?.ingredients?.join(', ')}
            </Text>
          </View>
          <Text style={styles.title}>$ {detail.price}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{detail.description}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {inCart ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontFamily.poppinsRegular,
                color: colors.gray10,
                bottom: -1,
                fontSize: 20,
              }}>
              Total: $ {(inCart.qnt * detail.price).toFixed(2)}
            </Text>
            <CartButton
              quantity={inCart.qnt}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleCart}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fontFamily.poppinsMedium,
                bottom: -1,
              }}>
              Add to cart
            </Text>
            <Icon name="cart-outline" size={18} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    position: 'absolute',
    padding: 12,
    left: 30,
    top: 30,
    zIndex: 1,
  },
  likeButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    position: 'absolute',
    padding: 12,
    right: 30,
    top: 30,
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray0,
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: 24,
    color: colors.brown100,
  },
  ingredients: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 16,
    color: colors.brown10,
    flexWrap: 'wrap',
  },
  descriptionContainer: {
    marginTop: 12,
  },
  description: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 12,
  },
});
