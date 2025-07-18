import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/register", userData);
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", userData);
            localStorage.setItem("token", res.data.token);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// LOGOUT
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
};

// GET CURRENT USER
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/user/current", {
                headers: { Authorization: token },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// SLICE
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token"),
        errors: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.errors = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload?.errors || [{ msg: "Registration failed" }];
            })

            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.errors = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload?.errors || [{ msg: "Login failed" }];
            })

            // FETCH CURRENT USER
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
