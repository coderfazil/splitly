import { createSlice } from "@reduxjs/toolkit";
import { createGroup,fetchGroups } from "../actions/groupActions"; // ✅ API action import karna zaroori hai


const initialState = {
  groups: [],
  isLoading: false,
  error: null,
};

export const GroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    editGroup: (state, action) => {
      state.groups = state.groups.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
    },
    updateGroupMemberBalance: (state, action) => {
      state.groups.forEach((group) => {
        if (group.id === action.payload.id) {
          group.members.forEach((member) => {
            member.balance = Number(member.balance) + Number(action.payload.costDistribution);
          });
        }
      });
    },
    settleGroupMemberBalance: (state, action) => {
      state.groups.forEach((group) => {
        group.members = group.members.map((member) => {
          if (member.id === action.payload.id) {
            return { ...member, balance: Number(member.balance) - Number(action.payload.amount) };
          }
          return member;
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Before Push, state.groups:", state.groups);  // Debugging
        if (!Array.isArray(state.groups)) {
          state.groups = []; // ✅ Ensure state.groups is an array
        }
      
        state.groups.push(action.payload); // ✅ Backend se group store mein add hoga
        console.log("After Push, state.groups:", state.groups);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload; // ✅ Fetched groups Redux store me set ho jayenge
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const GroupActions = GroupSlice.actions;
export default GroupSlice.reducer;
