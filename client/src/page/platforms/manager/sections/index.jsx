import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
// import { BROWSE } from "../../../../redux/slices/query";
import { GETBATCH, BROWSE } from "../../../../redux/slices/assets/sections";
import { TBLsections } from "../../../../templates";
import Modal from "./modal";
const path = [
  {
    path: "Sections",
  },
];

export default function Sections() {
  const { token, maxPage, onDuty } = useSelector(({ auth }) => auth),
    { catalogs, handleSections } = useSelector(({ sections }) => sections),
    [visibility, setVisibility] = useState(false),
    [sections, setSections] = useState([]),
    [batchs, setBatchs] = useState([]),
    [batchId, setBatchId] = useState(""),
    [update, setUpdate] = useState({}),
    [isUpdate, setIsUpdate] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        GETBATCH({
          data: { key: onDuty._id },
          token,
        })
      );
    }
  }, [dispatch, token, onDuty._id]);

  useEffect(() => {
    dispatch(
      BROWSE({
        token,
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setBatchs(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (batchId) {
      const filterSections = handleSections.filter(
        (data) => data.batchId === batchId
      );
      setSections(filterSections);
    }
  }, [handleSections, batchId]);

  useEffect(() => {
    if (sections.length > 0) {
      let totalPages = Math.floor(sections.length / maxPage);
      if (sections.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [sections, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Sections"
        button={true}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <select
              className="form-control "
              onChange={(e) => setBatchId(e.target.value)}
            >
              <option>Select Batch</option>
              {batchs.map((batch, index) => {
                var color;
                switch (batch.status) {
                  case "done":
                    color = "red";
                    break;
                  case "pending":
                    color = "orange";
                    break;
                  default:
                    color = "yellow";
                    break;
                }
                return (
                  <option
                    value={batch._id}
                    key={index}
                    style={{ backgroundColor: color }}
                  >
                    {`SY- ${batch.SY}`}
                  </option>
                );
              })}
            </select>
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLsections
          sections={sections}
          page={page}
          setIsUpdate={setIsUpdate}
          setUpdate={setUpdate}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            setVisibility={setVisibility}
            visibility={visibility}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            update={update}
            batchs={batchs}
          />
        )}
      </MDBContainer>
    </>
  );
}
