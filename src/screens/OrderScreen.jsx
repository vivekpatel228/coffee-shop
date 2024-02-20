import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import {fontFamily} from '../styles/font_family';
import {colors} from '../styles/color';

const OrderScreen = () => {
  const data = useSelector(state => state.order.order);

  return (
    <>
      <Header title="Your Orders" />
      {data.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: fontFamily.poppinsMedium,
              fontSize: 14,
            }}>
            Opps! No order placed till now.
          </Text>
        </View>
      ) : (
        <ScrollView>
          {data?.map((item, index) => {
            return (
              <View key={index} style={styles.items}>
                <View style={styles.line}>
                  <Text style={styles.textHeader}>Total Coffee :</Text>
                  <Text style={styles.text}>{item.orders.length}</Text>
                </View>
                <View style={styles.line}>
                  <Text style={styles.textHeader}>Total Amount :</Text>
                  <Text style={styles.text}>{item.totalAmount.toFixed(2)}</Text>
                </View>
                <View style={styles.line}>
                  <Text style={styles.textHeader}>Order Date :</Text>
                  <Text style={styles.text}>
                    {new Date(item.date).getDate()}/
                    {new Date(item.date).getDay()}/
                    {new Date(item.date).getFullYear()}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 0.4,
    gap: 6,
  },
  line: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  textHeader: {
    fontFamily: fontFamily.poppinsMedium,
    color: colors.primary,
    fontSize: 16,
  },
  text: {
    fontFamily: fontFamily.poppinsRegular,
    color: colors.gray10,
    fontSize: 16,
    textAlign: 'right',
  },
});
