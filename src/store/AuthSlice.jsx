import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import defaultAvatars from "../utils/avatarImages"; // Import avatar images

const API_URL = "http://localhost:5000/api/users";

// Function to get a random avatar
const getRandomAvatar = () => defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

// Async Thunk for Login
export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        // ✅ Assign an avatar if the user does not already have one
        if (!data.avatar) {
            data.avatar = getRandomAvatar();
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Async Thunk for Signup
export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Signup failed");

        // ✅ Assign a random avatar on signup
        data.avatar = getRandomAvatar();

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Auth Slice
export const AuthSlice = createSlice({
    name: "auth",
    initialState: { user: null, isLoading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload; // ✅ Store user with avatar
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null; // ✅ Do not log in immediately
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
