import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Siblings({
  handleNumberOfSiblingsChange,
  siblingsData,
  handleInputChange,
  numberOfSiblings,
  setActiveItem,
  link,
  setLink,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.credentials = true;

    setLink(tabs);
    setActiveItem("credentials");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="container mt-4">
          <label htmlFor="numberOfSiblings" className="form-label">
            How many siblings do you have?
          </label>
          <input
            type="number"
            id="numberOfSiblings"
            value={numberOfSiblings}
            onChange={handleNumberOfSiblingsChange}
            className="form-control"
          />

          {siblingsData.map((data, index) => (
            <div key={index} className="mb-4">
              <MDBRow>
                <MDBCol md={4}>
                  <label htmlFor={`fname${index + 1}`} className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id={`fname${index + 1}`}
                    value={data.fname || ""}
                    onChange={(e) =>
                      handleInputChange(index, "fname", e.target.value)
                    }
                    className="form-control"
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <label htmlFor={`mname${index + 1}`} className="form-label">
                    Middle Name:
                  </label>
                  <input
                    type="text"
                    id={`mname${index + 1}`}
                    value={data.mname || ""}
                    onChange={(e) =>
                      handleInputChange(index, "mname", e.target.value)
                    }
                    className="form-control"
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <label htmlFor={`lname${index + 1}`} className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id={`lname${index + 1}`}
                    value={data.lname || ""}
                    required
                    onChange={(e) =>
                      handleInputChange(index, "lname", e.target.value)
                    }
                    className="form-control"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={4}>
                  <label htmlFor={`bday${index + 1}`} className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    required
                    type="date"
                    id={`bday${index + 1}`}
                    value={data.dob || ""}
                    onChange={(e) =>
                      handleInputChange(index, "dob", e.target.value)
                    }
                    className="form-control"
                  />
                </MDBCol>
                {/* <MDBCol md={4}>
                  <label htmlFor={`age${index + 1}`} className="form-label">
                    Age:
                  </label>
                  <input
                    type="number"
                    id={`age${index + 1}`}
                    value={data.age || ""}
                    onChange={(e) =>
                      handleInputChange(index, "age", e.target.value)
                    }
                    className="form-control"
                  />
                </MDBCol> */}
                <MDBCol md={4}>
                  <label htmlFor={`gender${index + 1}`} className="form-label">
                    Gender:
                  </label>
                  <select
                    required
                    id={`gender${index + 1}`}
                    value={data.isMale || ""}
                    onChange={(e) =>
                      handleInputChange(index, "isMale", e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="">Select</option>
                    <option value={true}>Male</option>
                    <option value={false}>Female</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow></MDBRow>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <MDBBtn
            onClick={() => setActiveItem("parents")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
