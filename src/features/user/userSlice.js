import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
  dashBoardText: "Dashboard",
  userImage: "",
  userParticipationProjects: [],
};


export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("user/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    //return loginUserThunk('/auth/login', user, thunkAPI);
    try {
      const resp = await customFetch.post("user/login", user);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (message, thunkAPI) => {
    try {
      thunkAPI.dispatch(logoutUser(message));
      //thunkAPI.dispatch(clearAllJobsState());
      //thunkAPI.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (user, thunkAPI) => {
//     try {
//       const resp = await customFetch.patch("/updateUser", user);
//       // console.log(resp.data);
//       return resp.data;
//     } catch (error) {
//       return checkForUnauthorizedResponse(error, thunkAPI);
//     }
//   }
// );


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
    setDashboardText: (state, { payload }) => {
      state.dashBoardText = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const user = payload.data;
        
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.user_name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload && payload.message?payload.message:"Server Error");
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const user =payload.data[0];
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome ${user.user_name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload && payload.message?payload.message:"Server Error");
      })

      // In case of Update
      // .addCase(updateUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateUser.fulfilled, (state, { payload }) => {
      //   const user = payload.data[0];
      //   state.isLoading = false;
      //   state.user = user;
      //   toast.success(`User Updated!`);
      // })
      // .addCase(updateUser.rejected, (state, { payload }) => {
      //   state.isLoading = false;
      //   toast.error(payload && payload.message?payload.message:"Server Error");
      // })

      .addCase(clearStore.rejected, () => {
        toast.error("There was an error..");
      })

  },
});


export const { logoutUser,toggleSidebar, setDashboardText } = userSlice.actions;
export default userSlice.reducer;
