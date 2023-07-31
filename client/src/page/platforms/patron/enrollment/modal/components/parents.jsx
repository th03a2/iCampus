import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import {
  validateContactNumber,
  properNameFormatter,
} from "../../../../../../components/utilities";
import { ModalSearchUsers } from "../../../../../../templates/assets";
import { useState } from "react";

export default function Parents({
  parents,
  setParents,
  setActiveItem,
  link,
  setLink,
}) {
  const [visibility, setVisibility] = useState(false),
    [gender, setGender] = useState(true),
    [father, setFather] = useState({}),
    [mother, setMother] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.siblings = true;

    setLink(tabs);
    setActiveItem("siblings");
  };

  const handleParents = (user, isMale) => {
    if (isMale) {
      setFather(user);
    } else {
      setMother(user);
    }
  };

  const handleSearch = (gender) => {
    setGender(gender);
    setVisibility(true);
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <div className="d-flex justify-content-center">
            <MDBCol md={6} className="mb-5 mb-md-0 ">
              <MDBInputGroup textBefore="Father">
                <input
                  type="text"
                  name="father"
                  className="form-control"
                  value={
                    father?.fullName
                      ? properNameFormatter(father?.fullName)
                      : ""
                  }
                  onClick={() => handleSearch(true)}
                />
              </MDBInputGroup>
            </MDBCol>
          </div>
        </MDBRow>
        <MDBRow>
          <div className="d-flex justify-content-center">
            <MDBCol md={6} className="mt-4 mb-5">
              <MDBInputGroup textBefore="Mother">
                <input
                  type="text"
                  name="mother"
                  className="form-control"
                  value={
                    mother?.fullName
                      ? properNameFormatter(mother?.fullName)
                      : ""
                  }
                  onClick={() => handleSearch(false)}
                />
              </MDBInputGroup>
            </MDBCol>
          </div>
        </MDBRow>
        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("guardian")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
      {visibility && (
        <ModalSearchUsers
          visibility={visibility}
          setVisibility={setVisibility}
          gender={gender}
          handleParents={handleParents}
        />
      )}
    </MDBContainer>
  );
}
