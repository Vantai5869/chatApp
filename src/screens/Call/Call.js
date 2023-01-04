import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {
  OT,
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';
// import Icon, { Icons } from '../../components/Icons';
import * as credentials from './config';
import { navigationRef } from '../../routes/navigate';
import { ScreenNames } from '../../routes/screen';
import { IconCallAccept, IconCallCancel, IconCamera, IconCameraCall, IconCameraCallOff, IconClose, IconMappin, IconMic, IconMicOff } from '../../theme/icons';
import Avatar from '../card/components/Avatar';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// import Icon from 'react-native-vector-icons/MaterialIcons';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const mainSubscribersResolution = {width: 1280, height: 720};
const secondarySubscribersResolution = {width: 352, height: 288};

class Call extends Component {
  constructor(props) {
    super(props);
    const {sessionId, token}= props?.route?.params;
    this.meId= props?.route?.params?.meId
    this.avatar= props?.route?.params?.data?.avatar
    this.caller= props?.route?.params?.data?.userId
    this.apiKey = credentials.API_KEY;
    this.sessionId =sessionId;
    this.token = token;
    this.state = {
      subscriberIds: [], // Array for storing subscribers
      localPublishAudio: true, // Local Audio state
      localPublishVideo: true, // Local Video state
      joinCall: this.caller?._id==this.meId, // State variable for storing success
      streamProperties: {}, // Handle individual stream properties,
      mainSubscriberStreamId: null,
      acceptCall:false
    };

    this.sessionEventHandlers = {
      streamCreated: (event) => {
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
          },
        };
        this.setState({
          streamProperties,
          subscriberIds: [...this.state.subscriberIds, event.streamId],
        });
        console.log('streamCreated', this.state);
      },
      streamDestroyed: (event) => {
        const indexToRemove = this.state.subscriberIds.indexOf(event.streamId);
        const newSubscriberIds = this.state.subscriberIds;
        const streamProperties = {...this.state.streamProperties};
        if (indexToRemove !== -1) {
          delete streamProperties[event.streamId];
          newSubscriberIds.splice(indexToRemove, 1);
          this.setState({subscriberIds: newSubscriberIds});
        }
      },
      error: (error) => {
        console.log('session error:', error);
      },
      otrnError: (error) => {
        console.log('Session otrnError error:', error);
      },
      sessionDisconnected: () => {
        this.setState({
          streamProperties: {},
          subscriberIds: [],
        });
      },
    };

    this.publisherEventHandlers = {
      streamCreated: (event) => {
        console.log('Publisher stream created!', event);
      },
      streamDestroyed: (event) => {
        console.log('Publisher stream destroyed!', event);
      },
      audioLevel: (event) => {
        /* console.log('AudioLevel', typeof event); */
      },
    };

    this.subscriberEventHandlers = {
      connected: () => {
        console.log('[subscriberEventHandlers - connected]');
      },
      disconnected: () => {
        console.log('[subscriberEventHandlers - disconnected]');
      },
      error: (error) => {
        console.log('subscriberEventHandlers error:', error);
      },
    };

    this.publisherProperties = {
      cameraPosition: 'front',
    };
  }

  toggleAudio = () => {
    let publishAudio = this.state.localPublishAudio;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishAudio: !publishAudio,
    };
    this.setState({
      localPublishAudio: !publishAudio,
    });
  };

  toggleVideo = () => {
    let publishVideo = this.state.localPublishVideo;
    this.publisherProperties = {
      ...this.publisherProperties,
      publishVideo: !publishVideo,
    };
    this.setState({
      localPublishVideo: !publishVideo,
    });
    console.log('Video toggle', this.publisherProperties);
  };

  joinCall = () => {
    const {joinCall} = this.state;
    if (!joinCall) {
      this.setState({joinCall: true});
    }
  };

  endCall = () => {
    const {joinCall} = this.state;
    if (joinCall) {
      this.setState({joinCall: !joinCall});
    }
    navigationRef.goBack();
  };

  /**
   * // todo check if the selected is a publisher. if so, return
   * @param {*} subscribers
   */
  handleSubscriberSelection = (subscribers, streamId) => {
    console.log('handleSubscriberSelection', streamId);
    let subscriberToSwap = subscribers.indexOf(streamId);
    let currentSubscribers = subscribers;
    let temp = currentSubscribers[subscriberToSwap];
    currentSubscribers[subscriberToSwap] = currentSubscribers[0];
    currentSubscribers[0] = temp;
    this.setState((prevState) => {
      const newStreamProps = {...prevState.streamProperties};
      for (let i = 0; i < currentSubscribers.length; i += 1) {
        if (i === 0) {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[
            currentSubscribers[i]
          ].preferredResolution = mainSubscribersResolution;
        } else {
          newStreamProps[currentSubscribers[i]] = {
            ...prevState.streamProperties[currentSubscribers[i]],
          };
          newStreamProps[
            currentSubscribers[i]
          ].preferredResolution = secondarySubscribersResolution;
        }
      }
      console.log('mainSubscriberStreamId', streamId);
      console.log('streamProperties#2', newStreamProps);
      return {
        mainSubscriberStreamId: streamId,
        streamProperties: newStreamProps,
      };
    });
  };

  handleScrollEnd = (event, subscribers) => {
    console.log('handleScrollEnd', event.nativeEvent); // event.nativeEvent.contentOffset.x
    console.log('handleScrollEnd - events', event.target); // event.nativeEvent.contentOffset.x
    let firstVisibleIndex;
    if (
      event &&
      event.nativeEvent &&
      !isNaN(event.nativeEvent.contentOffset.x)
    ) {
      firstVisibleIndex = parseInt(
        event.nativeEvent.contentOffset.x / (dimensions.width / 2),
        10,
      );
      console.log('firstVisibleIndex', firstVisibleIndex);
    }
    this.setState((prevState) => {
      const newStreamProps = {...prevState.streamProperties};
      if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
        for (let i = 0; i < subscribers.length; i += 1) {
          if (i === firstVisibleIndex || i === firstVisibleIndex + 1) {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = true;
          } else {
            newStreamProps[subscribers[i]] = {
              ...prevState.streamProperties[subscribers[i]],
            };
            newStreamProps[subscribers[i]].subscribeToVideo = false;
          }
        }
      }
      return {streamProperties: newStreamProps};
    });
  };

  renderSubscribers = (subscribers) => {
    console.log('renderSubscribers', subscribers);
    console.log('this.state.subscriberIds', this.state.subscriberIds);
    console.log(
      'this.state.mainSubscriberStreamId',
      this.state.mainSubscriberStreamId,
    );
    if (this.state.mainSubscriberStreamId) {
      subscribers = subscribers.filter(
        (sub) => sub !== this.state.mainSubscriberStreamId,
      );
      subscribers.unshift(this.state.mainSubscriberStreamId);
    }
    console.log('renderSubscribers - sorted', subscribers);


    
    return subscribers.length > 1 ? (
      <>
        <View style={styles.mainSubscriberStyle}>
          <TouchableOpacity
            onPress={() =>
              this.handleSubscriberSelection(subscribers, subscribers[0])
            }
            key={subscribers[0]}>
            <OTSubscriberView
              streamId={subscribers[0]}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.secondarySubscribers}>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={dimensions.width / 2}
            snapToAlignment={'center'}
            onScrollEndDrag={(e) =>
              this.handleScrollEnd(e, subscribers.slice(1))
            }
            style={{
              width: dimensions.width,
              height: dimensions.height / 4,
            }}>
            {subscribers.slice(1).map((streamId) => (
              <TouchableOpacity
                onPress={() =>
                  this.handleSubscriberSelection(subscribers, streamId)
                }
                style={{
                  width: dimensions.width / 2,
                  height: dimensions.height / 4,
                }}
                key={streamId}>
                <OTSubscriberView
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  key={streamId}
                  streamId={streamId}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    ) : subscribers.length > 0 ? (
      <TouchableOpacity style={styles.fullView}>
        <OTSubscriberView
          streamId={subscribers[0]}
          key={subscribers[0]}
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    ) : (
      <Text style={{textAlign:'center', marginTop:50}}>Chờ người khác tham gia</Text>
    );
  };

  videoView = () => {
    return (
      <>
        <View style={styles.fullView}>
       
          <OTSession 
              apiKey={this.apiKey}
              sessionId={this.sessionId}
              token={this.token}
              eventHandlers={this.sessionEventHandlers}
              // options={{enableStereoOutput: true}}
          
          >
            <OTPublisher
              properties={this.publisherProperties}
              eventHandlers={this.publisherEventHandlers}
              style={{ height:  dimensions.height/2-50, width: dimensions.width, }}
            />
              <OTSubscriber
              style={{height: dimensions.height, width: dimensions.width}}
              eventHandlers={this.subscriberEventHandlers}
              streamProperties={this.state.streamProperties}>
              {this.renderSubscribers}
            </OTSubscriber>
          </OTSession>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.iconStyle}
            name={this.state.localPublishAudio ? 'mic' : 'mic-off'}
            onPress={this.toggleAudio}
          >
            {
              this.state.localPublishAudio?
              <IconMic/>:
              <IconMicOff/>
            }
           
            {/* <Icon type={Icons.Feather} name={this.state.localPublishAudio ? 'mic' : 'mic-off'} color='blue' style={{fontSize:25, opacity:0.9}} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.iconStyle, backgroundColor:'red'}}
            name="call-end"
            
            onPress={this.endCall}
          >
            <IconCallCancel/>
            {/* <Icon type={Icons.Feather} name='phone-off' color='red' style={{fontSize:25, opacity:0.9}} /> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconStyle}
            backgroundColor="#131415"
            name={this.state.localPublishVideo ? 'videocam' : 'videocam-off'}
            onPress={this.toggleVideo}
          >
            {
              this.state.localPublishVideo ?
              <IconCameraCall/>:
              <IconCameraCallOff/>
            }
            {/* <Icon type={Icons.Feather} name={this.state.localPublishVideo ? 'video' : 'video-off'}  color='green' style={{fontSize:25, opacity:0.9}} /> */}
          </TouchableOpacity>
        </View>
      </>
    );
  };

  joinVideoCall = () => {
    return (
      <SafeAreaView style={styles.fullView}>
        <View style={styles.containerIncomming}>
          <View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Avatar
                size={60}
                url={this.avatar}
                onPress={() => {}}
              />
            </View>
             
            <Text style={{marginTop:30, fontSize:22}}><Text style={{color:'#285430'}}>{this.caller?.username}</Text>  đang bắt đầu cuộc gọi...</Text>
          </View>
         
        </View>
        <View style={styles.incommingScreen}>
           <TouchableOpacity
            onPress={this.endCall}
            style={{width:70, height:70, backgroundColor:'#CF0A0A',
            borderWidth:1, borderRadius:50, display:'flex',flexDirection:'row',
            justifyContent:'center', padding:20, borderColor:'#CF0A0A'}}
          >
              <IconCallCancel/>
            {/* Từ Chối */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.joinCall}
            style={{width:70, height:70, backgroundColor:'#2B7A0B',
            borderWidth:1, borderRadius:50, display:'flex',flexDirection:'row',
            justifyContent:'center', padding:20, borderColor:'#2B7A0B'}}
           >
            <IconCallAccept/>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    );
  };
  
  render() {
  // console.log('======================');
  // console.log('======================');
  // console.log('======================');
  // console.log({meId:this.meId});
  // console.log({callerId:this.caller});
  //   if(this.caller?._id!==this.meId){
     
  //     return <>
  //       <View>
  //         <Text>Đang gọi</Text>
  //       </View>
  //     </>
  //   }
  console.log({caller: this.caller});
    return this.state.joinCall ? this.videoView() : this.joinVideoCall();
  }
}

// todo remember to twick the styles to not copy agora

const styles = StyleSheet.create({
  buttonView: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#AD90D8',
    width: '100%',
    position: 'absolute',
    left:0,
    bottom:20,
    alignContent:'center',
    justifyContent:'space-around'


  },
  iconStyle: {
    width:60,
    height:60,
    padding:20,
    paddingHorizontal:20,
    margin:10,
    borderRadius:50,
    backgroundColor:"#ccc"
  },
  fullView: {
    flex: 1,
    backgroundColor:'#AD90D8'
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  publisherStyle: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 5,
  },
  mainSubscriberStyle: {
    height: (dimensions.height * 3) / 4 - 50,
  },
  secondarySubscribers: {
    height: dimensions.height / 4,
  },
  incommingScreen:{
    display:'flex',
    flexDirection:'row',
    marginTop: 250,
    justifyContent:'space-between',
    paddingHorizontal:80
  },
  containerIncomming:{
    marginTop:100,
    display:'flex',
    justifyContent:'center',
    flexDirection:'row'
  },
});

export default Call;
