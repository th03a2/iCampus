import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { update, browse } from "../../sqlbuilder";

const initialState = {
  id: null,
  patron: {},
  packages: [],
  params: {},
  remarks: "",
  form: "",
  services: [],
  signatories: [],
  referral: {},
  source: {},
  category: "",
  heads: [],
  preferences: [],
  is_protected: true,
  visibility: false,
  didSubmit: false,
  isLoading: false,
  isError: false,
  message: "",
};

export const UPDATE = createAsyncThunk(
  `task/update`,
  async (items, thunkAPI) => {
    try {
      const { form, data, id, token } = items;
      return await update(`results/laboratory/${form}`, data, id, token);
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
export const HEADS = createAsyncThunk(`task/heads`, async (item, thunkAPI) => {
  try {
    return await browse(`assets/persons/heads/browse`, item.data, item.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
export const PREFERENCES = createAsyncThunk(
  `task/preferences`,
  async (item, thunkAPI) => {
    try {
      return await browse(
        `results/preferences/browse`,
        { branchId: item.branchId },
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
export const entitySlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    INITIALIZED: (state, { payload }) => {
      const {
        form,
        patron,
        referral,
        department,
        source,
        packages,
        is_protected,
        id,
        category,
        remarks,
      } = payload;
      state.id = id;
      state.form = String(form).toLowerCase();
      state.patron = patron;
      state.referral = referral;
      state.department = department;
      state.source = source;
      state.category = category;
      state.visibility = true;
      state.is_protected = is_protected;
      state.packages = packages;
      state.remarks = remarks;
      state.params = {};

      if (form === "Hematology") {
        state.params = {
          dc: payload.dc,
          cc: payload.cc,
          rci: payload.rci,
          apc: payload.apc,
        };
      } else if (form === "Urinalysis") {
        state.params = {
          me: payload.me,
          ce: payload.ce,
          pe: payload.pe,
        };
      } else if (form === "Parasitology") {
        state.params = {
          me: payload.me,
          pe: payload.pe,
        };
      } else if (form === "Miscellaneous") {
        state.params = {
          specimen: payload.specimen,
          troupe: payload.troupe,
          results: payload.results,
        };
      } else if (form === "Coagulation") {
        state.params = {
          aptt: payload.aptt,
          pt: payload.pt,
        };
      }
    },
    SETVisibility: state => {
      state.visibility = false;
    },
    REVERT: state => {
      state.didSubmit = false;
    },
    RESET: state => initialState,
    SETPACKAGE: (state, { payload }) => {
      state.packages = payload;
    },
    SETPARAMS: (state, { payload }) => {
      state.params = payload;
    },
    SETSERVICES: (state, { payload }) => {
      state.services = payload;
    },
    SETREMARKS: (state, { payload }) => {
      state.remarks = payload;
    },
    SETSIGNATORIES: (state, { payload }) => {
      const performer = state.heads.find(
        ({ section }) => section === payload.section
      )?.user._id;
      const pathologist = state.heads.find(
        ({ section }) => section === "pathologist"
      )?.user._id;

      // console.log("signatories", [performer, pathologist, payload.encoder]);
      state.signatories = [performer, pathologist, payload.encoder];
    },
  },
  extraReducers: builder => {
    builder
      // UPDATE
      .addCase(UPDATE.pending, state => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, { payload }) => {
        const data = {
          ...payload,
          services: state.services,
          category: state.category,
          source: state.source,
          referral: state.referral,
        };
        state.isLoading = false;
        localStorage.setItem(`task-printout`, JSON.stringify(data));
        if (payload.hasDone) {
          window.open(
            `/frontdesk/results/${state.form}/printout`,
            "Result",
            "top=100px,width=900px,height=650px"
          );
        }
        state.visibility = false;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // HEADS
      .addCase(HEADS.pending, state => {
        state.isLoading = true;
      })
      .addCase(HEADS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.heads = action.payload;
      })
      .addCase(HEADS.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // PREFERENCES
      .addCase(PREFERENCES.pending, state => {
        state.isLoading = true;
      })
      .addCase(PREFERENCES.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.preferences = payload;
      })
      .addCase(PREFERENCES.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  RESET,
  REVERT,
  INITIALIZED,
  SETVisibility,
  SETPACKAGE,
  SETSERVICES,
  SETREMARKS,
  SETSIGNATORIES,
  SETPARAMS,
} = entitySlice.actions;
export default entitySlice.reducer;
