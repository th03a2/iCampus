import { MDBRow, MDBCol, MDBBtnGroup, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
export default function MultipleChoice({
  multipleChoice,
  handleAddInputChoice,
  handleRemoveChoiceInput,
  handleInputChoiceChange,
  setMcAnswer,
  mcAnswer,
}) {
  return (
    <>
      <MDBRow>
        <MDBCol md={12}>
          <div>
            {multipleChoice.map((group, index) => (
              <div key={group.id} className="input-group mt-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={"Enter you want to choice"}
                  value={group.value.toUpperCase()}
                  onChange={(e) =>
                    handleInputChoiceChange(group.id, e.target.value)
                  }
                  required
                />

                {multipleChoice.length > 4 && (
                  <MDBBtn
                    onClick={() => handleRemoveChoiceInput(index)}
                    color="danger"
                    type="button"
                  >
                    <MDBIcon fas icon="minus" />
                  </MDBBtn>
                )}
                {multipleChoice.length < 10 && (
                  <MDBBtn onClick={handleAddInputChoice} type="button">
                    <MDBIcon fas icon="plus" />
                  </MDBBtn>
                )}
              </div>
            ))}
          </div>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-2">
        <MDBCol md={12} className="d-flex justify-content-center">
          <h6 className="mt-2">
            <strong>Correct Answer: </strong>
          </h6>

          {multipleChoice.map((data, index) => (
            <>
              <MDBBtnGroup>
                <MDBBtn
                  key={index}
                  color="success"
                  outline={mcAnswer.index !== index}
                  onClick={() => setMcAnswer({ ans: data.value, index })}
                  size="sm"
                  type="button"
                >
                  {String.fromCharCode(65 + index)}
                </MDBBtn>
              </MDBBtnGroup>
            </>
          ))}
        </MDBCol>
      </MDBRow>
    </>
  );
}
