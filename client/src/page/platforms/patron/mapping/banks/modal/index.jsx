import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import levels from "../../../../../../fakeDb/json/levels";
import subjects from "../../../../../../fakeDb/json/subjects";
import { SAVE, UPDATE } from "../../../../../../redux/slices/assets/banks";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Matching from "./matching";
import Enumeration from "./enumeration";
import MultipleChoice from "./multiple";
import Header from "./header";

export default function Modal({
  visibility,
  setVisibility,
  isUpdate,
  setIsUpdate,
  updateBank,
}) {
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
    { id: 2, value: "" },
  ]);
  const [multipleChoice, setMultipleChoice] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
  ]);
  const [mcAnswer, setMcAnswer] = useState({});

  const [questionMatch, setQuestionMatch] = useState([
    { id: 1, value: "", correctAnswer: "" },
    { id: 2, value: "", correctAnswer: "" },
  ]);

  const [answerMatch, setAnswerMatch] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" }, // question sa matching type
  ]);

  const [confused, setConfused] = useState([]); //panglito sa correct answer sa matching type

  useEffect(() => {
    if (isUpdate) {
      setLevelId(updateBank.levelId);
      setSuggestSubject();
      setCluster(updateBank.cluster);
      setQuestion(updateBank.question);
      setSpecification(updateBank.specification);

      switch (updateBank.cluster) {
        case "multiple choice":
          setMultipleChoice(updateBank.mcAnswers);
          const index = updateBank.mcAnswers.findIndex(
            (update) => update.value === updateBank?.correctAnswer
          );
          setMcAnswer({ index });
          break;

        case "enumeration":
          setEnumerationAnswer(updateBank.enumerationAns);
          break;
        case "identification":
          setCorrectAnswer(updateBank.correctAnswer);
          break;
        case "matching":
          setAnswerMatch(updateBank.matchingAnswers);
          setQuestionMatch(updateBank.matchingQuestions);
          setConfused(updateBank.confusedAnswers || []);
          break;

        default:
          break;
      }
    }
  }, [isUpdate, updateBank]);

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
  }, [levelId, specification, onDuty.specifications]);

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

  const handleAddQuestion = () => {
    const newInputGroups = [...questionMatch];
    const newId = questionMatch[questionMatch.length - 1].id + 1;
    newInputGroups.push({ id: newId, value: "", correctAnswer: "" });
    setQuestionMatch(newInputGroups);

    const newAnswerMatch = [...answerMatch];
    const id = answerMatch[answerMatch.length - 1].id + 1;
    newAnswerMatch.push({ id, value: "" });
    setAnswerMatch(newAnswerMatch);
  };

  const handleAddConfusedAnswer = () => {
    const newInputGroups = [...confused];
    const newId = confused[confused.length - 1]?.id + 1;
    newInputGroups.push({ id: newId ? newId : 1, value: "" });
    setConfused(newInputGroups);
  };

  const handleQuestionChange = (id, value) => {
    const updateQuestion = questionMatch.map((question) => {
      if (question.id === id) {
        return { ...question, value };
      } else {
        return question;
      }
    });

    setQuestionMatch(updateQuestion);
  };

  const handleAnswerChange = (id, value) => {
    const updateAnswer = answerMatch.map((answer) => {
      if (answer.id === id) {
        return { ...answer, value };
      } else {
        return answer;
      }
    });

    const updateQuestion = questionMatch.map((question) => {
      if (question.id === id) {
        return { ...question, correctAnswer: value };
      } else {
        return question;
      }
    });
    setAnswerMatch(updateAnswer);
    setQuestionMatch(updateQuestion);
  };

  const handleConfusedChange = (id, value) => {
    const updateData = confused.map((data) => {
      if (data.id === id) {
        return { ...data, value };
      } else {
        return data;
      }
    });

    setConfused(updateData);
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

  const handleRemoveAnswerAndQuestion = (index) => {
    const newAnswer = [...answerMatch];
    newAnswer.splice(index, 1);
    const newQuestion = [...questionMatch];
    newQuestion.splice(index, 1);

    setAnswerMatch(newAnswer);
    setQuestionMatch(newQuestion);
  };

  const handleRemoveConfused = (index) => {
    const newArray = [...confused];
    newArray.splice(index, 1);

    setConfused([...newArray]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isUpdate ? "update" : "save"} this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${isUpdate ? "update" : "save"} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (!isUpdate) {
          const data = {
            branchId: onDuty._id,
            specification,
            levelId,
            question,
            user: auth._id,
            cluster,
            mcAnswers: cluster === "multiple choice" ? multipleChoice : "",
            enumerationAns:
              enumerationAnswer.length > 0 ? enumerationAnswer : [],
            correctAnswer:
              cluster === "multiple choice" ? mcAnswer.ans : correctAnswer,

            matchingQuestions: questionMatch.length > 0 ? questionMatch : [],
            matchingAnswers: answerMatch.length > 0 ? answerMatch : [],
            confusedAnswers: confused.length > 0 ? confused : [],
            subjectId,
          };

          dispatch(
            SAVE({
              data,
              token,
            })
          );
        } else {
          dispatch(
            UPDATE({
              data: {
                specification,
                levelId,
                question,
                user: auth._id,
                cluster,
                mcAnswers: cluster === "multiple choice" ? multipleChoice : "",
                enumerationAns:
                  enumerationAnswer.length > 0 ? enumerationAnswer : [],
                correctAnswer:
                  cluster === "multiple choice" ? mcAnswer.ans : correctAnswer,

                matchingQuestions:
                  questionMatch.length > 0 ? questionMatch : [],
                matchingAnswers: answerMatch.length > 0 ? answerMatch : [],
                confusedAnswers: confused.length > 0 ? confused : [],
                subjectId,
              },
              id: updateBank._id,
              token,
            })
          );
          setIsUpdate(false);
          setVisibility(false);
        }
      }
    });
  };

  const handleClose = () => {
    setVisibility(false);
    setIsUpdate(false);
  };

  return (
    <>
      <MDBModal
        show={visibility}
        setShow={setVisibility}
        tabIndex="-1"
        staticBackdrop
      >
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit}>
              <MDBModalBody
                style={{
                  height: "520px",
                }}
              >
                <Header
                  gradeLevels={gradeLevels}
                  onDuty={onDuty}
                  topics={topics}
                  strands={strands}
                  question={question}
                  setQuestion={setQuestion}
                  levelId={levelId}
                  setLevelId={setLevelId}
                  subjectId={subjectId}
                  setSubjectId={setSubjectId}
                  specification={specification}
                  setSpecification={setSpecification}
                  cluster={cluster}
                  setCluster={setCluster}
                  suggestSubject={suggestSubject}
                />
                {cluster === "multiple choice" && (
                  <>
                    <MultipleChoice
                      multipleChoice={multipleChoice}
                      handleAddInputChoice={handleAddInputChoice}
                      handleRemoveChoiceInput={handleRemoveChoiceInput}
                      handleInputChoiceChange={handleInputChoiceChange}
                      setMcAnswer={setMcAnswer}
                      mcAnswer={mcAnswer}
                    />
                  </>
                )}
                {cluster === "identification" && (
                  <>
                    <MDBRow>
                      <MDBCol md={6}>
                        <MDBInputGroup textBefore="Correct Answer">
                          <input
                            className="form-control"
                            value={correctAnswer.toUpperCase()}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            required
                          />
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>
                  </>
                )}
                {cluster === "enumeration" && (
                  <Enumeration
                    enumerationAnswer={enumerationAnswer}
                    handleInputChange={handleInputChange}
                    handleRemoveInput={handleRemoveInput}
                    handleAddInput={handleAddInput}
                  />
                )}
                {cluster === "matching" && (
                  <>
                    <Matching
                      handleAddConfusedAnswer={handleAddConfusedAnswer}
                      handleAddQuestion={handleAddQuestion}
                      handleRemoveAnswerAndQuestion={
                        handleRemoveAnswerAndQuestion
                      }
                      handleRemoveConfused={handleRemoveConfused}
                      handleAnswerChange={handleAnswerChange}
                      handleConfusedChange={handleConfusedChange}
                      handleQuestionChange={handleQuestionChange}
                      answerMatch={answerMatch}
                      questionMatch={questionMatch}
                      confused={confused}
                    />
                  </>
                )}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="transparent" type="button" onClick={handleClose}>
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
