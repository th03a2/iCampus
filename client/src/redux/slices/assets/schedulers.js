import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, save, destroy, update } from "./../../sqlbuilder";

const initialState = {
    sched: [],
    archives: [],
    unresolved: [],
    record: {},
    destroy: "sched",
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  entity = "assets/schedulers";

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

export const SAVE = createAsyncThunk(
  `${entity}/save`,
  async (item, thunkAPI) => {
    try {
      return await save(entity, item.form, item.token);
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

export const UPDATE = createAsyncThunk(
  `${entity}/update`,
  async (item, thunkAPI) => {
    try {
      return await update(entity, item.form, item.id, item.token);
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

export const DESTROY = createAsyncThunk(
  `${entity}/destroy`,
  async (item, thunkAPI) => {
    try {
      return await destroy(entity, item.id, item.token);
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
    PATH: (state, action) => {
      state.destroy = action.payload;
    },
    RESET: state => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(BROWSE.pending, state => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sched = action.payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(SAVE.pending, state => {
        state.isLoading = true;
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sched.unshift(action.payload);
        state.isSuccess = true;
      })
      .addCase(SAVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sched.findIndex(e => e._id === action.payload._id);
        state.sched[index] = action.payload;
        state.isSuccess = true;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(DESTROY.pending, state => {
        state.isLoading = true;
      })
      .addCase(DESTROY.fulfilled, (state, action) => {
        state.isLoading = false;
        state[state.destroy] = state[state.destroy].filter(
          item => item._id !== action.payload
        );
        if (state.destroy !== "sched") {
          state.destroy = "sched";
        }
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { RESET, PATH } = entitySlice.actions;
export default entitySlice.reducer;
