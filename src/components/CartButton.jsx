import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';

const CartButton = ({quantity, handleIncrement, handleDecrement}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={[styles.text, {color: colors.white}]}>-</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={[styles.text, {color: colors.white}]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: colors.blcak,
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 16,
    bottom: -2,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
