import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk : Admin - Get all users
export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/user/all", {
                headers: { Authorization: token },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// Admin - Delete user
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userId, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/user/${userId}`, {
                headers: { Authorization: token },
            });
            return userId;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// Admin - Update user
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, data }, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(`http://localhost:5000/api/user/${id}`, data, {
                headers: { Authorization: token },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


// Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.list = state.list.filter((u) => u._id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.list = state.list.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                );
            });
    },
});

export default userSlice.reducer;
