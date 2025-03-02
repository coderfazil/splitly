import {configureStore, createSlice} from "@reduxjs/toolkit";
import { GroupSlice } from "./GroupSlice";
import { FriendSlice } from "./FriendSlice";
import { ExpenseSlice } from "./ExpenseSlice";
import { AuthSlice } from "./AuthSlice";
const splitlyStore=configureStore({
  reducer:{
    group:GroupSlice.reducer,
    friend:FriendSlice.reducer,
    expense:ExpenseSlice.reducer,
    auth:AuthSlice.reducer,
  }
});
export default splitlyStore;
