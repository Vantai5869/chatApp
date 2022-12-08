import React from "react";
import { StyleSheet } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { DIMENSIONS } from "../../common/utils";
import { colors } from "../../constants/colors";

const SupplierPanel = () => {
  return (
    <ContentLoader
      active
      pRows={1}
      //   paragraphStyles={styles.loaderPara}
      containerStyles={styles.supplierLoader}
      titleStyles={styles.supplierimageLoader}
    ></ContentLoader>
  );
};
export default SupplierPanel;
export const styles = StyleSheet.create({
  supplierLoader: {
    justifyContent: "flex-start",
    alignItems: "center",
    // marginHorizontal: 3,
    width: (DIMENSIONS.width - 56) / 2,
    // marginBottom: 17,
    paddingLeft: 0,
  },
  supplierimageLoader: {
    backgroundColor: colors.c_light_gray,
    width: (DIMENSIONS.width - 56) / 2,
    height: (DIMENSIONS.width - 56) / 2 - 26,
    borderRadius: 10,
  },
});
