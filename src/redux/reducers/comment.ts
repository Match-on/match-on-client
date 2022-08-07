import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { state: null, idx: null };

export const commentSlice = createSlice({
  name: "comment",
  initialState: { value: initialStateValue },
  reducers: {
    commentAction: (state, action) => {
      state.value = action.payload;
    },
    unCommentAction: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { commentAction } = commentSlice.actions; //위의 login이라는 함수를 action 기능이 작동하도록 다른 데서 쓸 예정이다.
export const { unCommentAction } = commentSlice.actions;

export default commentSlice.reducer;
