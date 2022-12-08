import React from "react";
import { StyleSheet } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { DIMENSIONS } from "../../common/utils";

const SmallPanel = () => {
  return (
    <ContentLoader
      active
      tWidth={DIMENSIONS.width / 5}
      tHeight={DIMENSIONS.width / 5}
      pWidth={DIMENSIONS.width / 5}
      pHeight={10}
      pRows={1}
      paragraphStyles={styles.loaderPara}
      containerStyles={styles.loaderContainer}
      //   titleStyles={props.titleStyles}
    ></ContentLoader>
  );
};
export default SmallPanel;
export const styles = StyleSheet.create({
  loaderPara: {
    marginTop: 0,
    marginRight: 0,
  },
  loaderContainer: {
    width: DIMENSIONS.width / 5,
    borderRadius: 10,
    // marginHorizontal: 15,
    // marginVertical: 10,
    paddingLeft: 0,
  },
});
