import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../../sqlbuilder";

const initialState = {
    catalogs: [],
    model: {},
    category: "",
    isLoading: false,
    didSave: false,
    didUpdate: false,
    didTweak: false,
    isError: false,
    visibility: false,
    message: "",
  },
  entity = "results/preferences";

export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async ({ branchId, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, { branchId }, token);
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

export const SORT = createAsyncThunk(
  `${entity}/sort`,
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
    REVERSE: (state) => {
      state.didSave = false;
      state.didUpdate = false;
      state.didTweak = false;
    },
    RESET: (state) => initialState,
    SETMODEL: (state, { payload }) => {
      state.model = payload;
    },
    SETINITIALMODEL: (state, { payload }) => {
      state.category = payload.category;
      state.model = payload.model;
      state.visibility = true;
    },
    SETVISIBILITY: (state, { payload }) => {
      state.visibility = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // BROWSE
      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, { payload }) => {
        state.catalogs = payload;
        state.isLoading = false;
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
        state.record = action.payload;
      })
      .addCase(FIND.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.didTweak = true;
        state.message = action.payload;
      })

      // SAVE
      .addCase(SAVE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.didSave = true;
        state.visibility = false;
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
      .addCase(UPDATE.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.didUpdate = true;
        state.visibility = false;
        const index = state.catalogs.findIndex((e) => e._id === payload._id);
        state.catalogs[index] = payload;
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

export const { RESET, REVERSE, SETMODEL, SETINITIALMODEL, SETVISIBILITY } =
  entitySlice.actions;
export default entitySlice.reducer;
