// Import necessary modules (e.g., axios)

import axios from "axios";

export interface RegisterData {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }


  export interface LoginData {
    email: string;
    password: string;
  }

  
  
  export async function register(userData: RegisterData) {
    console.log(userData)
    try {
      const response = await axios.post('http://localhost:4300/api/user/register', {
        user: userData,
      });
      return response.data.user;
    } catch (error:any) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
  }

  export async function login(userData: LoginData) {
    console.log(userData)
    try {
      const response = await axios.post('http://localhost:4300/api/user/login', {
        user: userData,
      });
      return response.data;
    } catch (error:any) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
  