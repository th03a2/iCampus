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
  MDBIcon,
  MDBBtnGroup,
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
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [cluster, setCluster] = useState("");
  const [gradeLevels, setGradeLevels] = useState([]);
  const [suggestSubject, setSuggestSubject] = useState("");
  const dispatch = useDispatch();
  const [enumerationAnswer, setEnumerationAnswer] = useState([
    { id: 1, value: "" },
  ]);
  const [multipleChoice, setMultipleChoice] = useState([{ id: 1, value: "" }]);
  const [mcAnswer, setMcAnswer] = useState({});

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

          const filterResult = result.filter(
            ({ id }) => id !== onDuty.specifications // para hindi masama kung anong section siya
          );
          setTopics(filterResult || []);
        } else {
          setTopics([]);
        }
      } else {
        const findSubject = findLevel.subjects.map((data) =>
          subjects.find(({ id }) => id === data && id !== onDuty.specifications)
        );

        const filterSubject = findSubject.filter(
          ({ id }) => id !== onDuty.specifications // para hindi masama kung anong section siya
        );
        setTopics(filterSubject || []);
        setStrands([]);
        setSpecification("");
      }
    }
  }, [levelId, specification]);

  useEffect(() => {
    const findSuggestSubject = subjects.find(
      (subject) => subject.id === onDuty.specifications
    );
    if (findSuggestSubject) {
      setSuggestSubject(findSuggestSubject.name);
      setSubjectId(onDuty.specifications);
    } else {
      setSuggestSubject("");
    }
  }, [visibility]);

  useEffect(() => {
    if (onDuty.specifications) {
      const findLevel = levels.filter(
        (level) => level.category === onDuty.category
      );
      if (findLevel.length > 0) {
        setGradeLevels(findLevel);
      }
    }
  }, [visibility]);

  const handleAddInput = () => {
    const newInputGroups = [...enumerationAnswer];
    const newId = enumerationAnswer[enumerationAnswer.length - 1].id + 1;
    newInputGroups.push({ id: newId, value: "" });
    setEnumerationAnswer(newInputGroups);
  };

  const handleInputChange = (id, newValue) => {
    const updatedInputGroups = enumerationAnswer.map((group) => {
      if (group.id === id) {
        return { ...group, value: newValue };
      }
      return group;
    });
    setEnumerationAnswer(updatedInputGroups);
  };

  const handleAddInputChoice = () => {
    const newInputGroups = [...multipleChoice];
    const newId = multipleChoice[multipleChoice.length - 1].id + 1;
    newInputGroups.push({ id: newId, value: "" });
    setMultipleChoice(newInputGroups);
  };

  const handleInputChoiceChange = (id, newValue) => {
    const updatedInputGroups = multipleChoice.map((group) => {
      if (group.id === id) {
        return { ...group, value: newValue };
      }
      return group;
    });
    setMultipleChoice(updatedInputGroups);
  };
  console.log(mcAnswer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredAnswers = enumerationAnswer.filter(
      (answer) => answer.value !== ""
    );
    Swal.fire({
      title: "Are you sure?",
      text: "You want to save this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          branchId: onDuty._id,
          specification,
          levelId,
          question,
          user: auth._id,
          cluster,
          mcAnswers: cluster === "multiple choice" ? multipleChoice : "",
          enumerationAns: enumerationAnswer.length > 0 ? filteredAnswers : [],
          correctAnswer:
            cluster === "multiple choice" ? mcAnswer.ans : correctAnswer,
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

  const handleRemoveInput = (index) => {
    const newArray = [...enumerationAnswer];
    newArray.splice(index, 1);
    setEnumerationAnswer([...newArray]);
  };
  const handleRemoveChoiceInput = (index) => {
    const newArray = [...multipleChoice];
    newArray.splice(index, 1);
    setMultipleChoice([...newArray]);
  };

  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit}>
              <MDBModalBody>
                <MDBRow>
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Grade Level">
                      <select
                        className="form-control"
                        value={levelId}
                        onChange={(e) => setLevelId(e.target.value)}
                        required
                      >
                        <option value={""}></option>
                        {gradeLevels.map((level, index) => (
                          <option value={level.id} key={index}>
                            {level.description}
                          </option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInputGroup textBefore="Subjects">
                      <select
                        className="form-control"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        required
                      >
                        <option value={onDuty?.specifications}>
                          {suggestSubject}
                        </option>
                        {topics.map((topic) => (
                          <option value={topic.id}>{topic.name}</option>
                        ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-2">
                  {/* {strands.length !== 0 ? ( */}
                  <MDBCol md="6">
                    <MDBInputGroup textBefore="Strand">
                      <select
                        className="form-control"
                        value={specification}
                        onChange={(e) => setSpecification(e.target.value)}
                        required
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
                  <MDBCol md={6}>
                    <MDBInputGroup textBefore="Cluster">
                      <select
                        className="form-control"
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                        required
                      >
                        <option value={""} />
                        <option value={"multiple choice"}>
                          Multiple Choice
                        </option>
                        <option value={"identification"}>Identification</option>
                        <option value={"essay"}> Essay</option>
                        <option value={"enumeration"}> Enumeration</option>
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-3">
                  <MDBCol>
                    <h5 className="text-center">
                      <strong>Question</strong>
                    </h5>
                    <textarea
                      className="form-control"
                      type="text"
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </MDBCol>
                </MDBRow>{" "}
                {cluster === "multiple choice" && (
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
                                value={group.value}
                                onChange={(e) =>
                                  handleInputChoiceChange(
                                    group.id,
                                    e.target.value
                                  )
                                }
                                required
                              />
                              {multipleChoice.length < 10 && (
                                <MDBBtn
                                  onClick={handleAddInputChoice}
                                  type="button"
                                >
                                  <MDBIcon fas icon="plus" />
                                </MDBBtn>
                              )}
                              {multipleChoice.length > 4 && (
                                <MDBBtn
                                  onClick={() => handleRemoveChoiceInput(index)}
                                  color="danger"
                                  type="button"
                                >
                                  <MDBIcon fas icon="minus" />
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
                                onClick={() =>
                                  setMcAnswer({ ans: data.value, index })
                                }
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
                            required
                          />
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>
                  </>
                )}
                {cluster === "enumeration" && (
                  <MDBRow>
                    <MDBCol md={12}>
                      <div>
                        {enumerationAnswer.map((group, index) => (
                          <div key={group.id} className="input-group mt-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={"Add Correct Answer"}
                              value={group.value}
                              required
                              onChange={(e) =>
                                handleInputChange(group.id, e.target.value)
                              }
                            />

                            <MDBBtn onClick={handleAddInput} type="button">
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                            {enumerationAnswer.length > 2 && (
                              <MDBBtn
                                onClick={() => handleRemoveInput(index)}
                                color="danger"
                                type="button"
                              >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>
                            )}
                          </div>
                        ))}
                      </div>
                    </MDBCol>
                  </MDBRow>
                )}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="transparent"
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
