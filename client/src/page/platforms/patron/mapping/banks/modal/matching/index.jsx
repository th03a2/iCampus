import { MDBBtn, MDBCard, MDBCol, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import React from "react";

export default function Matching({
  questionMatch,
  answerMatch,
  confused,
  handleAddQuestion,
  handleAddConfusedAnswer,
  handleRemoveAnswerAndQuestion,
  handleRemoveConfused,
  handleAnswerChange,
  handleQuestionChange,
  handleConfusedChange,
}) {
  return (
    <>
      <MDBRow className="text-center my-2">
        <MDBCol md="4">
          <strong>Question</strong>
        </MDBCol>
        <MDBCol md="4">
          <strong>Answer</strong>
        </MDBCol>
        <MDBCol md="4" className="text-center">
          {confused.length === 0 ? (
            <MDBBtn
              type="button"
              color="success"
              size="sm"
              onClick={handleAddConfusedAnswer}
            >
              Click me to add confused Answer!
            </MDBBtn>
          ) : (
            <strong>Confused Answer</strong>
          )}
        </MDBCol>
      </MDBRow>
      <MDBRow
        style={{ maxHeight: "300px", overflowY: "auto", height: "250px" }}
      >
        {/* <div > */}
        <MDBCol md={8}>
          <MDBCard className="shadow-none">
            {questionMatch.map((data, index) => (
              <MDBRow className="my-2">
                <MDBCol md={6}>
                  <input
                    className="form-control"
                    placeholder="Enter your question"
                    value={data.value.toUpperCase()}
                    required
                    type="text"
                    onChange={(e) =>
                      handleQuestionChange(data.id, e.target.value)
                    }
                  />
                </MDBCol>
                <MDBCol md={6}>
                  <div className="d-flex">
                    <input
                      className="form-control flex-grow-1"
                      placeholder="Enter your answer"
                      value={answerMatch[index].value.toUpperCase()}
                      type="text"
                      required
                      onChange={(e) =>
                        handleAnswerChange(data.id, e.target.value)
                      }
                    />
                    {answerMatch.length > 2 && (
                      <MDBBtn
                        size="sm"
                        className="ml-2"
                        color="danger"
                        type="button"
                        onClick={() => handleRemoveAnswerAndQuestion(index)}
                      >
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>
                    )}
                    <MDBBtn
                      size="sm"
                      className="ml-2"
                      type="button"
                      onClick={() => handleAddQuestion()}
                    >
                      <MDBIcon fas icon="plus" />
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            ))}
          </MDBCard>
        </MDBCol>
        <MDBCol md={4}>
          <MDBCard className="shadow-none">
            {confused.map((data, index) => (
              <MDBRow className="d-flex justify-content-center my-1">
                <MDBCol md={12}>
                  <div className="d-flex" key={data.id}>
                    <input
                      className="form-control "
                      placeholder="Enter your confused answer"
                      type="text"
                      required
                      value={data.value.toUpperCase()}
                      onChange={(e) =>
                        handleConfusedChange(data.id, e.target.value)
                      }
                    />
                    <MDBBtn
                      size="sm"
                      className="ml-2"
                      color="danger"
                      onClick={() => handleRemoveConfused(index)}
                    >
                      <MDBIcon fas icon="minus" />
                    </MDBBtn>
                    <MDBBtn
                      size="sm"
                      className="ml-2"
                      type="button"
                      onClick={() => handleAddConfusedAnswer()}
                    >
                      <MDBIcon fas icon="plus" />
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            ))}
          </MDBCard>
        </MDBCol>
        {/* </div> */}
      </MDBRow>
    </>
  );
}
