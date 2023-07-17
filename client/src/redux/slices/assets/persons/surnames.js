import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, save, destroy, update } from "../../../sqlbuilder";

const initialState = {
    catalogs: [],
    archives: [],
    unresolved: [],
    record: {},
    destroy: "catalogs",
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  entity = "assets/persons/surnames";

export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async (token, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, "", token);
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

export const PENDING = createAsyncThunk(
  `${entity}/pending`,
  async (token, thunkAPI) => {
    try {
      return await browse(`${entity}/unresolved`, "", token);
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

export const ARCHIVE = createAsyncThunk(
  `${entity}/archive`,
  async (token, thunkAPI) => {
    try {
      return await browse(`${entity}/archive`, "", token);
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

export const APPROVE = createAsyncThunk(
  `${entity}/approve`,
  async (item, thunkAPI) => {
    try {
      return await update(entity, { approved: true }, item.id, item.token);
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

export const APPROVERESTORE = createAsyncThunk(
  `${entity}/approverestore`,
  async (item, thunkAPI) => {
    try {
      return await update(
        entity,
        { approved: true, deletedAt: "" },
        item.id,
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

export const RESTORE = createAsyncThunk(
  `${entity}/restore`,
  async (item, thunkAPI) => {
    try {
      return await update(
        entity,
        { deletedAt: "" },
        item.id,
        item.token,
        true,
        true
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
    RESET: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })

      .addCase(PENDING.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(PENDING.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unresolved = action.payload;
      })
      .addCase(PENDING.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(ARCHIVE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ARCHIVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archives = action.payload;
      })
      .addCase(ARCHIVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(SAVE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SAVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs.unshift(action.payload);
        state.isSuccess = true;
      })
      .addCase(SAVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(UPDATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.catalogs.findIndex(
          (e) => e._id === action.payload._id
        );
        state.catalogs[index] = action.payload;
        state.isSuccess = true;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(APPROVE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(APPROVE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unresolved = state.unresolved.filter(
          (item) => item._id !== action.payload._id
        );
        state.catalogs.unshift(action.payload);
      })
      .addCase(APPROVE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(APPROVERESTORE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(APPROVERESTORE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archives = state.archives.filter(
          (item) => item._id !== action.payload._id
        );
        state.catalogs.unshift(action.payload);
      })
      .addCase(APPROVERESTORE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(RESTORE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RESTORE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archives = state.archives.filter(
          (item) => item._id !== action.payload._id
        );
        if (action.payload.approved) {
          state.catalogs.unshift(action.payload);
        }
      })
      .addCase(RESTORE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(DESTROY.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DESTROY.fulfilled, (state, action) => {
        state.isLoading = false;
        state[state.destroy] = state[state.destroy].filter(
          (item) => item._id !== action.payload
        );
        if (state.destroy !== "catalogs") {
          state.destroy = "catalogs";
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
