import React, { useEffect } from "react";

function XmlArea({ generated }) {
  const escapeXml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const downloadXmlFile = () => {
    const blob = new Blob([generated], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "coverted.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log({ generated });
  }, [generated]);

  return (
    <div>
      {generated && (
        <button
          onClick={downloadXmlFile}
          style={{ border: "1px solid white", margin: "2em" }}
        >
          Download XML
        </button>
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
