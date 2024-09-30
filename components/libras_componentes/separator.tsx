import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

const isTablet = width >= 768 && height >= 1024;

const Separator = ({
  marginTopProp,
  marginBottomProp,
  widthProps,
}: {
  marginTopProp?: number;
  marginBottomProp?: number;
  widthProps?: number;
}) => {
  return (
    <View
      style={[
        styles.separator,
        {
          marginTop: marginTopProp ? marginTopProp : 19,
          marginBottom: marginBottomProp ? marginBottomProp : 22,
          width: widthProps ? widthProps : width * 0.9,
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  separator: {
    width: '90%',
    marginTop: 19,
    marginBottom: 22,
    alignSelf: 'center',
    borderTopWidth: 2,
    borderTopColor: '#cac9c99c',
  },
});

export default Separator;
