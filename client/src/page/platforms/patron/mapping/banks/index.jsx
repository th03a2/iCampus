import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/query";
import { TBLbanks } from "../../../../../templates";
import Modal from "./modal";
import { nameFormatter } from "../../../../../components/utilities";
import levels from "../../../../../fakeDb/json/levels";
import subjects from "../../../../../fakeDb/json/subjects";

const path = [
  {
    path: "Banks",
  },
];

export default function Books() {
  const { token, maxPage, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [banks, setBanks] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [gradeLevels, setGradeLevels] = useState({}),
    [levelId, setLevelId] = useState(""),
    [topicId, setTopicId] = useState(""),
    [topics, setTopics] = useState({}),
    [authors, setAuthors] = useState({}),
    [authorId, setAuthorId] = useState(""),
    [newBanks, setNewBanks] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/banks",
        data: onDuty._id,
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setBanks(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (banks.length > 0) {
      let totalPages = Math.floor(banks.length / maxPage);
      if (banks.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [banks, page, maxPage]);

  useEffect(() => {
    if (catalogs.length > 0) {
      const filterLevel = catalogs.map((level) =>
        levels.find(({ id }) => id === level.levelId)
      );
      const newArray = filterLevel.reduce((accumulator, value) => {
        const key = value.description + "-" + value.id;
        if (!accumulator[key]) {
          accumulator[key] = [value];
        } else {
          accumulator[key].push(value);
        }
        return accumulator;
      }, {});
      setGradeLevels(newArray || {});
    }
  }, [catalogs]);

  useEffect(() => {
    if (levelId) {
      const filterLevels = catalogs.filter(
        (catalog) => catalog.levelId === Number(levelId)
      );
      setBanks(filterLevels || []);
    }
  }, [levelId]);

  useEffect(() => {
    if (levelId) {
      const filterTopic = catalogs.map((catalog) =>
        subjects.find((subject) => subject.id === catalog.subjectId)
      );

      const newArray = filterTopic.reduce((accumulator, value) => {
        const key = value.name + "-" + value?.id;

        if (!accumulator[key]) {
          accumulator[key] = [value];
        } else {
          accumulator[key].push(value);
        }
        return accumulator;
      }, {});
      setTopics(newArray || {});
    }
  }, [levelId]);

  useEffect(() => {
    if ((levelId, topicId)) {
      const filterSubjectAndLevels = catalogs.filter(
        (catalog) =>
          catalog.levelId === Number(levelId) &&
          catalog.subjectId === Number(topicId)
      );

      const filterAuthors = filterSubjectAndLevels.reduce(
        (accumulator, value) => {
          const author = nameFormatter(value.user?.fullName);
          const id = value.user?._id;
          const key = author + "-" + id;
          if (!accumulator[key]) {
            accumulator[key] = [value];
          } else {
            accumulator[key].push(value);
          }
          return accumulator;
        },
        {}
      );
      setNewBanks(filterSubjectAndLevels);
      setAuthors(filterAuthors || {});
    }
  }, [topicId, levelId]);

  useEffect(() => {
    setBanks(newBanks);
  }, [newBanks]);

  useEffect(() => {
    if ((authorId, levelId, topicId)) {
      const newArray = catalogs.filter(
        (catalog) =>
          catalog.levelId === Number(levelId) &&
          catalog.subjectId === Number(topicId) &&
          catalog.user?._id === authorId
      );

      setBanks(newArray || []);
    }
  }, [levelId, topicId, authorId]);

  return (
    <>
      <BreadCrumb
        title="Questioneir Banks"
        button={true}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={3}>
            <MDBInputGroup textBefore="Grade Level">
              <select
                className="form-control"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
              >
                <option value={""}></option>
                {gradeLevels &&
                  Object.entries(gradeLevels).map(([key, value]) => {
                    const array = key.split("-");
                    return <option value={array[1]}>{array[0]}</option>;
                  })}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={3}>
            <MDBInputGroup textBefore="Subject">
              <select
                className="form-control"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
              >
                <option value={""}></option>
                {levelId &&
                  Object.entries(topics).map(([key, value]) => {
                    const array = key.split("-");
                    return <option value={array[1]}>{array[0]}</option>;
                  })}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={3}>
            <MDBInputGroup textBefore="Author">
              <select
                className="form-control"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option></option>
                {levelId &&
                  topicId &&
                  Object.entries(authors).map(([key, value], index) => {
                    const array = key.split("-");
                    return (
                      <option value={array[1]} key={index}>
                        {array[0]}
                      </option>
                    );
                  })}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLbanks banks={banks} page={page} />
      </MDBContainer>
      {visibility && (
        <Modal visibility={visibility} setVisibility={setVisibility} />
      )}
    </>
  );
}
