import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { json, redirect, useNavigate } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
const NewID = () => {
  const navigate = useNavigate();

  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);

  const fileUploadRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    e.files.forEach((file) => {
      _totalSize += file.size;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    setIsLoading(true);
    const file = event.files[0];
    console.log(file.size);
    if (file.size > 2000000) {
      toast.current.show({
        severity: "Error",
        summary: "Error",
        detail: "Message size greater than 15MB",
      });
      setIsLoading(false);
    }
    const formData = new FormData();
    formData.append("my_file", file);
    const response = await fetch(
      "https://vriksha-server-n9vt.vercel.app/plant/createIdentification",
      {
        method: "post",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    if (result.status === 404) {
      setIsLoading(false);
      toast.current.show({
        severity: "warning",
        summary: "Suggestion",
        detail: result.message,
      });
    } else {
      setIsLoading(false);
      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: result.message,
      });
      setTimeout(() => {
        navigate(`/myplants/${result.accessToken}`);
      }, 2000);
    }
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
      {isLoading && (
        <div className="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      )}
      <div className="card">
        <h5>FILE SIZE SHOULD BE LESS THAN 2MB</h5>
        <FileUpload
          ref={fileUploadRef}
          accept="image/jpeg"
          maxFileSize={2000000}
          customUpload
          uploadHandler={customBase64Uploader}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
export default NewID;

export async function imgPageLoader({ request, params }) {
  if (localStorage.getItem("isLoggedIn") === null) return redirect("/login");
  return json({ status: 200 });
}
