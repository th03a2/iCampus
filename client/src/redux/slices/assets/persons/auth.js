import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  browse,
  changePassword,
  login,
  update,
  upload,
  validateRefresh,
} from "../../../sqlbuilder";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const theme = JSON.parse(localStorage.getItem("theme")),
  token = localStorage.getItem("token"),
  maxPage = Number(localStorage.getItem("maxPage")),
  defaultDuty = {
    designation: 1,
    platform: "patron",
    name: "Default Duty", // branch
    company: null, // company name
  };

const initialState = {
  attendances: [],
  auth: {},
  onDuty: defaultDuty,
  access: "",
  branches: [],
  token,
  maxPage: maxPage || 6,
  theme: theme || {
    icon: "sun",
    dark: false,
    bg: "bg-light",
    bgHex: "#FBFBFB",
    text: "text-dark",
    skin: "light-skin",
    topbar: "light-topbar",
    skinText: "text-dark",
    color: "light",
    reverse: "dark",
    hex: "#1266F1",
    border: "black",
    borderHex: "#262626",
  },
  rate: 0,
  isCeo: false,
  progress: 0,
  isSuccess: false,
  isLoading: false,
};

export const LOGIN = createAsyncThunk(
  "auth/login",
  ({ email, password }, thunkAPI) => {
    try {
      return login(email, password);
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

export const LOGOUT = createAsyncThunk("auth/logout", (data, thunkAPI) => {
  try {
    return browse("assets/persons/auth/logout", data.id, data.token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const ATTENDANCE = createAsyncThunk(
  "auth/attendance",
  (data, thunkAPI) => {
    try {
      return browse("assets/persons/auth/attendance", data.id, data.token);
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

export const REFRESH = createAsyncThunk(
  "auth/validateRefresh",
  (token, thunkAPI) => {
    try {
      return validateRefresh(token);
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
  "auth/update",
  async ({ patron, id, token }, thunkAPI) => {
    console.log(patron);
    try {
      return await update("assets/persons/users", patron.form, id, token);
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

export const ACTIVEPLATFORM = createAsyncThunk(
  "active/platform",
  async (data, thunkAPI) => {
    try {
      return await update(
        "assets/persons/personnels",
        { platform: data.platform },
        data.id,
        data.token
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

export const CHANGEPASSWORD = createAsyncThunk(
  "auth/password/change",
  async (item, thunkAPI) => {
    try {
      return await changePassword("assets/persons/auth", item.form, item.token);
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

export const UPLOAD = createAsyncThunk(
  "assets/persons/auth/file",
  async (data, thunkAPI) => {
    try {
      return await upload(data);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    THEME: (state, data) => {
      let theme;
      if (data.payload) {
        theme = {
          icon: "moon",
          dark: true,
          bg: "bg-dark",
          bgHex: "#d5d4d5",
          text: "text-white",
          skin: "dark-skin",
          skinText: "text-white",
          topbar: "dark-topbar",
          color: "dark",
          reverse: "light",
          hex: "#FFA900",
          border: "white",
          borderHex: "#FBFBFB",
        };
      } else {
        theme = {
          icon: "sun",
          dark: false,
          bg: "bg-light",
          bgHex: "#FBFBFB",
          text: "text-dark",
          skin: "light-skin",
          topbar: "light-topbar",
          skinText: "text-dark",
          color: "light",
          reverse: "dark",
          hex: "#1266F1",
          border: "black",
          borderHex: "#262626",
        };
      }
      state.theme = theme;
      localStorage.setItem("theme", JSON.stringify(theme));
    },
    DUTY: (state, { payload }) => {
      localStorage.setItem("activePlatform", payload.onDuty?.platform);
      state.onDuty = { ...payload.onDuty };
    },
    MAXPAGE: (state, data) => {
      if (typeof data.payload === "number") {
        state.maxPage = data.payload;
        localStorage.setItem("maxPage", data.payload);
      } else {
        if (data.payload) {
          if (state.maxPage < 50) {
            state.maxPage += 1;
            localStorage.setItem("maxPage", state.maxPage);
          } else {
            toast.warn("Maximum we can go is 50 items per page.");
          }
        } else {
          if (state.maxPage > 1) {
            state.maxPage -= 1;
            localStorage.setItem("maxPage", state.maxPage);
          } else {
            toast.warn("Minimum we can go is 1 item per page.");
          }
        }
      }
    },
    ACTIVEDUTY: (state, { payload }) => {
      state.onDuty = payload;
    },
    TOKEN: (state, { payload }) => {
      localStorage.setItem("token", payload);
      state.token = payload;
    },
    PROGRESS: (state, { payload }) => {
      state.progress = payload;
    },
    RESET: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(LOGIN.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LOGIN.fulfilled, (state, action) => {
        const { auth, token, branches, isCeo, access } = action.payload;
        state.auth = auth;
        const filter = access.filter(
          (data) => data === "manager" || data === "medtech" || data === "owner"
        );

        const cart = JSON.parse(localStorage.getItem(`${state.auth._id}`));
        socket.emit("recived_cart", filter.length ? filter[0] : cart);
        //para malaman kung pwede ba siyang mag approve sa mga request
        state.access = filter[0] ? filter[0] : "";
        let _branches = [...branches];

        if (isCeo) {
          let _lastVisited = JSON.parse(localStorage.getItem("lastVisited"));
          if (!_lastVisited) {
            const { _id, platform } = branches.find(({ isMain }) => isMain);
            _lastVisited = {
              id: _id,
              platform,
            };
            localStorage.setItem("lastVisited", JSON.stringify(_lastVisited));
          }
          _branches = branches.map(
            ({
              _id,
              companyId,
              isMain,
              designation,
              name,
              platform,
              company,
              status,
            }) => ({
              _id,
              companyId,
              isMain,
              lastVisit: _lastVisited.id === _id,
              designation,
              name,
              platform:
                _lastVisited.id === _id ? _lastVisited.platform : platform,
              company,
              status,
            })
          );
        }

        state.branches = [..._branches];
        const onDuty = _branches.find(({ lastVisit }) => lastVisit);
        if (onDuty) {
          state.onDuty = onDuty;
        } else {
          state.onDuty = !!_branches?.length ? _branches[0] : defaultDuty;
        }
        state.isCeo = isCeo;
        state.token = token;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(LOGIN.rejected, (state, action) => {
        state.isLoading = false;
      })

      // VALIDATE USER ON REFRESH
      .addCase(REFRESH.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(REFRESH.fulfilled, (state, { payload }) => {
        const { auth, token, branches, isCeo, access } = payload;

        state.auth = auth;
        const filter = access.filter(
          (data) => data === "manager" || data === "medtech" || data === "owner"
        );
        const cart = JSON.parse(localStorage.getItem(`${state.auth._id}`));
        socket.emit("recived_cart", filter.length ? filter[0] : cart);
        state.access = filter[0] ? filter[0] : "";
        let _branches = [];
        let _lastVisited = JSON.parse(localStorage.getItem("lastVisited"));

        if (!_lastVisited) {
          if (isCeo) {
            const { _id, platform } = branches.find(({ isMain }) => isMain);
            _lastVisited = {
              id: _id,
              platform,
            };
          } else {
            _lastVisited = {
              _id: branches[0]._id,
              platform: branches[0].platform,
            };
          }
        }
        _branches = branches.map(
          ({
            _id,
            companyId,
            isMain,
            designation,
            name,
            platform,
            company,
            status,
          }) => ({
            _id,
            companyId,
            isMain,
            lastVisit: _lastVisited.id === _id,
            designation,
            name,
            platform:
              _lastVisited.id === _id ? _lastVisited.platform : platform,
            company,
            status,
          })
        );

        state.branches = [..._branches];
        const onDuty = _branches.find(({ lastVisit }) => lastVisit);
        if (onDuty) {
          state.onDuty = onDuty;
        } else {
          state.onDuty = !!_branches?.length ? _branches[0] : defaultDuty;
        }
        state.isCeo = isCeo;
        state.token = token;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(REFRESH.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(LOGOUT.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LOGOUT.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2500);
      })
      .addCase(LOGOUT.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(ATTENDANCE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ATTENDANCE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendances = action.payload.attendances;
        state.rate = action.payload.rate;
      })
      .addCase(ATTENDANCE.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(UPDATE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.auth = action.payload;
      })
      .addCase(UPDATE.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ACTIVEPLATFORM.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ACTIVEPLATFORM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.onDuty.platform = action.meta.arg.platform;
      })
      .addCase(ACTIVEPLATFORM.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(CHANGEPASSWORD.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CHANGEPASSWORD.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(CHANGEPASSWORD.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(UPLOAD.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPLOAD.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(UPLOAD.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { THEME, PROGRESS, MAXPAGE, RESET, ACTIVEDUTY, TOKEN, DUTY } =
  authSlice.actions;

export default authSlice.reducer;
