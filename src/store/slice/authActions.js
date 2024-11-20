import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const userLogin = createAsyncThunk(
    '/api/auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          { login: email, password: password },
          config
        )

        // store user's token in local storage
        localStorage.setItem('userToken', data.accessToken)
        return data
        
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const registerUser = createAsyncThunk(
    '/api/auth/register',
    async ({ firstName, email, password, roleName }, { rejectWithValue }) => {
      try {
        //console.log("Data", { firstName, email, password, roleName });
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        await axios.post(
          `${backendUrl}/api/auth/register`,
          { firstName, email, password, roleName },
          config
        )
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


