import { createSlice } from "@reduxjs/toolkit";
import { completeLesson, getUserData, purchaseBasic, purchaseEnterprise, purchasePro, startLesson, startNewCourse, updateUserImage, updateUserInfo } from "./userActions";

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    error: null,
    success: false, // for monitoring the registration process.
    userLoaded: false,
    currentProgress: null,
    currentAvatar: null,
    currentPosition: null,
    currentLesson: null,
    lessonWindow: false,
    visitedCharsArray:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    purchased: false,
    demo: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
        state.userInfo = {...payload}
        state.userLoaded = true
    },
    setUserPosition: (state, { payload }) => {
      state.currentPosition = [...payload]
    },
    setLessonWindow: (state, { payload }) => {
      //console.log("LESSON MODAL STATE: ", payload);
      state.lessonWindow = payload
    },
    addVisitedChar: (state, {payload}) => {
      if (payload > 9) {
        state.visitedCharsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
      state.visitedCharsArray[payload] = payload
    },
    setShowHelperText: (state, { payload }) => {
      state.showHelperText = payload
    },
    requestDemo: (state, { payload }) => {
      state.currentProgress = null
      state.demo = true
    },
  },
  extraReducers: {
    // User data
    [getUserData.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [getUserData.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.userInfo = {...payload, avatarId: payload.avatarId === 0 ? 4 : payload.avatarId}
        state.success = true 
      },
      [getUserData.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      //Update User Data
      [updateUserInfo.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [updateUserInfo.fulfilled]: (state, { payload }) => {
        
        state.loading = false
        // temporary 
        state.userInfo = {
          ...state.userInfo, 
          lastName: payload.lastName,
          firstName: payload.firstName,
          avatarId: payload.avatarId === 0 ? 4 : payload.avatarId,
          linkToImage: payload.linkToImage,
          userName: payload.userName,
          coins: payload.coins,
          achievements: payload.achievements,
          userJob: payload.userJob,
          userLinkedIn: payload.userLinkedIn,
          awards: payload.awards
        }
        state.success = true 
      },
      [updateUserInfo.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      //Update User Image
      [updateUserImage.pending]: (state) => {
        state.loading = true
        state.error = null
        state.userLoaded = false
      },
      [updateUserImage.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.userInfo = {
          ...state.userInfo, 
          lastName: payload.lastName,
          firstName: payload.firstName,
          avatarId: payload.avatarId,
          linkToImage: payload.linkToImage,
          userName: payload.userName,
          coins: payload.coins,
          achievements: payload.achievements,
          userJob: payload.userJob,
          userLinkedIn: payload.userLinkedIn,
          awards: payload.awards
        }
        state.userLoaded = true 
      },
      [updateUserImage.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      // [updateUserAvatar.pending]: (state) => {
      //   state.loading = true
      //   state.error = null
      // },
      // [updateUserAvatar.fulfilled]: (state, { payload }) => {
      //   state.loading = false
      //   // temporary 
      //   state.userInfo = {
      //     ...state.userInfo,
      //     avatarId: payload.avatarId,
      //   }
      //   state.success = true 
      // },
      // [updateUserAvatar.rejected]: (state, { payload }) => {
      //   state.loading = false
      //   state.success = false 
      //   state.error = payload
      // },
      // Courses current
      [startNewCourse.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [startNewCourse.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.currentProgress = {...payload}
        state.success = true 
      },
      [startNewCourse.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      [startLesson.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [startLesson.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.currentLesson = {...payload}
        state.success = true 
      },
      [startLesson.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      [completeLesson.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [completeLesson.fulfilled]: (state, { payload }) => {
      //   {
      //     "id": 11,
      //     "userId": 5,
      //     "courseId": 2,
      //     "progress": 100,
      //     "status": "COMPLETED",
      //     "lastAccessed": "2024-01-21",
      //     "nextLessonId": 3,
      //     "userAchievements": [
      //         {
      //             "id": 1,
      //             "userId": 5,
      //             "description": "it",
      //             "dateEarned": "2024-01-20"
      //         },
      //         {
      //             "id": 2,
      //             "userId": 5,
      //             "description": "it",
      //             "dateEarned": "2024-01-21"
      //         }
      //     ],
      //     "userAwards": [
      //         {
      //             "id": 1,
      //             "userId": 5,
      //             "type": "GOLD",
      //             "description": "Test from course Test",
      //             "dateEarned": "2024-01-20"
      //         },
      //         {
      //             "id": 2,
      //             "userId": 5,
      //             "type": "GOLD",
      //             "description": "Skill-based, hands-on learning from course Build a free website with WordPress",
      //             "dateEarned": "2024-01-21"
      //         }
      //     ],
      //     "currentModuleAward": {
      //         "id": 2,
      //         "userId": 5,
      //         "type": "GOLD",
      //         "description": "Skill-based, hands-on learning from course Build a free website with WordPress",
      //         "dateEarned": "2024-01-21"
      //     },
      //     "userCoins": 20,
      //     "nextModuleTitle": "Skill-based, hands-on learning",
      //     "completedModuleTitle": "Skill-based, hands-on learning",
      //     "nextLessonTitle": "ConstructaWord Quest",
      //     "moduleCompleted": true
      // }
        state.loading = false
        state.currentProgress = {...state.currentProgress, ...payload}
        //console.log(state.currentProgress);
        state.lessonWindow = false
        state.currentLesson = null
        state.success = true 
      },
      [completeLesson.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      [purchaseBasic.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [purchaseBasic.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.purchased = true
      },
      [purchaseBasic.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      [purchasePro.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [purchasePro.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.purchased = true
      },
      [purchasePro.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
      [purchaseEnterprise.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [purchaseEnterprise.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.purchased = true
      },
      [purchaseEnterprise.rejected]: (state, { payload }) => {
        state.loading = false
        state.success = false 
        state.error = payload
      },
  }
});

export const { setMap, setCredentials, setUserPosition, setLessonWindow, addVisitedChar, requestDemo } = userSlice.actions;
export default userSlice.reducer;


// WILL IMPLEMENT LATER

// import { createSlice } from "@reduxjs/toolkit";

// const initialNotes = {
//   "Wed Nov 15 2023": ["Do module 5", "Prepare for exam"],
//   "Mon Nov 20 2023": ["Do module 7", "Meeting with professor"],
// };
// const notesSlice = createSlice({
//   name: "notes",
//   initialState: initialNotes,
//   reducers: {
//     addNote: (state, action) => {
//       const { date, note } = action.payload;
//       state[date] = date in state ? [...state[date], note] : [note];
//     },
//     deleteNote: (state, action) => {
//       const { date, index } = action.payload;
//       state[date] = index >= 0 ? state[date].filter((_, i) => i !== index) : [];
//     },
//   },
// });

// export const { addNote, deleteNote } = notesSlice.actions;
// export default notesSlice.reducer;