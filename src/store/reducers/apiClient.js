import axiosConfig from '../../axiosConfig';
import { Message } from './conversationSlice';
import { User } from './userListSlice';



export const fetchUsers = async (
  meId,
  page,
  count,
) => {
  const response = await axiosConfig.get(`/messages/users/${meId}/${page}/${count}`)
  if (response) {
    return {
      kind: 'success',
      body: response.data,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const fetchConversation = async (
  roomId,
  page,
  count,
) => {
  const response = await axiosConfig.get(`/messages/rooms/${roomId}/${page}/${count}`)
  if (response) {
    return {
      kind: 'success',
      body: response.data.data,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};


// export const postCustomMessage = async (
//   data: Message,
// ): Promise<NetworkResponse<Message[]>> => {
//   const response = await axiosConfig.post('/messages', data);
//   if (response) {
//     return {
//       kind: 'success',
//       body: response.data.data,
//     };
//   } else {
//     return {
//       kind: 'failure',
//     };
//   }
// };

export const updateReadByMessage = async (
  id,
  readBy
) => {
  const response = await axiosConfig.put(`/messages/${id}`, {readBy});
  console.log('response',response.data.data)
  if (response) {
    return {
      kind: 'success',
      body: response.data.data,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
