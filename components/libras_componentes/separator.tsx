import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Separator = ({
  marginTopProp,
  marginBottomProp,
}: {
  marginTopProp?: number;
  marginBottomProp?: number;
}) => {
  return (
    <View
      style={[
        styles.separator,
        {
          marginTop: marginTopProp ? marginTopProp : 19,
          marginBottom: marginBottomProp ? marginBottomProp : 22,
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
