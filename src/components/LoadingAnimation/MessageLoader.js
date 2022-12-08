import React from "react";
import { StyleSheet, Dimensions} from "react-native";
import ContentLoader from "react-native-easy-content-loader";

const MessageLoader = () => {
  return (
    <ContentLoader 
    active  pRows={1} pHeight={[25]}  containerStyles={{width: 400,}}
      />
  );
};
export default MessageLoader;
export const styles = StyleSheet.create({
  container: {
  
    width:Dimensions.get('window').width-60,
    marginTop:30,
    height: 60,
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
