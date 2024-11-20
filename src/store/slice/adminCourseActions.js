import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const userToken = localStorage.getItem('userToken')

// configure header's Content-Type as JSON
//const config = { headers: { Authorization: `Bearer ${userToken}`}};


export const getAllCourses = createAsyncThunk('/api/admin/course/get-all-courses ',
async ( userToken,{ rejectWithValue }) => {
  //console.log("Token ", userToken);
  const configa = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/get-all-courses`,
        configa
      )
      //console.log("All courses list from backend", data);
      return data
      
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        //console.log(error);
        return rejectWithValue(error.response.data.message)
      } else {
        //console.log(error);
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getCourseInfo = createAsyncThunk('/api/admin/course/get-full-course',
async ({courseId, userToken}, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/get-full-course/${courseId}`,
        config
      )
      // console.log("GOT COURSE INFO FROM BACKEND!! TYPE OF DATA =", typeof(data));
      // console.log("COURSE", data);
      // console.log("updating course...");
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

export const createCourse = createAsyncThunk('/api/admin/course/create-course',
async ({formData, userToken}, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/course/create-course`,
        formData , 
        config
      )
      // console.log("COURSE CREATED");
      // console.log("TYPE OF data from BACKEND after request", typeof(data));
      // console.log("COURSE", data);
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

export const createModule = createAsyncThunk('/api/admin/module/create-module',
async ({courseId, newModule, userToken}, { dispatch, rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/module/create-module`,
        newModule , 
        config
      )
      // console.log("MODULE CREATED", data);
      // console.log("MODULE!! TYPE OF DATA =", typeof(data));
      dispatch(getCourseInfo({courseId, userToken}))
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

export const createLesson = createAsyncThunk('/api/admin/lesson/create-lesson',

async ({courseId, newLesson, userToken}, { dispatch, rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/lesson/create-lesson`,
        newLesson, 
        config
      )
      // console.log("LESSON CREATED!");
      // console.log("TYPE OF data from BACKEND after request", typeof(data));
      // console.log("updating course...");
      dispatch(getCourseInfo({courseId, userToken}))
     
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


export const updateCourse = createAsyncThunk('/api/admin/update-course',
async ({ courseId, courseInfo }, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-course`,
        { courseId, courseInfo },
        config
      )
    
      //console.log(data);
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

export const deleteCourse = createAsyncThunk('/api/admin/delete-course',
async ({ courseId }, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/delete-course`,
        { courseId },
        config
      )
    
      //console.log(data);
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

// const data = [
//   { 
//     "id": 1, 
//     "title": "Project Management", 
//     "description": "Project management has been proven to be the most effective method of delivering products within cost, schedule, and resource constraints. It is an essential skill in the modern digital constantly changing world. ", 
//     "courseImage": "/images/3a791eaf-e56f-44ac-ada7-83b6e981cd9a.png", 
//     "category": "Development", 
//     "level": "Advanced", 
//     "status": null, 
//     "creationDate": "2023-12-19", 
//     "lastUpdateDate": null, 
//     "modules": [
//       { 
//         "id": 1, 
//         "title": "Initiating and Planning Projects", 
//         "description": "Initiating and Planning Projects", 
//         "moduleOrder": 0, 
//         "courseId": 1, 
//         "items": [
//           { 
//             "id": 1, 
//             "title": "Identify project stakeholders", 
//             "itemType": "video", "itemOrder": 0, 
//             "moduleId": 1, 
//             "fileName": "Recording 2023-04-28 214950.mp4", 
//             "fileType": "video/mp4", "linkToVideo": "/video/02a0a66d-c145-4247-9458-3a8794b74d69.mp4" 
//           }, 
//           { 
//             "id": 2, 
//             "title": "Quiz", 
//             "itemType": "quiz", 
//             "itemOrder": 1, 
//             "moduleId": 1, 
//             "quizType": 1, 
//             "quizData": [object Object] }] }], 
//             "participants": [] 
//   }
// ]