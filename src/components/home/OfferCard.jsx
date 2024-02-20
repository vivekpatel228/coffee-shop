import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {colors} from '../../styles/color';
import {fontFamily} from '../../styles/font_family';

const width = Dimensions.get('window').width;

const OfferCard = ({title, imageUrl, flavour, price, offer, size}) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUrl}
        style={{width: 139, height: 145, borderRadius: 18}}
      />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.flavour}>With {flavour}</Text>
        </View>
        <Text style={styles.price}>$ {price}</Text>
        <View>
          <Text style={styles.offerHeaderText}>Get {offer} off</Text>
          <Text style={styles.offerText}>On {size} size</Text>
        </View>
      </View>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.brown10,
    padding: 11,
    backgroundColor: colors.brown0,
    flexDirection: 'row',
    gap: 18,
    width: width - 65,
    marginRight: 25,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: 18,
    color: colors.brown100,
  },
  flavour: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 12,
    color: colors.brown10,
  },
  price: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: 18,
    color: colors.primary,
  },
  offerHeaderText: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 12,
    color: colors.blcak,
  },
  offerText: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 10,
    color: colors.gray10,
  },
});
