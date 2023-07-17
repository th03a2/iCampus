import React from "react";
import { PresetUser } from "../../components/utilities";

export function Views({ file }) {
  return (
    <>
      {file.isImage && (
        <img
          src={file.preview || PresetUser}
          alt="preview"
          className="img-fluid"
          height="auto"
          width="100%"
        />
      )}
      {!file.isImage && (
        <iframe
          src={file.preview}
          className="w-100"
          style={{ minHeight: "500px" }}
        />
      )}
    </>
  );
}
