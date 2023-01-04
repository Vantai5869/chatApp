import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as apiClient from './apiClient';

const initialState = {
  conversations: [],
  loading: true,
  error: false,
};

export const fetchConversation = createAsyncThunk(
  'fetchConversation',
  async ({roomId, page}) => {
    const response = await apiClient.fetchConversation(roomId, page, 15);
    if (response.kind === 'success') {
      return {
        roomId: roomId,
        conversation: response.body ?? [],
      };
    } else {
      throw 'Error fetching users';
    }
  },
);

const ConversationSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
    addMessageTmp: (state, action) => {
      state.conversations = state.conversations.map(item => {
        if (item._id == action.payload.roomId) {
          const tmpData = [action.payload, ...item.data].filter(
            ({_id}, i, _arr) => _arr.findIndex(elem => elem._id === _id) === i,
          );
          return {...item, data: tmpData};
        }
        return item;
      });
    },

    deleteMessage: (state, action) => {
      state.conversations = state.conversations.map(item => {
        if (item._id == action.payload.roomId) {
          const tmpData = [...item.data].filter(
            ({_id}, i, _arr) => action.payload._id!=_id,
          );
          return {...item, data: tmpData};
        }
        return item;
      });
    },


    clearConversation: () => initialState,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchConversation.pending, state => {
        state.loading = true;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        const conversationData = action.payload.conversation;
        let newConversation = {
          _id: action.payload.roomId,
          data: conversationData,
          error: false,
          hasMore: !!action.payload.conversation.length,
          nextPage: 0,
        };
        const existConversation = state.conversations.find(
          item => item._id === newConversation._id,
        );
        if (existConversation) {
          const tmpData = [
            ...existConversation.data,
            ...newConversation.data,
          ].filter(
            ({_id}, i, _arr) => _arr.findIndex(elem => elem._id === _id) === i,
          );
          const conversation = {
            ...newConversation,
            nextPage: existConversation.nextPage + 1,
            data: tmpData,
          };
          state.conversations = state.conversations.map(item => {
            if (item._id === existConversation._id) return conversation;
            return item;
          });
          state.loading = false;
        } else {
          state.conversations = state.conversations.concat(newConversation);
          state.loading = false;
        }
      })
      .addCase(fetchConversation.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {addMessageTmp, clearConversation, deleteMessage} = ConversationSlice.actions;
export default ConversationSlice.reducer;
