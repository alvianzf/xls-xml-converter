import React, { useEffect, useState } from "react";
import UploadBox from "../components/upload/UploadBox";
import readExcel from "../utils/converter";
import XmlArea from "../components/xml/XmlArea";

function Main() {
  const [xml, setXml] = useState("");

  const handleXMLResult = (uploaded) => {
    setXml(uploaded);
  };

  useEffect(() => {}, [xml]);

  return (
    <div>
      <h2>Excel to XML converter</h2>
      <UploadBox handleXMLResult={handleXMLResult} />
      <XmlArea generated={xml} />
    </div>
  );
}

export default Main;
