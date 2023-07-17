import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../sqlbuilder";

const initialState = {
  catalogs: [],
  cluster: [],
  model: {},
  isLoading: false,
  didSubmit: false,
  isError: false,
  message: "",
};

export const BROWSE = createAsyncThunk(
  `subquery/browse`,
  async ({ entity, branch, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, branch, token);
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
  `subquery/find`,
  async (item, thunkAPI) => {
    try {
      return await find(item.entity, item.id, item.token);
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
  `subquery/save`,
  async (item, thunkAPI) => {
    try {
      return await save(item.entity, item.data, item.token);
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
  `subquery/update`,
  async (item, thunkAPI) => {
    try {
      return await update(item.entity, item.data, item.id, item.token);
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
  `subquery/destroy`,
  async (item, thunkAPI) => {
    try {
      return await destroy(item.entity, item.id, item.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.item &&
          error.response.item.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const entitySlice = createSlice({
  name: `subquery/browse`,
  initialState,
  reducers: {
    RECORDINJECT: (state, data) => {
      state.catalogs.push(data.payload);
    },
    RECORDSTATUS: (state, data) => {
      state.record.status = data.payload;
    },
    REVERT: state => {
      state.didSubmit = false;
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
        state.catalogs = action.payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIND
      .addCase(FIND.pending, state => {
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
      .addCase(SAVE.pending, state => {
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
      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = state.catalogs.filter(
          e => e._id !== action.payload._id
        );
        state.record = action.payload;
        state.didSubmit = true;
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
      .addCase(DESTROY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = state.catalogs.filter(e => e._id !== action.payload);
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, RECORDSTATUS, REVERT, RECORDINJECT } =
  entitySlice.actions;
export default entitySlice.reducer;
