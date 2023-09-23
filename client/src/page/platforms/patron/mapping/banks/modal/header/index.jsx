import { MDBCol, MDBInputGroup, MDBRow } from "mdb-react-ui-kit";
import React from "react";
export default function ({
  gradeLevels,
  onDuty,
  topics,
  strands,
  question,
  setQuestion,
  levelId,
  setLevelId,
  subjectId,
  setSubjectId,
  specification,
  setSpecification,
  cluster,
  setCluster,
  suggestSubject,
  category,
  setCategory,
}) {
  return (
    <>
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
              <option value={onDuty?.specifications}>{suggestSubject}</option>
              {topics.map((topic) => (
                <option value={topic.id}>{topic.name}</option>
              ))}
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-2">
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
              <option value={"multiple choice"}>Multiple Choice</option>
              <option value={"identification"}>Identification</option>
              <option value={"essay"}> Essay</option>
              <option value={"enumeration"}> Enumeration</option>
              <option value={"matching"}> Matching type</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-2">
        <MDBCol md={6}>
          <MDBInputGroup textBefore="Category">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}></option>
              <option value={"easy"}>Easy</option>
              <option value={"medium"}>Medium</option>
              <option value={"hard"}>Hard</option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
      <MDBRow className="my-3">
        <MDBCol>
          <h5 className="text-center">
            <strong>
              {cluster === "matching" ? "Instructions" : "Question"}
            </strong>
          </h5>
          <textarea
            className="form-control"
            type="text"
            value={question.toUpperCase()}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </MDBCol>
      </MDBRow>
    </>
  );
}
