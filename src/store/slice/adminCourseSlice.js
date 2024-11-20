import { createSlice } from "@reduxjs/toolkit";
import { createCourse, createLesson, createModule, getAllCourses, getCourseInfo } from "./adminCourseActions";

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null

const initialState = {
  loading: false,
  allCourses: null, // for list of courses created by admin
  courseInfo: {}, // for course object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  courseLoaded: false,
  moduleUpdated: false,
  lessonUpdated: false
}

const adminCourseSlice = createSlice({
  name: "adminCourse",
  initialState,
  reducers: {
    setCourseData: (state, { payload }) => {
      state.courseInfo = { ...payload }
    },
    sortByModule(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.modules.length - b.modules.length);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.modules.length - a.modules.length);
      }
    },
    sortByPrice(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.price - b.price);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.price - a.price);
      }
    },
    sortById(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.id - b.id);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.id - a.id);
      }
    },
    deleteCourse(state, { payload }) {
      state.allCourses = state.allCourses.filter((elem) => elem.id !== payload);
    },
    searchByTitle(state, { payload }) {
      if (state.allCourses) {
        state.allCourses = state.allCourses.filter((course) =>
        course.title.toLowerCase().includes(payload.toLowerCase())
      );
      }
      
    },
  },
  extraReducers: {
    [getAllCourses.pending]: (state) => {
      state.loading = true

    },
    [getAllCourses.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.allCourses = [...payload]
    },
    [getAllCourses.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = {...payload}
    },

    [getCourseInfo.pending]: (state) => {
      state.loading = true

    },
    [getCourseInfo.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.courseInfo = {...payload}
    },
    [getCourseInfo.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createCourse.pending]: (state) => {
      state.loading = true
    },
    [createCourse.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.courseInfo = payload
      state.courseLoaded = true
      state.success = true
    },
    [createCourse.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createModule.pending]: (state) => {
      state.loading = true

    },
    [createModule.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.moduleUpdated = true
    },
    [createModule.rejected]: (state, { payload }) => {
      state.error = payload
    },

    [createLesson.pending]: (state) => {
      state.loading = true

    },
    [createLesson.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lessonUpdated = true
    },
    [createLesson.rejected]: (state, { payload }) => {
      state.error = payload
    },
  }
})

export const { setCourseData, searchByTitle, sortById, sortByModule, sortByPrice } = adminCourseSlice.actions
export default adminCourseSlice.reducer