import React from "react";

function FileList({ files}) {

    console.log(files)
  return (
    <div>
      <h3>Uploaded Files:</h3>
      <hr />
      <ul>
        {files.length > 0 ? (
          files.map((file, index) => <li key={index}>{file.name}</li>)
        ) : (
          <li>No files uploaded</li>
        )}
      </ul>
    </div>
  );
}

export default FileList;
