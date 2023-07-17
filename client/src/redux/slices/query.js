import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../sqlbuilder";
import io from "socket.io-client";
// Railway update
const socket = io("http://localhost:5000");
// const socket = io("https://pinoyimd.up.railway.app/");

const initialState = {
  catalogs: [],
  cart: null,
  cluster: [],
  model: {},
  isLoading: false,
  didSubmit: false,
  isError: false,
  message: "",
};

export const MARKET = createAsyncThunk(
  `market/browse`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/market`, data, token);
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

export const REQUEST = createAsyncThunk(
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

export const BROWSE = createAsyncThunk(
  `query/browse`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, data, token);
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
export const FILTER = createAsyncThunk(
  `query/filter`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(entity, data, token);
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
  `query/list`,
  async ({ entity, data, token }, thunkAPI) => {
    try {
      return await browse(`${entity}/list`, data, token);
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

export const FIND = createAsyncThunk(`query/find`, async (item, thunkAPI) => {
  try {
    return await find(item.entity, item.id, item.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const SAVE = createAsyncThunk(`query/save`, async (item, thunkAPI) => {
  try {
    return await save(item.entity, item.data, item.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const UPDATE = createAsyncThunk(
  `query/update`,
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
  `query/destroy`,
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
  name: `query`,
  initialState,
  reducers: {
    SAVECART: (state, action) => {
      //to check if item add to cart is exisiting
      state.cart = action.payload;
    },
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
    SOCKET: (state, action) => {
      const { isUpdate, form, isDelete } = action.payload;
      const { _id } = form;
      const index = state.catalogs.findIndex((e) => e._id === _id);
      if (isDelete) {
        state.catalogs.splice(index, 1);
      } else if (isUpdate) {
        state.catalogs[index] = form;
      } else {
        state.catalogs.push(form);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //MARKET
      .addCase(MARKET.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(MARKET.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(MARKET.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //REQUEST
      .addCase(REQUEST.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(REQUEST.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(REQUEST.rejected, (state, action) => {
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
      // FILTER
      .addCase(FILTER.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FILTER.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(FILTER.rejected, (state, action) => {
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
      .addCase(LIST.rejected, (state, action) => {
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
        socket.emit("receive_user", {
          isUpdate: false,
          form: action.payload,
          isDelete: false,
        });
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
        state.catalogs = state.catalogs.filter((e) =>
          e._id !== action.payload._id ? action.payload : e
        );
        state.model = action.payload;
        state.didSubmit = true;
        socket.emit("receive_user", {
          isUpdate: true,
          form: action.payload,
          isDelete: false,
        });
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
        //comment ko po muna
        // state.catalogs = state.catalogs.filter((e) => e._id !== action.payload);
        socket.emit("receive_user", {
          isUpdate: false,
          form: { _id: action.payload },
          isDelete: true,
        });
      })
      .addCase(DESTROY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { SAVECART, RESET, RECORDSTATUS, REVERT, RECORDINJECT, SOCKET } =
  entitySlice.actions;
export default entitySlice.reducer;
