import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../styles/color';
import {fontFamily} from '../styles/font_family';
import {useDispatch} from 'react-redux';
import {clearHistory} from '../redux/slices/placeOrderSlice';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 20, paddingVertical: 20}}>
      <Image
        source={require('../../assets/images/profile_image.png')}
        style={{
          alignSelf: 'center',
          width: 200,
          height: 200,
          borderRadius: 100,
          marginTop: 20,
        }}
      />
      <View style={{marginTop: 60, gap: 12}}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Order')}>
          <Icon name="cafe-outline" size={26} color={colors.primary} />
          <Text style={styles.text}>Your Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={handleClearHistory}>
          <Icon name="close-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.text}>Clear history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Icon name="log-out-outline" size={24} color={colors.primary} />
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: colors.gray10,
    padding: 8,
  },
  text: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: 16,
    color: colors.primary,
    bottom: -1,
  },
});
