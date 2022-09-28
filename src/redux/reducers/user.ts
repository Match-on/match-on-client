import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  accessedAt: "",
  createdAt: "",
  email: "",
  emailAgree: false,
  id: "",
  name: "",
  nickname: "",
  phone: "",
  profileUrl: "" || null,
  univName: "" || null,
  userIdx: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    userLogin: (state, action) => {
      state.value = action.payload;
    },
    userLogOut: (state) => {
      state.value = initialStateValue;
    },
    changeUserInfo: (state, action) => {
      console.log("state", state);
      console.log("action", action);

      state.value[action.payload.type] = action.payload.payload;
    },
  },
});
//dispatch(changeUserInfo({type:"profileUrl",payload:""}));
export const { userLogin, userLogOut, changeUserInfo } = userSlice.actions; //위의 login이라는 함수를 action 기능이 작동하도록 다른 데서 쓸 예정이다.

export default userSlice.reducer;
