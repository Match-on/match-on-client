import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { class: "", index: -1, id: "" };

export const tableSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    selectRow: (state, action) => {
      state.value = action.payload;
    },
    unSelectRow: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { selectRow } = tableSlice.actions; //위의 login이라는 함수를 action 기능이 작동하도록 다른 데서 쓸 예정이다.
export const { unSelectRow } = tableSlice.actions;

export default tableSlice.reducer;
