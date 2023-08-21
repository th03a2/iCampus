import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../../sqlbuilder";
// Railway update
const initialState = {
    catalogs: [],
    handleSubjects: [],
    handleSections: [],
    schools: [],
    record: {},
    isLoading: false,
    didSave: false,
    didUpdate: false,
    didTweak: false,
    isError: false,
    message: "",
  },
  entity = "assets/batch";

export const BROWSE = createAsyncThunk(
  `${entity}/enrollment`,
  async (item, thunkAPI) => {
    try {
      return await browse(
        `${entity}/enrollment`,
        { key: item.key, branch: item.branch },
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

export const GETSUBJECTS = createAsyncThunk(
  `${entity}/getsubjects`,
  async ({ token }, thunkAPI) => {
    try {
      return await browse(`assets/subjects/browse`, "", token);
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

export const GETSECTIONS = createAsyncThunk(
  `${entity}/getsections`,
  async ({ token, levelId }, thunkAPI) => {
    try {
      return await browse(`assets/enrollment/sections`, { levelId }, token);
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

export const SCHOOL = createAsyncThunk(
  `${entity}/school`,
  async (item, thunkAPI) => {
    try {
      return await browse(
        `${entity}/dashboard`,
        { key: item.key, branch: item.branch },
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
  async ({ item }, thunkAPI) => {
    try {
      return await update(
        `${"assets"}/enrollment`,
        item.data,
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
  },
  extraReducers: (builder) => {
    builder
      //GETSECTIONS
      .addCase(GETSECTIONS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GETSECTIONS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.handleSections = action.payload;
      })
      .addCase(GETSECTIONS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //GETSUBJECTS
      .addCase(GETSUBJECTS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GETSUBJECTS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.handleSubjects = action.payload;
      })
      .addCase(GETSUBJECTS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      // LIST
      .addCase(SCHOOL.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SCHOOL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.schools = action.payload;
      })
      .addCase(SCHOOL.rejected, (state, action) => {
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
        state.didUpdate = true;
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

export const { RESET, REVERSE } = entitySlice.actions;
export default entitySlice.reducer;
