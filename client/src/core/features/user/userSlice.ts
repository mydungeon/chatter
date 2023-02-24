import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "src/ts/interfaces/user.interfaces";
import { TRoomInviteList } from "src/ts/types/room.types";
import { IRoom } from "src/ts/interfaces/room.interfaces";

const initialState: IUser = {
  rooms: [],
  inviteList: [],
  selectedRoomID: null,
  directoryIsOpen: false,
  userName: null,
  userID: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setInviteList: (state, action) => {
      state.inviteList = action.payload;
    },
    selectRoom: (state, action) => {
      state.selectedRoomID = action.payload;
    },
    setDirectory: (state, action) => {
      state.directoryIsOpen = action.payload;
    },
    setCredentials: (state, action) => {
      const { payload } = action;
      state.userName = payload.userName;
      state.userID = payload.userID;
    },
    acceptInvite: (state, action) => {
      const { payload } = action;
      const inviteList = state.inviteList.filter((invite: TRoomInviteList) => invite.id !== payload.roomID);
      state.rooms.push(payload.room);
      state.inviteList = inviteList;
    },
    ignoreInvite: (state: IUser, action) => {
      const { payload } = action;
      const inviteList = state.inviteList.filter((invite: TRoomInviteList) => invite.id !== payload.roomID);
      state.inviteList = inviteList;
    },
    addUserToRoomInviteList: (state, action) => {
      const { payload } = action;
      const roomIndex = state.rooms.findIndex((room: IRoom) => room._id === payload.roomID);
      console.log(roomIndex);
      state.rooms[roomIndex].inviteList = [...state.rooms[roomIndex].inviteList, { id: payload.id, name: payload.name }]
    }
  }
})

export const { setRooms, setInviteList, selectRoom, setDirectory, setCredentials, acceptInvite, addUserToRoomInviteList } = userSlice.actions;
export default userSlice.reducer;