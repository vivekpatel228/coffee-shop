import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerView}>
      <View style={{alignItems: 'center', gap: 32, flexDirection: 'row'}}>
        {title !== 'Coffee Shop' &&
        title !== 'Favorite Coffee' &&
        title !== 'Cart' ? (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-back-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {title === 'Coffee Shop' ? (
        <Image
          source={require('../../assets/images/profile_image.png')}
          style={{
            width: 35,
            height: 35,
            borderRadius: 12,
            alignSelf: 'flex-end',
          }}
        />
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    color: colors.primary,
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 18,
    bottom: -1,
  },
  headerView: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
