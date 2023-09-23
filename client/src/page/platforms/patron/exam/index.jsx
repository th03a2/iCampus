import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBBtn,
  MDBCard,
} from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/query";
import { TBLexams, TBLpick } from "../../../../templates";
// import Modal from "./modal";
import { nameFormatter } from "../../../../components/utilities";
import levels from "../../../../fakeDb/json/levels";
import subjects from "../../../../fakeDb/json/subjects";

const path = [
  {
    path: "Exams",
  },
];

export default function Exam() {
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
    [isUpdate, setIsUpdate] = useState(false),
    [updateBank, setUpdateBank] = useState({}),
    [items, setItems] = useState([]),
    [category, setCategory] = useState(""),
    [groups, setGroups] = useState({}),
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
        const key = value?.description + "-" + value?.id;
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
    if (levelId && !topicId) {
      const filterLevels = catalogs.filter(
        (catalog) => catalog.levelId === Number(levelId)
      );
      setBanks(filterLevels || []);
    }
  }, [levelId, topicId]);

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
    if (levelId && topicId) {
      const filterSubjectAndLevels = catalogs.filter(
        (catalog) =>
          catalog.levelId === Number(levelId) &&
          catalog.subjectId === Number(topicId)
      );

      const filterCategory = filterSubjectAndLevels.reduce(
        (accumulator, value) => {
          const key = value.category;

          if (!accumulator[key]) {
            accumulator[key] = [value];
          } else {
            accumulator[key].push(value);
          }
          return accumulator;
        },
        {}
      );

      setBanks(filterSubjectAndLevels);
      setGroups(filterCategory);
    }
  }, [topicId, levelId]);

  useEffect(() => {
    if (!levelId && !topicId) {
      setBanks(catalogs);
    }
  }, [levelId, topicId]);

  useEffect(() => {
    if (category) {
      const newArray = groups[category];
      setBanks(newArray);
    }
  }, [category]);

  useEffect(() => {
    if (banks.length > 0) {
      let totalPages = Math.floor(banks.length / maxPage);
      if (banks.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [banks, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Questionneir"
        button={true}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5" style={{ height: "400px" }}>
        <MDBRow className="mb-3 d-flex justify-content-center">
          <MDBCol md={3}>
            <MDBInputGroup textBefore="Grade Level">
              <select
                className="form-control"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                required
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
                required
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
            <MDBInputGroup textBefore="Category">
              <select
                className="form-control"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                {Object.entries(groups).map(([key], index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              {/* <input type="text" /> */}
            </MDBInputGroup>
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <MDBRow>
          <MDBCol md={12}>
            <MDBCard>
              <TBLexams
                banks={banks.length > 0 ? banks : catalogs}
                items={items}
                page={page}
                visibility={visibility}
                setVisibility={setVisibility}
                setIsUpdate={setIsUpdate}
                setUpdateBank={setUpdateBank}
              />
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* {visibility && (
        <Modal
          visibility={visibility}
          setVisibility={setVisibility}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          updateBank={updateBank}
        />
      )} */}
    </>
  );
}
