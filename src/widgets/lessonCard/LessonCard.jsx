import React from 'react'
import s from './LessonCard.module.css'
import IconButton from '../../ui/iconButton/IconButton'
import temporaryImage from '../../assets/images/AVY-transparent-PNG.png'

const mockData = {
  "id": 1,
  "title": "React Fundamentals",
  "description": "In this first module, we introduce React, and build a common understanding we'll use throughout the course.",
  "moduleOrder": 0,
  "courseId": 1,
  "items": [
      {
          "id": 1,
          "title": "We'll learn all about JSX, components, and props.",
          "itemType": "video",
          "itemOrder": 0,
          "moduleId": 1,
          "fileName": "Recording 2023-04-28 214950.mp4",
          "fileType": "video/mp4",
          "linkToVideo": "/video/425a4d2b-13a0-4eca-a692-75669dfec8a7.mp4"
      }
  ]
}

export default function LessonCard({ id, title, itemType, image }) {
  return (
    <div className={s.lessonCardWrapper}>
        <div className={s.lessonCardHeader}>
            <p>Lesson: {title}</p>
            <div className={s.actionBtns}>
                <IconButton icon={"delete"} />
                <IconButton icon={"edit"} />
            </div>
        </div>
        <div className={s.lessonCardcontent}>
            <p>The lesson type is {itemType}</p>
            <img src={temporaryImage} alt="" />
        </div>
    </div>
  )
}
