import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, destroy, update, save } from "../../sqlbuilder";

const initialState = {
    vendors: [],
    clients: [],
    didSubmit: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "assets/sources";

export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async ({ query, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, query, token);
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

export const DESTROY = createAsyncThunk(
  `${entity}/destroy`,
  async ({ id, token }, thunkAPI) => {
    try {
      return await destroy(entity, id, token);
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
      .addCase(BROWSE.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vendors = payload.vendors;
        state.clients = payload.clients;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // SAVE
      .addCase(SAVE.pending, state => {
        state.isLoading = true;
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.didSave = true;
        state.catalogs.push(action.payload);
      })
      .addCase(SAVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE
      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.didUpdate = true;
        const index = state.catalogs.findIndex(
          e => e._id === action.payload._id
        );
        state.catalogs[index] = action.payload;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // DESTROY
      .addCase(DESTROY.pending, state => {
        state.isLoading = true;
      })
      .addCase(DESTROY.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.vendors.findIndex(e => e._id === payload);

        state.vendors.splice(index, 1);
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, INJECT, REVERT } = entitySlice.actions;
export default entitySlice.reducer;
