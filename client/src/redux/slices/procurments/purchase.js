import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../../sqlbuilder";

const initialState = {
    catalogs: [],
    record: {},
    request: [],
    didSubmit: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "procurements/purchase";

export const BROWSE = createAsyncThunk(
  `purchase/approved`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/approved`, data, token);
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

export const GETREQUEST = createAsyncThunk(
  `purchase/request`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/request`, data, token);
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
  `${entity}/find`,
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
      return await update(entity, item.data, item.id, item.token, false);
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
  async (data, thunkAPI) => {
    try {
      return await destroy(entity, data.id, data.token);
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
    REVERT: (state) => {
      state.didSubmit = false;
    },
    RESET: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // BROWSE
      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND
      .addCase(FIND.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FIND.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
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
      //GET REQUEST
      .addCase(GETREQUEST.fulfilled, (state, action) => {
        state.request = action.payload;
      })

      // UPDATE
      .addCase(UPDATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.catalogs.findIndex(
          (e) => e._id === action.payload._id
        );
        state.catalogs[index] = action.payload;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DESTROY
      .addCase(DESTROY.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DESTROY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = state.catalogs.filter((e) => e._id !== action.payload);
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, REVERT } = entitySlice.actions;
export default entitySlice.reducer;
