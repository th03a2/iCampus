import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { browse, find, save, destroy, update } from "../../sqlbuilder";
import { payments } from "../../../components/utilities";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  patron: {},
  physician: {},
  privilege: "",
  category: "walkin",
  source: {},
  isPickup: false,
  gross: 0,
  // net: 0,
  discount: 0,
  percentage: 0,
  payment: "cash",
  better: "",
  message: "",
};

export const BROWSE = createAsyncThunk(`pos/browse`, async (item, thunkAPI) => {
  try {
    const { entity, branchId, token } = item;
    return await browse(`commerce/${entity}`, branchId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const SEARCH = createAsyncThunk(
  `pos/search`,
  async ({ keys }, thunkAPI) => {
    try {
      return keys;
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

export const FIND = createAsyncThunk(`pos/find`, async (item, thunkAPI) => {
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

export const SAVE = createAsyncThunk(`pos/save`, async (item, thunkAPI) => {
  try {
    return await save(item.entity, item.form, item.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const UPDATE = createAsyncThunk(`pos/update`, async (item, thunkAPI) => {
  try {
    return await update(item.entity, item.data, item.id, item.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const DESTROY = createAsyncThunk(
  `pos/destroy`,
  async (data, thunkAPI) => {
    try {
      return await destroy(data.entity, data.id, data.token);
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
  name: "pos",
  initialState,
  reducers: {
    REVERT: state => (state.didSubmit = false),
    RESET: state => initialState,
    PATRON: (state, { payload }) => {
      state.patron = payload;
      state.privilege = payload.privilege ? payload.privilege : 0;
    },
    CATEGORY: (state, { payload }) => {
      state.category = payload;
      state.payment = payments[payload][0]; // Default
      const srp = state.category === "walkin" ? "opd" : state.category;
      state.gross = state.cart.reduce(
        (sum, item) => sum + parseFloat(item[srp] || 0),
        0
      );
    },
    SOURCE: (state, { payload }) => {
      state.source = payload;
    },
    PAYMENT: (state, { payload }) => {
      state.payment = payload;
    },
    PHYSICIAN: (state, { payload }) => {
      state.physician = payload;
    },
    ADDITEM: (state, { payload }) => {
      const cart = [...state.cart];
      if (cart.length === 0) {
        cart.push(payload);
      } else {
        var isDuplicate = cart.find(deets => deets._id === payload._id);

        if (isDuplicate) {
          toast.warn(`${payload.description} is already selected!`);
        } else {
          var indexes = [];

          cart.map((detail, index) => {
            var duplicate = false;

            detail.packages?.map(service => {
              payload.packages.find(srvc => {
                if (srvc === service) {
                  duplicate = true;
                }
              });
            });

            // collecting all index with conflict of current payload
            duplicate && indexes.push(index);
          });

          // removing all indexes with conflict of the current payload
          if (indexes.length > 0) {
            for (let index = indexes.length - 1; index >= 0; index--) {
              cart.splice(indexes[index], 1);
            }
          }

          cart.push(payload);
        }
      }

      const category = state.category === "walkin" ? "opd" : state.category;
      const gross = cart.reduce(
        (sum, item) => sum + parseFloat(item[category] || 0),
        0
      );

      const discount = cart.reduce((sum, item) => {
        const srp = item.discountable
          ? (parseFloat(item[category] || 0) * state.percentage) / 100
          : parseFloat(item[category] || 0);

        return sum + srp;
      }, 0);

      state.gross = gross;
      state.discount = discount;
      state.cart = cart;
    },
    REMOVEITEM: (state, { payload }) => {
      const cart = [...state.cart];
      cart.splice(payload.index, 1);
      const srp = state.category === "walkin" ? "opd" : state.category;
      state.gross = cart.reduce(
        (sum, item) => sum + parseFloat(item[srp] || 0),
        0
      );
      state.cart = cart;
    },
    ISPICKUP: (state, { payload }) => {
      state.isPickup = payload;
    },
    PRIVILEGES: (state, action) => {
      state.privilege = action.payload;
      if (state.privilege > 0) {
        state.percentage = 20;
        const srp = state.category === "walkin" ? "opd" : state.category;
        state.gross = state.cart.reduce(
          (sum, item) => sum + parseFloat(item[srp] || 0),
          0
        );
      }
      // action.asyncDispatch({ type: "SUMMATION" });
    },
    // SUMMATION: (state, action) => {
    //   console.log(action);
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(BROWSE.pending, state => {
        state.isLoading = true;
      })
      .addCase(BROWSE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload;
        state.cluster = action.payload;
      })
      .addCase(BROWSE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //search
      .addCase(SEARCH.pending, state => {
        state.isLoading = true;
      })
      .addCase(SEARCH.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.keys) {
          state.cluster = state.catalogs.filter(menu =>
            Object.values(menu).some(val =>
              String(val).toLowerCase().includes(action.keys)
            )
          );
        } else {
          state.cluster = action.payload;
        }
      })
      // FIND
      .addCase(FIND.pending, state => {
        state.isLoading = true;
      })
      .addCase(FIND.fulfilled, (state, action) => {
        state.isLoading = false;

        // populate this one
        const _parser = action.payload.map(menu => {
          let _menu = { ...menu };
          // _menu.services = Services.whereIn(menu.services);
          return _menu;
        });
        state.catalogs = _parser;
      })
      .addCase(FIND.rejected, (state, action) => {
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

export const {
  RESET,
  REVERT,
  PATRON,
  CATEGORY,
  SOURCE,
  PAYMENT,
  PHYSICIAN,
  ADDITEM,
  REMOVEITEM,
  ISPICKUP,
  PRIVILEGES,
  SUMMATION,
} = entitySlice.actions;
export default entitySlice.reducer;
