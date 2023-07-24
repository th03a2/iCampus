import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import image from "../../../../../../assets/images/default.jpg";
export default function Credentials({
  handleNsoChange,
  form,
  setForm,
  setActiveItem,
  link,
  setLink,
  nso,
  handleSf10Change,
  handleGoodmoralChange,
  goodmoral,
  sf10,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.success = true;

    setForm({
      ...form,
    });
    setLink(tabs);
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                src={nso ? nso : image}
                className="mx-auto img-max img-fluid  d-flex justify-content-center"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label
                htmlFor="upload-image"
                className="mt-2 btn btn-info btn-sm"
              >
                UPLOAD BIRTH CERTIFICATE OR NSO
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
                src={sf10 ? sf10 : image}
                className="mx-auto img-max img-fluid  d-flex justify-content-center"
                style={{ height: "900px" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <label htmlFor="upload-sf10" className="mt-2 btn btn-info btn-sm">
                UPLOAD SF10 OR SF9
              </label>
              <input
                type="file"
                id="upload-sf10"
                onChange={handleSf10Change}
                className="d-none"
                accept="image/*"
              />
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <div className="d-flex justify-content-center">
              <MDBCardImage
                src={goodmoral ? goodmoral : image}
                className="mx-auto img-max img-fluid  d-flex justify-content-center"
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
        </MDBRow>

        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("siblings")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit" color="warning">
            Submit
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
