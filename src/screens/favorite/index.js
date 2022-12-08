import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import ListUser from './listUser';
import {IconSortTwo} from '../../theme/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import axiosConfig from '../../axiosConfig';

const Matches = props => {
  const me = useSelector(state => state.auth.data);
  const [userList, setUserList] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const getUserList = async () => {
      const res = await axiosConfig.get(
        `/users/0/20?search=${searchKey}&except=${me?._id}`,
      );
      setUserList(res.data);
    };
    if (me?._id) getUserList();
  }, [me, searchKey]);

  console.log('userList');
  console.log(userList);
  const handleSearch = text => {
    setSearchKey(text);
    console.log('text');
    console.log(text);
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.container.header}>
          <Text style={styles.container.header.title}>Matches</Text>
          <TouchableOpacity style={styles.container.header.button}>
            <IconSortTwo stroke="#E94057" />
          </TouchableOpacity>
        </View>
        <Text style={styles.container.description}>
          This is a list of people who have liked you and your matches.
        </Text>
        <ListUser
          time="today"
          listUser={userList}
          props={props}
          onSearch={handleSearch}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      title: {
        fontSize: 34,
        lineHeight: 51,
        color: '#000000',
        fontFamily: 'Sk-Modernist-Bold',
      },
      button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E6EA',
        boxSizing: 'border-box',
        borderRadius: 15,
        paddingHorizontal: 14,
        paddingVertical: 14,
      },
    },
    description: {
      marginTop: 10,
      fontFamily: 'Sk-Modernist-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
});

export default Matches;
