import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendUrl = process.env.REACT_APP_BACKEND_URL;

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null




export const getUserData = createAsyncThunk(
    '/api/user/light-profile',
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendUrl}/api/user/light-profile`,
                config
            )
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

export const updateUserInfo = createAsyncThunk('/api/user/info/update',
async ({newData, userToken}, { rejectWithValue }) => {
    //console.log(userToken);
    try {
        // configure header's Content-Type as JSON
        const config = { headers: { Authorization: `Bearer ${userToken}`}};
      const { data } = await axios.post(
        `${backendUrl}/api/user/info/update`,
        newData , 
        config
      )
    //   console.log("USER UPDATED");
    //   console.log("NEW USER DATA", data);
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

export const updateUserImage = createAsyncThunk('/api/user/info/updateImage',
async ({newImage, userToken}, { rejectWithValue }) => {
    //console.log("usfjs", newImage);
    try {
        // configure header's Content-Type as JSON
        const config = { headers: { Authorization: `Bearer ${userToken}`}};
      const { data } = await axios.post(
        `${backendUrl}/api/user/info/updateImage`,
        newImage , 
        config
      )
      //console.log("USER UPDATED");
      //console.log("NEW USER DATA", data);
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

// export const updateUserAvatar = createAsyncThunk('/api/user/info/update',
// async (newAvatarId, { rejectWithValue }) => {
//     try {
//         // configure header's Content-Type as JSON
//         const config = { headers: { Authorization: `Bearer ${userToken}`}};
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/info/update`,
//         newAvatarId , 
//         config
//       )
//       console.log("USER UPDATED");
//       console.log("NEW USER DATA", data);
//       return data
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

export const startNewCourse = createAsyncThunk(
    "/api/user/course/start/",
    async ({courseId, userToken}, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendUrl}/api/user/course/start/${courseId}`,
                config
            )
            //console.log("Course progress data for game!!", data);
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

export const startLesson = createAsyncThunk(
  "/api/user/start-lesson/",
  async ({lessonId, userToken}, { rejectWithValue }) => {
      try {
          // configure header's Content-Type as JSON
          const config = {
              headers: {
                  'Authorization': `Bearer ${userToken}`,
              },
          }
          const { data } = await axios.get(
              `${backendUrl}/api/user/start-lesson/${lessonId}`,
              config
          )
          //console.log("Lesson data for game!", data);
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

export const completeLesson = createAsyncThunk(
  "/api/user/complete-lesson/",
  async ({lessonId, userToken}, { rejectWithValue }) => {
      try {
          // configure header's Content-Type as JSON
          const config = {
              headers: {
                  'Authorization': `Bearer ${userToken}`,
              },
          }
          const { data } = await axios.post(
              `${backendUrl}/api/user/complete-lesson/${lessonId}`,
              {},
              config
          )
          //console.log("Lesson completed!!", data);
          return data

      } catch (error) {
          // return custom error message from API if any
          if (error.response && error.response.data.message) {
            console.log(error.response.data.message);
              return rejectWithValue(error.response.data.message)
              
          } else {
            //console.log(error.message);
              return rejectWithValue(error.message)

          }
      }
  }
)

export const purchaseBasic = createAsyncThunk(
    "/v1/checkout/sessions/basic",
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.post(
                `${backendUrl}/v1/checkout/sessions/basic`,
                {},
                config
            )
            return data
  
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
              console.log(error.response.data.message);
                return rejectWithValue(error.response.data.message)
                
            } else {
              //console.log(error.message);
                return rejectWithValue(error.message)
  
            }
        }
    }
  )

  export const purchasePro = createAsyncThunk(
    "/v1/checkout/sessions/pro",
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.post(
                `${backendUrl}/v1/checkout/sessions/pro`,
                {},
                config
            )
            console.log(data);
            return data
            
  
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
              console.log(error.response.data.message);
                return rejectWithValue(error.response.data.message)
                
            } else {
              //console.log(error.message);
                return rejectWithValue(error.message)
  
            }
        }
    }
  )

  export const purchaseEnterprise = createAsyncThunk(
    "/v1/checkout/sessions/enterprise",
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.post(
                `${backendUrl}/v1/checkout/sessions/enterprise`,
                {},
                config
            )
            return data
  
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
              console.log(error.response.data.message);
                return rejectWithValue(error.response.data.message)
                
            } else {
              //console.log(error.message);
                return rejectWithValue(error.message)
  
            }
        }
    }
  )