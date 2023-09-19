import { MDBBtn, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React from "react";
export default function ({
  enumerationAnswer,
  handleInputChange,
  handleRemoveInput,
  handleAddInput,
}) {
  return (
    <MDBRow>
      <MDBCol md={12}>
        <div>
          {enumerationAnswer.map((group, index) => (
            <div key={group.id} className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder={"Add Correct Answer"}
                value={group.value.toUpperCase()}
                required
                onChange={(e) => handleInputChange(group.id, e.target.value)}
              />

              {enumerationAnswer.length > 2 && (
                <MDBBtn
                  onClick={() => handleRemoveInput(index)}
                  color="danger"
                  type="button"
                >
                  <MDBIcon fas icon="minus" />
                </MDBBtn>
              )}
              <MDBBtn onClick={handleAddInput} type="button">
                <MDBIcon fas icon="plus" />
              </MDBBtn>
            </div>
          ))}
        </div>
      </MDBCol>
    </MDBRow>
  );
}
