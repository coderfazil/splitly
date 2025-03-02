import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { GroupActions } from "./GroupSlice";
import axios from "axios";
const initialState={
  friends:[]
}
// ✅ Async Thunks for API Calls
export const fetchFriends = createAsyncThunk("friend/fetchFriends", async () => {
  const response = await axios.get("http://localhost:5000/api/friends/all");
  console.log("response.data",response.data);
  return response.data;
});

export const addFriend = createAsyncThunk("friend/addFriend", async (friendData) => {
  const response = await axios.post("http://localhost:5000/api/friends/add", friendData);
  return response.data;
});

export const FriendSlice=createSlice(
  {
    name:'friend',
    initialState,
    reducers:{
addFriend:(state,action)=>{
  console.log("friend action",action.payload);
state.friends=[...state.friends,action.payload];
console.log("friends",state.friends);

},
editFriend: (state, action) => {
  state.friends = state.friends.map((friend) =>
    friend.id === action.payload.id ? action.payload : friend
  );
},
addGroupFriends: (state, action) => {
  action.payload.forEach(friend => {
    if (!state.friends.some(f => f.email === friend.email)) {
      state.friends.push(friend);
    }
  });
},
editGroupFriends: (state, action) => {
  const updatedFriends = state.friends.map(friend => {
    const updatedMember = action.payload.members.find(member => member.id === friend.id);
    return updatedMember ? { ...friend, ...updatedMember } : friend;
  });

  state.friends = updatedFriends;
},
updateMemberBalance:(state,action)=>{
  state.friends.map(friend=>{
   if(friend.id==action.payload.id){
     console.log(action.payload);
       friend.mbalance=Number(friend.mbalance)+Number(action.payload.costDistribution);
      
       
   }
  })
  },
  updateMultipleFriendBalance:(state,action)=>{
    const group=action.payload.group;
    group[0].members.map(member=>{
      state.friends.map(friend=>{
        if(member.id==friend.id){
          friend.balance=Number(friend.balance)+Number(action.payload.costDistribution);
        }
       
      })
    })
      
       
     
  
  },
  updateFriendGroupBalance: (state, action) => {
    state.friends = state.friends.map((friend) => {
      if (friend.id === action.payload.id) {
        return { ...friend, balance: Number(friend.balance) - Number(action.payload.amount) };
      }
      return friend;
    });
  },
  
  settleFriendBalance: (state, action) => {
    state.friends = state.friends.map((friend) => {
      if (friend.id === action.payload.id) {
        return { 
          ...friend, 
          mbalance: Number(friend.mbalance) - Number(action.payload.amount) // ✅ mbalance update ho raha hai
        };
      }
      return friend;
    });
  
   
  },
  
  
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFriends.fulfilled, (state, action) => {
          state.friends = action.payload;
        })
        .addCase(addFriend.fulfilled, (state, action) => {
          state.friends.push(action.payload);
        });
    },

    
  }
);
export const friendActions=FriendSlice.actions;
