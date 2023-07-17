import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  ENDPOINT,
  PresetUser,
} from "./../../../../../../../components/utilities";
import { UPLOAD } from "./../../../../../../redux/slices/assets/persons/auth";
import { toast } from "react-toastify";

export default function ImageModal({ name, id, setVisibility, visibility }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.type.includes("jpeg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          if (this.width === this.height) {
            if (this.width <= 300) {
              dispatch(
                UPLOAD({
                  data: {
                    path: `companies`,
                    base64: reader.result.split(",")[1],
                    name: `${name}.jpg`,
                  },
                  token,
                })
              );
            } else {
              toast.warn("Maximum image size is 300 pixels below.");
            }
          } else {
            toast.warn("Proportion must be 1:1");
          }
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.warn("Please select a JPG extension file.");
    }
  };

  const handleClick = () => document.getElementById(`company-${id}`).click();

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="sm">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <b>{name}</b>'s logo
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <MDBModalBody className="text-center">
            <img
              onClick={handleClick}
              title="Click image to replace it."
              src={`${ENDPOINT}/assets/companies/${name}.jpg`}
              alt={name}
              onError={(e) => (e.target.src = PresetUser)}
              className="cursor-pointer img-fluid img-thumbnail"
            />
            <input
              type="file"
              onChange={handleImageChange}
              id={`company-${id}`}
              accept="image/jpeg"
              className="d-none"
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
