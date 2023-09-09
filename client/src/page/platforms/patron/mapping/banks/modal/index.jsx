import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import levels from "../../../../../../fakeDb/json/levels";
import subjects from "../../../../../../fakeDb/json/subjects";
import { SAVE } from "../../../../../../redux/slices/assets/banks";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
export default function Modal({ visibility, setVisibility }) {
  const { onDuty, auth, token } = useSelector(({ auth }) => auth);
  const [question, setQuestion] = useState("");
  const [levelId, setLevelId] = useState("");
  const [strands, setStrands] = useState([]);
  const [specification, setSpecification] = useState("");
  const [topics, setTopics] = useState([]);
  const [choices, setChoices] = useState({ a: "", b: "", c: "", d: "", e: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [cluster, setCluster] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (levelId) {
      const findLevel = levels.find((level) => level.id === Number(levelId));
      if (findLevel.hasOwnProperty("strand")) {
        setStrands(findLevel.strand || []);
        if (specification) {
          const findSubject = findLevel.strand.find(
            ({ specifications }) => specifications === specification
          );

          const result = findSubject?.subject?.map((data) =>
            subjects.find(({ id }) => id === data)
          );
          setTopics(result || []);
        } else {
          setTopics([]);
        }
      } else {
        const findSubject = findLevel.subjects.map((data) =>
          subjects.find(({ id }) => id === data)
        );
        setTopics(findSubject || []);
        setStrands([]);
        setSpecification("");
      }
    }
  }, [levelId, specification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChoices({ ...choices, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          branchId: onDuty._id,
          specification,
          levelId,
          question,
          user: auth._id,
          cluster,
          mcAnswers: cluster === "multiple choice" ? choices : "",
          correctAnswer,
          subjectId,
        };

        dispatch(
          SAVE({
            data,
            token,
          })
        );

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Question</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit}>
              <MDBModalBody>
                <MDBRow>
                  <MDBCol>
                    <h2 className="text-center">
                      <strong>Question</strong>
                    </h2>
                    <textarea
                      className="form-control"
                      type="text"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center my-3">
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Cluster">
                      <select
                        className="form-control"
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                      >
                        <option value={""} />
                        <option value={"multiple choice"}>
                          Multiple Choice
                        </option>
                        <option value={"identification"}>Identification</option>
                        <option value={"essay"}> Essay</option>
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                {cluster === "multiple choice" && (
                  <>
                    {" "}
                    <MDBRow>
                      {/* <h5 className="text-center mt-2">Choices</h5> */}

                      <MDBCol md="4">
                        <MDBInputGroup textBefore="a.">
                          <input
                            className="form-control"
                            name="a"
                            value={choices.a}
                            onChange={handleChange}
                            type="text"
                          />
                        </MDBInputGroup>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInputGroup textBefore="b.">
                          <input
                            className="form-control"
                            type="text"
                            name="b"
                            value={choices.b}
                            onChange={handleChange}
                          />
                        </MDBInputGroup>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInputGroup textBefore="c.">
                          <input
                            className="form-control"
                            type="text"
                            name="c"
                            value={choices.c}
                            onChange={handleChange}
                          />
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-3">
                      <MDBCol md="4">
                        <MDBInputGroup textBefore="d.">
                          <input
                            className="form-control"
                            type="text"
                            name="d"
                            value={choices.d}
                            onChange={handleChange}
                          />
                        </MDBInputGroup>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInputGroup textBefore="e.">
                          <input
                            className="form-control"
                            type="text"
                            name="e"
                            value={choices.e}
                            onChange={handleChange}
                          />
                        </MDBInputGroup>
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInputGroup textBefore="Correct answer">
                          <select
                            className="form-control"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                          >
                            <option value={""}></option>
                            {Object.entries(choices).map(([key, value]) => {
                              if (value) {
                                return <option value={value}>{key}</option>;
                              }
                            })}
                          </select>
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>
                  </>
                )}
                {cluster === "identification" && (
                  <>
                    <MDBRow>
                      <MDBCol md={6}>
                        <MDBInputGroup textBefore="Correct Answer">
                          <input
                            className="form-control"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                          />
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>
                  </>
                )}
                <h5 className="text-center mt-2">Where do you assign it?</h5>
                <MDBRow className="mt-2">
                  <MDBCol md="6">
                    <MDBInputGroup textBefore="Grade Level">
                      <select
                        className="form-control"
                        value={levelId}
                        onChange={(e) => setLevelId(e.target.value)}
                      >
                        <option value={""}></option>
                        {levels.map((level, index) => (
                          <option value={level.id} key={index}>
                            {level.description}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  {strands.length > 0 ? (
                    <MDBCol md="6">
                      <MDBInputGroup textBefore="Strand">
                        <select
                          className="form-control"
                          value={specification}
                          onChange={(e) => setSpecification(e.target.value)}
                        >
                          <option value={""}></option>
                          {strands.map((strand, index) => (
                            <option value={strand.specifications} key={index}>
                              {strand.specifications}
                            </option>
                          ))}
                        </select>
                      </MDBInputGroup>
                    </MDBCol>
                  ) : (
                    ""
                  )}
                </MDBRow>
                {topics.length > 0 && (
                  <MDBRow className="mt-3">
                    <MDBCol md="4">
                      <MDBInputGroup textBefore="Subjects">
                        <select
                          className="form-control"
                          value={subjectId}
                          onChange={(e) => setSubjectId(e.target.value)}
                        >
                          <option value={""}></option>
                          {topics.map((topic) => (
                            <option value={topic.id}>{topic.name}</option>
                          ))}
                        </select>
                      </MDBInputGroup>
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  type="button"
                  onClick={() => setVisibility(false)}
                >
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Save</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
