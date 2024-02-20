import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import CartButton from '../components/CartButton';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';
import {clearCart, decreaseQnt, increaseQnt} from '../redux/slices/cartSlice';
import {getPlaceOrder} from '../redux/slices/placeOrderSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.cart.cart);
  const totalAmount = data.reduce((accumulator, currentValue) => {
    const amount = currentValue.price * currentValue.qnt;
    const sum = accumulator + amount;
    return sum;
  }, 0);

  const handleIncrement = title => {
    dispatch(increaseQnt(title));
  };

  const handleDecrement = title => {
    dispatch(decreaseQnt(title));
  };

  const handlePlaceOrder = () => {
    dispatch(getPlaceOrder({data, totalAmount}));
    dispatch(clearCart());
  };

  return (
    <>
      <Header title="Cart" />
      {data?.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fontFamily.poppinsMedium,
              fontSize: 14,
            }}>
            Opps! Your cart is empty.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <CartCard
                  key={index}
                  imgUri={item?.image}
                  name={item.title}
                  quantity={item.qnt}
                  price={item.price}
                  handleIncrement={() => handleIncrement(item.title)}
                  handleDecrement={() => handleDecrement(item.title)}
                />
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderTopColor: colors.gray0,
              borderTopWidth: 1,
            }}>
            <Text
              style={{
                fontFamily: fontFamily.poppinsBold,
                color: colors.gray10,
                bottom: -1,
                fontSize: 16,
              }}>
              Total: $ {totalAmount.toFixed(2)}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
              }}
              onPress={handlePlaceOrder}>
              <Text
                style={{
                  fontFamily: fontFamily.poppinsRegular,
                  color: colors.white,
                  fontSize: 16,
                }}>
                Place order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default Cart;

const CartCard = ({
  imgUri,
  name,
  quantity,
  price,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 8, gap: 12}}>
      <View style={{flexDirection: 'row', gap: 16}}>
        <Image
          source={{uri: imgUri}}
          style={{width: 100, height: 100, borderRadius: 18}}
        />
        <View style={{gap: 12}}>
          <Text
            style={{
              fontFamily: fontFamily.poppinsMedium,
              fontSize: 20,
              color: colors.brown100,
            }}>
            {name}
          </Text>
          <CartButton
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: fontFamily.poppinsMedium,
            fontSize: 16,
            color: colors.primary,
          }}>
          Total Amount:
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.poppinsSemiBold,
            fontSize: 16,
            color: colors.gray10,
          }}>
          $ {(quantity * price).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
