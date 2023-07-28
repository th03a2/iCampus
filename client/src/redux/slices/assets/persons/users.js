import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, destroy, update, save } from "../../../sqlbuilder";

const initialState = {
    catalogs: [],
    archives: [],
    unresolved: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  entity = "assets/persons/users";

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
export const PARENTS = createAsyncThunk(
  `${entity}/parents`,

  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/parents`, item.query, item.token);
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

export const usersSlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    REFURBISH: (state, action) => {
      const res = action.payload;

      const index = state.catalogs.findIndex(
        catalog => catalog._id === res.user
      );

      state.catalogs[index].onDuty = res;
    },
    INJECT: (state, action) => {
      state.catalogs.unshift(action.payload);
    },
    RESET: state => {
      state.isSuccess = false;
    },
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

      .addCase(ARCHIVE.pending, state => {
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

      // UPDATE
      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.destroy === "catalogs") {
          const index = state.catalogs.findIndex(
            e => e._id === action.payload._id
          );
          state.catalogs[index] = action.payload;
        } else {
          state.unresolved = state.unresolved.filter(
            item => item._id !== action.payload._id
          );
          state.destroy = "catalogs";
        }
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Patients
      .addCase(PARENTS.pending, state => {
        state.isLoading = true;
      })
      .addCase(PARENTS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(PARENTS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(RESTORE.pending, state => {
        state.isLoading = true;
      })
      .addCase(RESTORE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.archives = state.archives.filter(
          item => item._id !== action.payload._id
        );
      })
      .addCase(RESTORE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // DESTROY
      .addCase(DESTROY.pending, state => {
        state.isLoading = true;
      })
      .addCase(DESTROY.fulfilled, (state, action) => {
        state.isLoading = false;
        state[state.destroy] = state[state.destroy].filter(
          item => item._id !== action.payload
        );
        if (state.destroy !== "catalogs") {
          state.destroy = "catalogs";
        }
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET, INJECT, REFURBISH } = usersSlice.actions;
export default usersSlice.reducer;
