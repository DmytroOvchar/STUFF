import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

import axios from "axios";

export const getGategories = createAsyncThunk(
  "categories/getGategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      console.log(res, "!!!!");
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getGategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getGategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGategories.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default categoriesSlice.reducer;
export const actions = categoriesSlice.actions;
