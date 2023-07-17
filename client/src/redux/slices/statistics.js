import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../sqlbuilder";

const initialState = {
    sales: [],
    daily: [],
    isLoading: false,
    didSubmit: false,
    isError: false,
    message: "",
  },
  entity = "commerce/sales";
export const YEARLY = createAsyncThunk(
  `statistic/yearly`,
  async ({ data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/statistic/yearly`, data, token);
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

export const FIND = createAsyncThunk(
  `statistic/find`,
  async (item, thunkAPI) => {
    try {
      return await find(entity, item.id, item.token);
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
  `statistic/save`,
  async (item, thunkAPI) => {
    try {
      return await save(entity, item.data, item.token);
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
  `statistic/update`,
  async (item, thunkAPI) => {
    try {
      return await update(entity, item.data, item.id, item.token);
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
  name: `statistics`,
  initialState,
  reducers: {
    RECORDINJECT: (state, data) => {
      state.catalogs.push(data.payload);
    },
    RECORDSTATUS: (state, data) => {
      state.record.status = data.payload;
    },
    REVERT: (state) => {
      state.didSubmit = false;
    },
    RESET: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // BROWSE
      .addCase(YEARLY.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(YEARLY.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sales = payload;
      })
      .addCase(YEARLY.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      // FIND
      .addCase(FIND.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FIND.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload;
      })
      .addCase(FIND.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // SAVE
      .addCase(SAVE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload;
        state.didSubmit = true;
      })
      .addCase(SAVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(UPDATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = state.catalogs.filter(
          (e) => e._id !== action.payload._id
        );
        state.record = action.payload;
        state.didSubmit = true;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, RECORDSTATUS, REVERT, RECORDINJECT } =
  entitySlice.actions;
export default entitySlice.reducer;
