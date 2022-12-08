import React from "react";
import { StyleSheet } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { DIMENSIONS } from "../../common/utils";
import { colors } from "../../constants/colors";

const BankCardPanel = () => {
  return (
    <ContentLoader
      active
      pRows={0}
      //   paragraphStyles={styles.loaderPara}
      containerStyles={styles.sellingProductLoader}
      titleStyles={styles.sellingProductImageLoader}
    ></ContentLoader>
  );
};
export default BankCardPanel;
export const styles = StyleSheet.create({
  sellingProductLoader: {
    height: 178,
    width: DIMENSIONS.width - 48,
    paddingLeft: 0,
  },
  sellingProductImageLoader: {
    height: 178,
    width: DIMENSIONS.width - 48,
    borderRadius: 10,
  },
});
