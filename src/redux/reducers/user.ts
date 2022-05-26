import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { name: "", age: 0, email: "" };

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
  },
});

export const { userLogin } = userSlice.actions; //위의 login이라는 함수를 action 기능이 작동하도록 다른 데서 쓸 예정이다.

export default userSlice.reducer;
