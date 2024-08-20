import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import FileList from "./FileList";
import "./classes.css";

const fileTypes = ["XLX", "XLSX", "XLS"];

function UploadBox({handleConvert}) {
  const [files, setFiles] = useState([]);

  const handleChange = (uploadedFiles) => {
    setFiles(uploadedFiles)
  };

  const handleClick = (e) => {
    e.preventDefault();

    handleConvert(files)
  };

  useEffect(() => {}, [files]);

  return (
    <>
      <form name="converter">
        <FileUploader
          handleChange={handleChange}
          name="converter"
          types={fileTypes}
          label="Taro 1 file di sini"
          classes="custom-border"
        />
        <button
          type="submit"
          onClick={(e) => handleClick(e)}
          className="button"
        >
          Convert
        </button>
      </form>
    </>
  );
}

export default UploadBox;
