import { API } from "@/utils/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

interface UserInterface {
  userDetail: any;
}

const initialState: UserInterface = {
  userDetail: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userDetailAction: (state: UserInterface, action: PayloadAction<any>) => {
      state.userDetail = action.payload;
    },
  },
});

export const { userDetailAction } = userReducer.actions;

export default userReducer.reducer;

/* ASYNC ACTION */
export const loginActionApi = (data: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await API.post("/users/signIn", data);
      const action: PayloadAction<any> = result.data.data;
      dispatch(userDetailAction(action));
    } catch (error) {
      console.log(error);
    }
  };
};
