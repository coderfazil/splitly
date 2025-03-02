import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addFriend } from "../store/FriendSlice";



// ✅ Async thunk for createGroup
export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (groupData, { getState, dispatch, rejectWithValue }) => { // ✅ dispatch added here
    try {
      const { auth: { user } } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,  // ✅ Ensure token exists
        },
      };

      console.log("Creating group with data:", groupData); // ✅ Debugging

      const { data } = await axios.post("http://localhost:5000/api/groups/create", groupData, config);

      console.log("Group created successfully:", data); // ✅ Debugging

      // ✅ Automatically add friends from the group
      groupData.members.forEach(member => {
        console.log("Adding friend:", member); // ✅ Debugging
        dispatch(addFriend(member));  // ✅ Correct way to dispatch
      });

      return data;
    } catch (error) {
      console.error("Error creating group:", error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Groups ko fetch karne ka action
export const fetchGroups = createAsyncThunk(
  "group/fetchGroups",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // ✅ Auth token bhejna zaroori hai
        },
      };

      const { data }  = await axios.get("http://localhost:5000/api/groups/mygroups", config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);
