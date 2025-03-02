
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// ✅ Fetch expenses from the database
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (id, { rejectWithValue }) => {
    try {
      console.log("Fetching expense with ID:", id); // Add this line before the fetch call
      const response = await axios.get(`http://localhost:5000/api/expenses/${id}`);
      console.log("Fetched Data from API:", response.data);  // 🔍 Debugging API response
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
;

// ✅ Add new expense to database
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expenseData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/expenses/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      const data = await response.json();
      if (data.success) {
        return data.expense; // Returns newly added expense
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ✅ Fetch all expenses from the database
export const fetchAllExpenses = createAsyncThunk(
  "expenses/fetchAllExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/expenses"); // Adjust this endpoint as needed
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const initialState={
  expense:[],
  allExpenses: [],
  loading: false,
  error: null,
};

export const ExpenseSlice=createSlice({
  name:'expense',
  initialState,
  reducers:{
addExpense:(state,action)=>{

  state.expense = [{ ...action.payload, type: "expense" }, ...state.expense];

},
settleUp: (state, action) => {
  state.expense = [{ ...action.payload, type: "settleUp" }, ...state.expense];
 
  
},
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch expenses from database
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        console.log("Fetched expenses:", action.payload);  
        state.loading = false;
        state.expense =  action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add new expense to database
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expense.push(action.payload); // Add to Redux state
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.payload;
      })
  
   
   .addCase(fetchAllExpenses.pending, (state) => {
    state.loading = true;
  })
  .addCase(fetchAllExpenses.fulfilled, (state, action) => {
    state.loading = false;
    state.allExpenses = action.payload; // Store all expenses
  })
  .addCase(fetchAllExpenses.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
},
});
export const ExpenseActions=ExpenseSlice.actions;