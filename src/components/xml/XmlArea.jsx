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

  useEffect(() => {
    console.log({ generated });
  }, [generated]);

  return (
    <div style={{textAlign: 'left', border: '2px solid gray', padding: '2em', background: 'lightgray', color: 'black', width: '100%'}}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: escapeXml(generated) }}></code>
      </pre>
    </div>
  );
}

export default XmlArea;
