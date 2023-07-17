import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
const initials = { ns1: null, igg: null, igm: null };

export default function Typoid() {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [results, setResults] = useState(initials);
  useEffect(() => {
    params?.results && setResults(params.results);
  }, [params]);

  const handleResult = e => {
    const { name, value } = e.target;
    const _results = { ...results };
    _results[name] = value === "1" ? true : false;
    dispatch(SETPARAMS({ ...params, results: _results }));
  };

  return (
    <div>
      <MDBRow>
        <MDBCol md="12">
          <h5> RESULTS :</h5>
        </MDBCol>
        <MDBCol>
          <MDBInputGroup className="mb-3" textBefore="Antibody IgG:">
            <select
              className="form-control"
              name="igg"
              value={
                results.igg !== null ? (results.igg ? "1" : "0") : undefined
              }
              onChange={handleResult}
            >
              <option></option>
              <option value="0">NEGATIVE</option>
              <option value="1" style={{ backgroundColor: "red" }}>
                POSITIVE
              </option>
            </select>
          </MDBInputGroup>
          <MDBInputGroup className="mb-3" textBefore="Antibody IgM:">
            <select
              className="form-control"
              name="igm"
              value={
                results.igm !== null ? (results.igm ? "1" : "0") : undefined
              }
              onChange={handleResult}
            >
              <option></option>
              <option value="0">NEGATIVE</option>
              <option value="1" style={{ backgroundColor: "red" }}>
                POSITIVE
              </option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
