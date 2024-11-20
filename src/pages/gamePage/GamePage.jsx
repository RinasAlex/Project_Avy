import React, { useEffect, useState } from "react";
import s from "./GamePage.module.css";
import { Canvas} from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

// Scene elements
import SkyBox from "../../gameElements/SkyBox";
import SceneLights from "../../gameElements/SceneLight";
import Game from "../../gameElements/Game";
import VideoPlayer from "../../widgets/videoPlayer/VideoPlayer";
import ProgressCard from "../../widgets/progressCard/ProgressCard";
import { useDispatch, useSelector } from "react-redux";
import { renderModalWindow } from "../../helpers/renderModal";
import GameQuiz from "../../widgets/gameQuiz/GameQuiz";
import SortGame from "../../widgets/sortGame/SortGame";
import ConstructaWord from "../../widgets/gameFindWord/ConstructaWord";
import { TextLoad } from "../../helpers/textLoad";
import CourseSelector from "../../widgets/courseSelector/CourseSelector";
import { getUserProgressingCourses } from "../../store/slice/courseActions";
import { setCredentials, setLessonWindow } from "../../store/slice/userSlice";
import { useGetUserDetailsQuery } from "../../services/authService";

const POLLING_INTERVAL = 1800000;

export default function GamePage() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: POLLING_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const handleCloseModal = () => {
    dispatch(setLessonWindow(false))
    setIsModalOpen(false)
  };

  let [content, setContent] = useState(null);
  const { lessonWindow, currentLesson, currentProgress } = useSelector(
    (state) => state.user
  );
  const { courseList } = useSelector(
    (state) => state.course
  );

  if (!courseList) {
    dispatch(getUserProgressingCourses(userToken))
  }

  // Canvas render control
  const [frameloop, setFrameloop] = useState('always')

  useEffect(() => {
    let newContent = null;
    if (lessonWindow && currentLesson) {
      switch (currentLesson.itemType) {
        case "quiz":
          newContent =
            currentLesson.quizType === 1 ? (
              <GameQuiz quizData={currentLesson.quizData} />
            ) : currentLesson.quizType === 2 ? (
              <SortGame quizData={currentLesson.quizData} />
            ) : (
              <ConstructaWord quizData={currentLesson.quizData} />
            );
          break;
        default:
          newContent = (
            <VideoPlayer
              src={
                process.env.REACT_APP_MEDIA_SERVER_URL +
                currentLesson.linkToVideo
              }
            />
          );
      }
      setContent(newContent);
      setFrameloop("never")
    }

  }, [lessonWindow, currentLesson]);

  useEffect(() => {
    if (lessonWindow && content !== null) {
      setIsAnimationActive(false);
    } else {
      setContent(null);
      setIsAnimationActive(true);
    }
  }, [lessonWindow, content]);

  const [playerApproach, setPlayerApproach] = useState(0);
  const [helpButton, setHelpButton] = useState(false)

  return (
    <>{
      currentProgress ?
        <div>
          <div>
            <Loader />

            <Canvas
              id="mainCanvas"
              shadows
              style={{
                width: "77vw",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
              }}
              frameloop={frameloop}
              onClick={() => setFrameloop('always')}
              onPointerOut={() => setFrameloop('never')}
              onPointerDown={(e) => lessonWindow ? null : e.target.requestPointerLock()}
            >
              <Suspense fallback={null}>
                <SceneLights />
                <SkyBox />
                <Physics>
                  <Game playerApproach={playerApproach} setPlayerApproach={setPlayerApproach} setHelpButton={setHelpButton} />
                </Physics>
              </Suspense>
            </Canvas>
            {<TextLoad playerApproach={playerApproach} helpButton={helpButton} />}
          </div>

          {currentProgress &&
            renderModalWindow(<ProgressCard />, isModalOpen, handleCloseModal)}

          {content !== null
            ? renderModalWindow(content, lessonWindow, handleCloseModal)
            : null}
        </div>
        : <CourseSelector />
    } </>
  );
}
