import React, { useEffect, useState } from "react";
import s from "./ModuleCard.module.css";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import ToggleButton from "../../ui/toggleButton/ToggleButton";
import AddLessonForm from "../addLessonForm/AddLessonForm";
import ModalWindow from "../modalWindow/ModalWindow";
import LessonCard from "../lessonCard/LessonCard";
import { useDispatch, useSelector } from "react-redux";
import QuizSelector from "../quizSelector/QuizSelector";

export default function ModuleCard({ id, title, description }) {
  const dispatch = useDispatch();
  const { courseInfo, courseLoaded, moduleUpdated } = useSelector(
    (state) => state.adminCourse
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRolledUp, setIsRolledUp] = useState(false);
  const handleToggle = () => setIsRolledUp(!isRolledUp);
  const [activeComponent, setActiveComponent] = useState(null);

  const openModalWithComponent = (component) => {
    setActiveComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveComponent(null);
  };
  

  // useEffect(() => {
  //   console.log("query data",courseInfo);
  // }, [courseInfo])

  const currentModule = courseInfo.modules.find(item => item.id === id);

  return (
    <div className={s.moduleCardWrapper}>
      <div className={s.moduleCardHeader}>
        <p>Module:{ title }</p>
        <ToggleButton isToggle={isRolledUp} onClick={handleToggle}/>
      </div>
      <div className={isRolledUp ? s.rollDown : ""}>
        <div className={s.moduleCardInfo}>
          <div>
            <p>Title</p>
            <p className={s.textBoard}>{title}</p>
          </div>
          <div>
            <p>Description</p>
            <p className={s.textBoard}>{description}</p>
          </div>
        </div>
        <div className={s.lessonCardsWrapper}>
          {currentModule ? currentModule.items.map(item => (<LessonCard key={item.id} {...item}/>)) : null}
        </div>
        <div className={s.btns}>
          <OutlinedButton label={"Add Lesson"} onClick={() => openModalWithComponent('AddLessonForm')}/>
          <OutlinedButton label={"Add Quiz"} onClick={() => openModalWithComponent('QuizSelector')}/>
        </div>
      </div>
      <ModalWindow
        title={activeComponent === 'AddLessonForm' ? 'Create Lesson' : 'Select Quiz'}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {activeComponent === 'QuizSelector' && <QuizSelector moduleId={id}/>}
        {activeComponent === 'AddLessonForm' && (
          <AddLessonForm setModal={closeModal} moduleId={id} courseId={courseInfo.id} />
        )}
      </ModalWindow>
    </div>
  );
}
