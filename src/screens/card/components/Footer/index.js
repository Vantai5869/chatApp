import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {hash} from '../../../../helper';
import {ScreenNames} from '../../../../routes/screen';
import {IconChat, IconDislike, IconLike} from '../../../../theme/icons';

import {styles} from './styles';

export default function Footer({handleChoice, props, user}) {
  const authState = useSelector(state => state.auth.data);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fIcon}>
        <IconDislike onPress={() => handleChoice(-1)} />
      </TouchableOpacity>
      <IconLike onPress={() => handleChoice(1)} />

      <TouchableOpacity
        style={styles.fIcon}
        onPress={() =>
          props.navigation.navigate(ScreenNames.ChatScreen, {
            room: {
              me: authState,
              _id: hash(authState._id) + hash(user._id) + hash('63940858229cd0049bccbada'),
              userId: [user._id],
              name: user.username,
              avatar: [user?.avatar, ''],
            },
          })
        }>
        <IconChat />
      </TouchableOpacity>
    </View>
  );
}
