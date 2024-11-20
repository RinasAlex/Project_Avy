import React, { useEffect, useState } from "react";
import s from "./FileLoader.module.css";

export default function FileLoader({ value, name, setFieldValue, reset, handleReset }) {
  const [uploadedFileName, setUploadedFileName] = useState(
    value ? value.name : ""
  );

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    setFieldValue(name, file); // Form value update
    setUploadedFileName(file ? file.name : ""); // Initializing/updating file name
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    setFieldValue(name, droppedFile); // Form value update
    setUploadedFileName(droppedFile ? droppedFile.name : ""); // Initializing/updating file name
  };

  // useEffect(() => {
  //   if (reset) {
  //     setFieldValue(name, "")
  //     setUploadedFileName('');
  //   }
  // }, [reset, setFieldValue, setUploadedFileName, name]);

  return (
    <div
      className={s.fileLoaderContainer}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.9988 51.9961H17.9988C16.0134 51.9942 14.0511 51.57 12.2422 50.7517C10.4333 49.9334 8.8191 48.7397 7.50679 47.2498C6.19447 45.7599 5.21406 44.008 4.63061 42.1102C4.04716 40.2125 3.87403 38.2124 4.1227 36.2426C4.37137 34.2728 5.03616 32.3785 6.07295 30.6853C7.10973 28.9921 8.49479 27.5388 10.1362 26.4218C11.7776 25.3048 13.6378 24.5497 15.5934 24.2067C17.5489 23.8636 19.5551 23.9404 21.4787 24.432"
          stroke="#B0B7BA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.9987 31.9961C19.999 28.8272 20.7523 25.7037 22.1965 22.883C23.6408 20.0623 25.7346 17.6252 28.3054 15.7725C30.8763 13.9198 33.8506 12.7044 36.9833 12.2267C40.116 11.7489 43.3174 12.0224 46.3237 13.0245C49.3299 14.0267 52.055 15.7289 54.2744 17.9908C56.4938 20.2528 58.1439 23.0097 59.0888 26.0344C60.0338 29.0592 60.2464 32.2652 59.7092 35.3883C59.1721 38.5113 57.9005 41.462 55.9993 43.9972"
          stroke="#B0B7BA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.5132 40.4815L37.9984 31.996L46.4837 40.4815"
          stroke="#B0B7BA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37.9987 51.9961V31.9961"
          stroke="#B0B7BA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className={s.fileLoaderTitle}>Upload new file or folder</p>
      <div className={s.fileLoaderInputText}>
        <p>Drag and drop a file or</p>
        <label htmlFor={name} className={s.dropAreaInputText}>
          browse file
        </label>
        <input
          className={s.fileLoaderInput}
          type="file"
          name={name}
          onChange={handleFileChange}
          id={name}
        />
      </div>
      <p className={s.loadedFileName}>
        {uploadedFileName && `Uploaded File: ${uploadedFileName}`}
      </p>
    </div>
  );
}
