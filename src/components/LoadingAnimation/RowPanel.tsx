import React from "react";
import ContentLoader from "react-native-easy-content-loader";
import { DIMENSIONS } from "../../common/utils";

interface Props {
  pRows?: number;
  title?: boolean;
  aSize?:number ,
  pHeight?: number[],
  aShape?: 'square'|'circle',
  pWidth?: number[],
}

const RowPanel: React.FC<Props> = ({aShape="square",aSize=76, pRows=1, title=true, pHeight=[0,10,10], pWidth=[DIMENSIONS.width/2]}) => {
  return ( 
    <ContentLoader 
      avatar aShape={aShape} aSize={aSize}
      containerStyles={{paddingLeft: 0}}
      tWidth='100%'
      tHeight={title? 36:0} pRows={pRows} pHeight={pHeight} pWidth={pWidth} />
  );
};
export default RowPanel;