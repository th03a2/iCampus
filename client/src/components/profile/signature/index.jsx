import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINT, PresetUser } from "../../utilities";
import { UPLOAD } from "../../../redux/slices/assets/persons/auth";

export default function ESignature() {
  const { theme, token, auth } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const handleSignature = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        dispatch(
          UPLOAD({
            data: {
              path: `patron/${auth.email}`,
              base64: reader.result.split(",")[1],
              name: `signature.png`,
            },
            token,
          })
        );
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <MDBCol className="offset-md-0 transition-all mb-4">
      <MDBCard background={theme.color} className={`${theme.text}`}>
        <MDBCardBody className="text-center">
          <MDBCardTitle
            className={`border-bottom border-${theme.border} mb-3 text-start pb-1`}
          >
            e-Signature
          </MDBCardTitle>
          <MDBCardImage
            src={`${ENDPOINT}/public/patron/${auth.email}/signature.png`}
            alt={auth.email}
            className="mx-auto rounded img-max img-fluid mb-1"
            onError={(e) => (e.target.src = PresetUser)}
          />
          <MDBTooltip
            tag="span"
            wrapperClass="d-inline-block"
            title="Change your e-Signature!"
            placement="bottom"
          >
            <label
              htmlFor="upload-signature"
              className="mt-2 btn btn-info btn-sm"
            >
              Upload e-Signature
            </label>
            <input
              type="file"
              id="upload-signature"
              onChange={handleSignature}
              className="d-none"
              accept="image/*"
            />
          </MDBTooltip>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
