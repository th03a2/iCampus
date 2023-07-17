import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Services } from "../../../fakeDb";
import { browse, find, save, destroy, update } from "../../sqlbuilder";

const initialState = {
    catalogs: [],
    cluster: [],
    model: {},
    page: 1,
    totalPages: 1,
    visibility: false,
    viewServices: false,
    isLoading: false,
    didSubmit: false,
    isError: false,
    message: "",
    maxPage: 6,
  },
  entity = "commerce/menus";

export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async (item, thunkAPI) => {
    try {
      const { data, token } = item;
      return await browse(`${entity}`, data, token);
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

export const OFFERS = createAsyncThunk(
  `${entity}/offers`,
  async (item, thunkAPI) => {
    try {
      const { data, token } = item;
      return await browse(`${entity}/offers`, data, token);
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
    REVERT: (state) => (state.didSubmit = false),
    RESET: (state) => initialState,
    SETVISIBILITY: (state, { payload }) => {
      state.visibility = payload;
    },
    SETVIEWSERVICES: (state, { payload }) => {
      state.viewServices = payload;
    },
    SETMODEL: (state, { payload }) => {
      state.model = payload;
      state.visibility = true;
    },
    SETREFERENCE: (state, { payload }) => {
      state.model = payload;
      state.viewServices = true;
    },
    FILTER: (state, { payload }) => {
      state.cluster = state.catalogs.filter((service) =>
        Object.values(service).some((val) =>
          String(val).toLowerCase().includes(payload)
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.catalogs = payload;
        state.cluster = payload;
        if (payload.length > 0) {
          let totalPages = Math.floor(payload.length / state.maxPage);
          if (payload.length % state.maxPage > 0) totalPages += 1;
          state.totalPages = totalPages;

          state.page > totalPages && (state.page = totalPages);
        }
      })
      .addCase(BROWSE.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(OFFERS.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OFFERS.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.catalogs = payload;
        state.cluster = payload;
        if (payload.length > 0) {
          let totalPages = Math.floor(payload.length / state.maxPage);
          if (payload.length % state.maxPage > 0) totalPages += 1;
          state.totalPages = totalPages;

          state.page > totalPages && (state.page = totalPages);
        }
      })
      .addCase(OFFERS.rejected, (state, { payload }) => {
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

        // populate this one
        const _parser = action.payload.map((menu) => {
          let _menu = { ...menu };
          _menu.services = Services.whereIn(menu.services);
          return _menu;
        });
        state.catalogs = _parser;
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
        var _parser = action.payload;
        if (_parser.services) {
          const newServices = _parser?.services.map((service) =>
            Services.collection.find((fService) => fService.id === service)
          );
          _parser.services = newServices;
        }

        state.catalogs.push(_parser);
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
      .addCase(UPDATE.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.catalogs = state.catalogs.map((model) =>
          model._id === payload._id ? payload : model
        );
        state.didSubmit = true;
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

export const {
  RESET,
  REVERT,
  SETVISIBILITY,
  SETMODEL,
  SETVIEWSERVICES,
  SETREFERENCE,
  FILTER,
} = entitySlice.actions;
export default entitySlice.reducer;
