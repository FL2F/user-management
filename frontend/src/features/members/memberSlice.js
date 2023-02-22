import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  allMembers: [],
  membersArr: [],
  pass: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// GET All Members
export const getAll = createAsyncThunk(
  "members/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memberService.getAll(token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET All Members for a specific group
export const getMembers = createAsyncThunk(
  "members/getMembers",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memberService.getMembers(id, token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET pass for specific member
export const getPass = createAsyncThunk(
  "members/getPass",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memberService.getPass(id, token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new member
export const createMember = createAsyncThunk(
  "members/create",
  async (memberData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memberService.createMember(memberData, token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update/Edit member
export const editMember = createAsyncThunk(
  "members/edit",
  async (memberData, thunkAPI) => {
    const { memberID } = memberData;

    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await memberService.editMember(
        memberID,
        memberData,
        token
      );
      console.log("response", response);
      return response;
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Roles for group
export const updateRole = createAsyncThunk(
  "members/updateRoles",
  async (updateData, thunkAPI) => {
    try {
      const { groupID } = updateData;

      const token = thunkAPI.getState().auth.user.token;
      const response = await memberService.updateRole(
        groupID,
        updateData,
        token
      );
      return response;
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Roles for group
export const updateFacilitator = createAsyncThunk(
  "members/updateFacilitator",
  async (updateData, thunkAPI) => {
    try {
      const { groupID } = updateData;

      const token = thunkAPI.getState().auth.user.token;
      const response = await memberService.updateFacilitator(
        groupID,
        updateData,
        token
      );
      return response;
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Password
export const updatePass = createAsyncThunk(
  "members/updatePass",
  async (updateData, thunkAPI) => {
    try {
      const { id } = updateData;

      const token = thunkAPI.getState().auth.user.token;
      const response = await memberService.updatePass(id, updateData, token);
      return response;
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete member
export const deleteMember = createAsyncThunk(
  "members/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await memberService.deleteMember(id, token);
    } catch (error) {
      const message =
        error.response.data.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetPass: (state) => {
      return { ...state, pass: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      //Get All members
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.allMembers = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.allMembers = [];
      })

      //Get All members for a specific group
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.membersArr = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.membersArr = [];
      })

      // get pass, but do not store it
      .addCase(getPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
        state.pass = action.payload;
      })
      .addCase(getPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // create Member
      .addCase(createMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.membersArr.push(action.payload);
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update / Edit
      .addCase(editMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Roles for entire group
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("action.error.message", action.error);
      })

      // Update Roles for entire group
      .addCase(updateFacilitator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFacilitator.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateFacilitator.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("action.error.message", action.error);
      })

      // Update Password
      .addCase(updatePass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log("action.error.message", action.error);
      })

      //Delete
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetPass } = memberSlice.actions;

export default memberSlice.reducer;
