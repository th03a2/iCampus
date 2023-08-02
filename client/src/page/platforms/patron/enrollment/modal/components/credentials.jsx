import React, { useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import defaultImage from "../../../../../../assets/images/default.jpg";
import { ViewCredentials } from "../../../../../../templates";
import Modal from "../../credentialModal";
import { toast } from "react-toastify";
export default function Credentials({
  handleNsoChange,
  form,
  setForm,
  setActiveItem,
  link,
  setLink,
  handleSf10AChange,
  handleSf10BChange,
  handleProfileChange,
  handleGoodmoralChange,
  goodmoral,
  sf10A,
  sf10B,
  nso,
  profile,
}) {
  const [visibility, setVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.success = true;

    setForm({
      ...form,
    });
    setLink(tabs);
  };

  const handleView = (image, name, isUpload) => {
    if (isUpload) {
      setImage(image);
      setName(name);
      setVisibility(true);
    } else {
      toast.warn(" Upload image first!");
    }
  };
  console.log(visibility);

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                onClick={() => handleView(nso, "NSO", nso ? true : false)}
                src={nso ? nso : defaultImage}
                className="mx-auto img-max img-fluid  d-flex justify-content-center cursor-pointer"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label
                htmlFor="upload-image"
                className="mt-2 btn btn-info btn-sm"
              >
                UPLOAD NSO
              </label>
              <input
                type="file"
                id="upload-image"
                onChange={handleNsoChange}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                onClick={() =>
                  handleView(sf10A, "SF10 FRONT", sf10A ? true : false)
                }
                src={sf10A ? sf10A : defaultImage}
                className="mx-auto img-max img-fluid  d-flex justify-content-center cursor-pointer"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label htmlFor="upload-sf10" className="mt-2 btn btn-info btn-sm">
                UPLOAD SF10 A
              </label>
              <input
                type="file"
                id="upload-sf10"
                onChange={handleSf10AChange}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                onClick={() =>
                  handleView(sf10B, "SF10B BACK", sf10B ? true : false)
                }
                src={sf10B ? sf10B : defaultImage}
                className="mx-auto img-max img-fluid  d-flex justify-content-center cursor-pointer"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label
                htmlFor="upload-sf10B"
                className="mt-2 btn btn-info btn-sm"
              >
                UPLOAD SF10 B
              </label>
              <input
                type="file"
                id="upload-sf10B"
                onChange={handleSf10BChange}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                onClick={() =>
                  handleView(goodmoral, "Good Moral", goodmoral ? true : false)
                }
                src={goodmoral ? goodmoral : defaultImage}
                className="mx-auto img-max img-fluid  d-flex justify-content-center cursor-pointer"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label
                htmlFor="upload-goodmoral"
                className="mt-2 btn btn-info btn-sm"
              >
                UPLOAD GOOD MORAL
              </label>
              <input
                type="file"
                id="upload-goodmoral"
                onChange={handleGoodmoralChange}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                onClick={() =>
                  handleView(profile, "2X2 PICTURE", profile ? true : false)
                }
                src={profile ? profile : defaultImage}
                className="mx-auto img-max img-fluid  d-flex justify-content-center cursor-pointer"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label
                htmlFor="upload-profile"
                className="mt-2 btn btn-info btn-sm"
              >
                2X2 PICTURE
              </label>
              <input
                type="file"
                id="upload-profile"
                onChange={handleProfileChange}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
        </MDBRow>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "35px",
            left: "120px",
            right: "120px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("siblings")}
            type="button"
            color="warning"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Submit</MDBBtn>
        </div>
      </form>
      {visibility ? (
        <Modal
          setVisibility={setVisibility}
          visibility={visibility}
          image={image}
          name={name}
        />
      ) : (
        ""
      )}
    </MDBContainer>
  );
}
