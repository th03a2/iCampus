import { MDBBtn, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React from "react";
export default function ({
  enumerationAnswer,
  handleInputChange,
  handleRemoveInput,
  handleAddInput,
}) {
  return (
    <MDBRow style={{ maxHeight: "300px", overflowY: "auto", height: "250px" }}>
      <MDBCol md={12}>
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
      </MDBCol>
    </MDBRow>
  );
}
