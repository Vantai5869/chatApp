import React from "react";
import { StyleSheet, Dimensions} from "react-native";
import ContentLoader from "react-native-easy-content-loader";

const BigPanel = () => {
  return (
    <ContentLoader 
      active
      tHeight={360}
      tWidth={Dimensions.get('window').width-60} 
      pHeight={20}
      pRows={2} 
      containerStyles={styles.container}
      paragraphStyles={styles.para}
      />
  );
};
export default BigPanel;
export const styles = StyleSheet.create({
  container: {
  
    width:Dimensions.get('window').width-60,
    marginTop:30,
    height: Dimensions.get('window').height- 300,
    // marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor:'#ccc',
    borderRadius: 10,
    // paddingHorizontal: 13,
    paddingLeft: 0,
    marginBottom: 10,
  },
  para: {
  },
});
