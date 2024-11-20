import React from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { completeLesson } from "../../store/slice/userActions";
import { setLessonWindow } from "../../store/slice/userSlice";

const mockData ={
  "id": 10,
  "title": "firstCourse",
  "itemType": "video",
  "itemOrder": 8,
  "moduleId": 1,
  "fileName": "funny small video",
  "fileType": "mpg4",
  "linkToVideo": "/video/9b3196b7-e7c0-44c4-af8f-26963f41edc9.mp4"
}

function VideoPlayer({ src }) {
  const dispatch = useDispatch();
  const { currentProgress } = useSelector(state => state.user);
  const { userToken } = useSelector(state => state.auth);

  const playerConfig = {
    file: {
      attributes: {
        controlsList: "nodownload",
      },
    },
  };

  const handleVideoEnd = () => {
    dispatch(completeLesson({lessonId: currentProgress.nextLessonId, userToken: userToken}))
    dispatch(setLessonWindow(false));
  };

  return (
    <div>
      <ReactPlayer
        url={src}
        controls={true}
        width="100%"
        height="600px"
        config={playerConfig}
        onEnded={handleVideoEnd}
      ></ReactPlayer>
    </div>
  );
}

export default VideoPlayer;
