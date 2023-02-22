import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import memberReducer from "../features/members/memberSlice";
import groupReducer from "../features/groups/groupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    members: memberReducer,
    groups: groupReducer,
  },
});
