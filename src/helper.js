import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userInfo', jsonValue);
  } catch (e) {
    console.log('save token err');
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('get token err');
  }
};

export const removeData = async () => {
  try {
    const jsonValue = await AsyncStorage.removeItem('userInfo');
    return jsonValue;
  } catch (e) {
    console.log('remove token err');
  }
};

export const getTime = timeInput => {
  let time = new Date(timeInput);
  return (time = `${time.getHours()}:${time.getMinutes()} ${time.getDate()}/${
    time.getMonth() + 1
  }`);
};

export const RemoveDuplicates = Arr => {
  const arr = [...Arr];
  const unique = arr.filter(
    (v, i, a) => a.findIndex(t => t._id === v._id) === i,
  );
  return unique;
};

export const hash = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const hashArr = function (arrIds) {
  let sum = 0;
  for (var i = 0; i < arrIds.length; i++) {
    sum += hash(arrIds[i]);
  }
  return sum;
};

// DEVICE-TOKEN
export const storeDeviceToken = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('DEVICE-TOKEN', jsonValue);
  } catch (e) {
    console.log('save DEVICE-TOKEN err');
  }
};

export const getDeviceToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('DEVICE-TOKEN');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('get DEVICE-TOKEN err');
  }
};

// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
export const isValidDate = dateString => {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

// Phone vali
export const isValidPhone = phone => {
  if (!/^(84|0[3|5|7|8|9])+([0-9]{8})$/.test(phone)) return false;
  return true;
};

// fomat date to dd/mm/yyyy
export const fomatDate = date => {
  if (typeof date === 'string') {
    return date;
  }
  const yyyy = new Date(date).getFullYear();
  let mm = new Date(date).getMonth();
  let dd = new Date(date).getDate();
  dd = dd.length == 2 ? dd : '0' + dd;
  mm = mm.length == 2 ? mm : `0${mm}`;
  return dd + '/' + mm + '/' + yyyy;
};

export const showRoomName = (stringName, myName) => {
  return stringName;// stringName.split(', ').find(i => i !== myName);
};
