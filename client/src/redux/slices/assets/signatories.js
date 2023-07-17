import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse } from "../../sqlbuilder";

const initialState = {
    heads: [],
    record: {},
    didSubmit: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "assets/persons/heads";

export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, item.data, item.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const entitySlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    REVERT: state => {
      state.didSubmit = false;
    },
    INJECT: (state, data) => {
      state.heads.push(data.payload);
    },
    RESET: state => initialState,
  },
  extraReducers: builder => {
    builder
      // BROWSE
      .addCase(BROWSE.pending, state => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heads = action.payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, INJECT, REVERT } = entitySlice.actions;
export default entitySlice.reducer;
