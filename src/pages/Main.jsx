import React, { useEffect, useState } from "react";
import UploadBox from "../components/upload/UploadBox";
import readExcel from "../utils/converter";
import XmlArea from "../components/xml/XmlArea";

function Main() {
  const [xml, setXml] = useState("");
  const handleConvert = (uploaded) => {
    readExcel(uploaded, (e) => {
      setXml(e);
    });
  };

  useEffect(() => {}, [xml]);

  return (
    <div>
    <h2>Excel to XML converter</h2>
      <UploadBox handleConvert={handleConvert} />
      <XmlArea generated={xml} />
    </div>
  );
}

export default Main;
