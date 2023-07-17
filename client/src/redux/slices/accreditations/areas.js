import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../../sqlbuilder";

const initialState = {
    catalogs: [],
    details: {},
    record: {},
    didSave: false,
    didUpdate: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "accreditations/areas";
export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async (items, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, items.data, items.token);
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
export const LIST = createAsyncThunk(
  `${entity}/list`,
  async (item, thunkAPI) => {
    try {
      return await browse(
        `${entity}/browse`,
        { key: "", branch: item.branch },
        item.token
      );
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
export const DETAILS = createAsyncThunk(
  `${entity}/details`,
  async ({ key, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/details`, key, token);
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

export const CLUSTER = createAsyncThunk(
  `${entity}/cluster`,
  async ({ id, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/cluster`, id, token);
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
      state.didSave = false;
      state.didUpdate = false;
    },
    RESET: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // BROWSE
      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.catalogs = payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // LIST
      .addCase(LIST.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LIST.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      // DETAILS
      .addCase(DETAILS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DETAILS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.details = action.payload;
      })
      .addCase(DETAILS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // CLUSTER
      .addCase(CLUSTER.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CLUSTER.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.catalogs = payload;
      })
      .addCase(CLUSTER.rejected, (state, action) => {
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
        state.didSave = true;
        state.catalogs.push(action.payload);
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
        const index = state.catalogs.findIndex(
          (e) => e._id === action.payload._id
        );
        state.catalogs[index] = action.payload;
        state.didUpdate = true;
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
