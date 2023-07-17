import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, save, destroy, update } from "../../sqlbuilder";
// import Services from "../../../fakeDb/json/services";
import { nameFormatter } from "../../../components/utilities";

const initialState = {
    catalogs: [],
    sales: [], //clusters
    // filter | segregate the catalogs into:
    // 1. contracts
    // 2. pos
    pos: [],
    // filter catalogs to :
    // 1. in house
    // 2. send out thru checking of available services
    inhouse: [],
    sendout: [],
    contract: [], // category===[vp, sc, ssc]
    claimstub: {},
    isLoading: false,
    didSubmit: false,
    isError: false,
    message: "",
  },
  entity = "commerce/sales";

// Daily
// a. Remittance
// b. Genarate Ticket (Task)
export const BROWSE = createAsyncThunk(
  `${entity}/browse`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/browse`, item.data, item.token);
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

export const LEDGER = createAsyncThunk(
  `${entity}/browse`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/ledger`, item.data, item.token);
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
export const REMITTANCE = createAsyncThunk(
  `${entity}/remittance/daily`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/remittance/daily`, item.type, item.token);
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

export const HISTORY = createAsyncThunk(
  `${entity}/history`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/history`, item.type, item.token);
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

export const TASK = createAsyncThunk(
  `${entity}/task/daily`,
  async (item, thunkAPI) => {
    try {
      return await browse(`${entity}/task/daily`, item.type, item.token);
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

export const CHECKOUT = createAsyncThunk(
  `${entity}/checkout`,
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
      state.didSubmit = false;
    },
    CLAIMSTUB: (state, { payload }) => {
      state.claimstub = payload;
    },
    RESET: (state) => initialState,
    RECENT: (state) => initialState,
    SEARCH: (state, { payload }) => {
      let cluster = state.catalogs
        .filter((sale) =>
          String(nameFormatter(sale.customerId?.fullName, false))
            .toLowerCase()
            .startsWith(payload.toLowerCase())
        )
        .sort((a, b) => {
          const first = a.renderedAt ? true : false,
            second = b.renderedAt ? true : false;
          return Number(first) - Number(second);
        });

      let contract = [],
        pos = [],
        inhouse = [],
        sendout = [];

      pos = cluster.filter((deal) =>
        !deal.source ? deal : contract.push(deal)
      );

      for (let index = 0; index < pos.length; index++) {
        var _inhouse = pos[index]?.deals?.filter(
          (deal) => deal.inhouse.length > 0
        );
        _inhouse.length > 0 && inhouse.push(pos[index]);

        var _sendout = pos[index]?.deals?.filter(
          (deal) => deal.sendout.length > 0
        );
        _sendout.length > 0 && sendout.push(pos[index]);
      }
      state.pos = pos;
      state.contract = contract;
      state.inhouse = inhouse;
      state.sendout = sendout;
    },
  },
  extraReducers: (builder) => {
    builder
      // BROWSE
      .addCase(BROWSE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        state.sales = action.payload;
        state.isLoading = false;
        var _sales = action.payload?.sort((a, b) => {
          const first = a.renderedAt ? true : false,
            second = b.renderedAt ? true : false;
          return Number(first) - Number(second);
        });
        // var _sales = action.payload.sort(
        //   (a, b) => Number(a.hasResult) - Number(b.hasResult)
        // );
        let pos = _sales.filter(({ perform }) =>
            ["sales", "insourcing"].includes(perform)
          ),
          sales = _sales.filter(({ perform }) => perform === "sales"),
          contract = _sales.filter(({ perform }) => perform === "insourcing"),
          sendout = _sales.filter(({ perform }) => perform === "sendout");

        state.pos = pos;
        state.inhouse = sales;
        state.contract = contract;
        state.sendout = sendout;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // HISTORY
      .addCase(HISTORY.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(HISTORY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(HISTORY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DAILY
      .addCase(REMITTANCE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(REMITTANCE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
      })
      .addCase(REMITTANCE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(TASK.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TASK.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = [...action.payload];
        state.sales = action.payload;
      })
      .addCase(TASK.rejected, (state, action) => {
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
        state.catalogs.push(action.payload);
        var newObj = { ...state.recent };
        newObj._id = action.payload?._id;
        newObj.createdAt = action.payload?.createdAt;
        state.recent = newObj;
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

export const { RESET, REVERT, CLAIMSTUB, SEARCH, RECENT } = entitySlice.actions;
export default entitySlice.reducer;
