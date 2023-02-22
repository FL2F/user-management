import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
  groupsArr: [],
  alumniArr: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// GET All Traits for the group
export const getAllGroups = createAsyncThunk(
  "groups/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getAllGroups(token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET All Traits for the group
export const getAllAlumniGroups = createAsyncThunk(
  "groups/getAlumn",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getAllAlumniGroups(token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update/Edit group role
export const editGroupRole = createAsyncThunk(
  "groups/editRole",
  async (groupID, role, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await groupService.editGroupRole(groupID, role, token);
      console.log("response", response);
      return response;
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete entire group
export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.deleteGroup(id, token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //Get All groups
      .addCase(getAllGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.groupsArr = action.payload;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.groupsArr = [];
      })

      //Get All Alumni groups
      .addCase(getAllAlumniGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAlumniGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.alumniArr = action.payload;
      })
      .addCase(getAllAlumniGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.alumniArr = [];
      })

      // Update / Edit
      .addCase(editGroupRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGroupRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editGroupRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //Delete
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = groupSlice.actions;

export default groupSlice.reducer;
