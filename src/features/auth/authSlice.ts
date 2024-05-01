// authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register as registerUser, login as loginUser , RegisterData, LoginData} from '../../services/authService';

interface User  {
  id: string,
  username: string,
  password: string
  firstname: string,
  lastname: string,
  email: string,
  role: string,
  isEmailVerified: string,
  accountStatus: string,
  createdAt: string,
  updatedAt: string,
};
  


interface AuthState {
  isloading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isloading: false,
  isAuthenticated: false,
  user: null,
  error:null,
  token: null,
};

// Create async thunk for registering a user
export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, thunkAPI) => {
    try {
      const user = await registerUser(userData);
      return user;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, thunkAPI) => {
    try {
      const user = await loginUser(userData);
      return user;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.isloading = true;
      state.error = null;
    }).addCase(register.fulfilled, (state, action) => {
      state.isloading = false;
      state.user = action.payload;
    }).addCase(register.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload as string;
    }).addCase(login.pending, state => {
      state.isloading = true;
      state.error = null;
    }).addCase(login.fulfilled, (state, action) => {
      state.isloading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    }).addCase(login.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
