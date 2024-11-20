import React from "react";
import s from "./CourseCreationPage.module.css";
import AddCourseForm from "../../../widgets/addCourseForm/AddCourseForm";
import { useSelector } from "react-redux";
import ModuleCard from "../../../widgets/moduleCard/ModuleCard";

export default function CourseCreationPage() {
  const { courseInfo, courseLoaded, moduleUpdated, lessonUpdated } = useSelector(
    (state) => state.adminCourse
  );
  return (
    <div className={s.pageWrapper}>
      <AddCourseForm />
      <div className={s.moduleSection}>
        <div className={s.modulesWrapper}>
          {courseInfo.modules
            ? courseInfo.modules.map((item, index) => {
                return index % 2 === 0 ? (
                  <ModuleCard key={item.id} {...item} />
                ) : null;
              })
            : null}
        </div>
        <div className={s.modulesWrapper}>
          {courseInfo.modules
            ? courseInfo.modules.map((item, index) => {
                return index % 2 !== 0 ? (
                  <ModuleCard key={item.id} {...item} />
                ) : null;
              })
            : null}
        </div>
      </div>
    </div>
  );
}
