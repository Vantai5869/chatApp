import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as apiClient from './apiClient';
import {Message} from './conversationSlice';

const initialState = {
  users: [],
  loading: false,
  error: true,
  nextPage: 0,
  hasMore: true,
};

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async ({meId, page}) => {
    const response = await apiClient.fetchUsers(meId, page, 30);
    if (response.kind === 'success') {
      return {
        users: response.body ?? [],
      };
    } else {
      throw 'Error fetching users';
    }
  },
);

export const updateReadByMessage = createAsyncThunk(
  'updateReadByMessage',
  async ({id, readBy}) => {
    const response = await apiClient.updateReadByMessage(id, readBy);
    if (response.kind === 'success') {
      return {
        message: response.body,
      };
    } else {
      throw 'Error fetching users';
    }
  },
);

const userListSlice = createSlice({
  name: 'userList',
  initialState: initialState,
  reducers: {
    makeUserToTopList: (state, action) => {
      const roomId = action.payload.roomId;
      const tmpFirtUser =
        state?.users.length !== 0 ? state?.users[0] : undefined;

      if (action.payload.readBy.length !== 0 && tmpFirtUser) {
        if (tmpFirtUser.readBy.length !== 0)
          action.payload.readBy = [
            +tmpFirtUser.readBy + action.payload.readBy[0],
          ];
        else action.payload.readBy = [1];
      }
      const tmpUsers = state.users.sort(function (x, y) {
        return x._id == roomId ? -1 : y._id == roomId ? 1 : 0;
      });
      console.log({uuuuuuuu:action.payload});
      tmpUsers[0] = {
        ...tmpUsers[0],
        userId: action.payload?.userId,
        content: action.payload.content,
        readBy: action.payload.readBy,
        updatedAt: action.payload.updatedAt,
      };
      state.users = tmpUsers;
    },
    updateUserList: (state, action) => {
      const tmp = state.users.map(item => {
        if (item._id === action.payload.roomId) {
          return {
            ...item,
            readBy: action.payload.readBy,
          };
        }
        return item;
      });
      state.users = tmp;
    },
    addNewUser: (state, action) => {
      state.users = [action.payload, ...state.users];
    },
    clearUserList: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.nextPage += 1;
        let tmpData = [...state.users, ...action.payload.users].filter(
          ({_id}, i, _arr) => _arr.findIndex(elem => elem._id == _id) === i,
        );
        tmpData= tmpData.filter(i=>i?.avatar && i.avatar.length>0);
        state.users = tmpData;
        state.loading = false;
        state.hasMore = !!action.payload.users.length;
      })
      .addCase(fetchUsers.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {makeUserToTopList, addNewUser, clearUserList, updateUserList} =
  userListSlice.actions;
export default userListSlice.reducer;
