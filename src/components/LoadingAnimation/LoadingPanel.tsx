import React from "react";
import ContentLoader from "react-native-easy-content-loader";

interface Props {
  containerStyles?: any;
  paragraphStyles?: any;
  titleStyles?: any;
  title_witdh?: any;
  para_witdh?: any;
  title_height?: any;
  para_height?: any;
  pRows?: number;
}
const LoadingPanel: React.FC<Props> = (props) => {
  return (
    <ContentLoader
      active
      tWidth={props.title_witdh}
      tHeight={props.title_height}
      pWidth={props.para_witdh}
      pHeight={props.para_height}
      pRows={props.pRows ? props.pRows : 1}
      paragraphStyles={props.paragraphStyles}
      containerStyles={props.containerStyles}
      titleStyles={props.titleStyles}
    ></ContentLoader>
  );
};
export default LoadingPanel;
