import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Converter from "../../utils/converter";
import "./classes.css";

const fileTypes = ["XLX", "XLSX", "XLS"];

function UploadBox({ handleXMLResult }) {
  const [files, setFiles] = useState([]);

  const handleChange = (uploadedFiles) => {
    console.log("Uploaded Files:", uploadedFiles); // Debugging log
    if (uploadedFiles instanceof FileList) {
      setFiles(Array.from(uploadedFiles));
    } else {
      setFiles([uploadedFiles]);
    }
  };

  const handleConvert = (files) => {
    if (files.length > 0) {
      const file = files[0];
      console.log("Selected File:", file);
      const converter = new Converter(file);

      converter.convert((xmlData) => {

        if (handleXMLResult) {
          handleXMLResult(xmlData);
        }
      });
    } else {
      console.log("No file selected.");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleConvert(files);
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
        <button type="submit" onClick={handleClick} className="button">
          Convert
        </button>
      </form>
    </>
  );
}

export default UploadBox;
