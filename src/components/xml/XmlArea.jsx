import React, { useEffect } from "react";
import downloadXmlFile from "../../utils/xml/xml-downloader";
import soapRequest from "../../utils/soap/send_soap_request";

function XmlArea({ generated }) {
  const escapeXml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleDownload = () => {
    downloadXmlFile(generated);
  };

  const handleSend = async () => {
    const response = await soapRequest(generated);

    console.log(response);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated).then(
      () => {
        alert("XML content copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy text: ", err);
      }
    );
  };

  useEffect(() => {}, [generated]);

  return (
    <div>
      {generated && (
        <div style={{ margin: "2em 0" }}>
          <button
            onClick={handleDownload}
            style={{
              border: "1px solid black",
              color: "white",
              background: "black",
              marginRight: "1em",
            }}
          >
            Download XML
          </button>
          <button
            onClick={handleCopy}
            style={{ border: "1px solid white", background: "orange" }}
          >
            Copy XML
          </button>
          <button style={{ background: "red" }} onClick={handleSend}>
            Send SOAP
          </button>
        </div>
      )}
      {generated && (
        <pre
          style={{
            textAlign: "left",
            border: "2px solid gray",
            padding: "2em",
            background: "lightgray",
            color: "black",
            width: "100%",
          }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: escapeXml(generated) }}
          ></code>
        </pre>
      )}
    </div>
  );
}

export default XmlArea;
