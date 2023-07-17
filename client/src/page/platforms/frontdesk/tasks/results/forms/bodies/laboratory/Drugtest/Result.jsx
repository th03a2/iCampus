import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../redux/slices/task/forms";
const initials = { bt: null, rh: null };

export default function Results() {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [results, setResults] = useState(initials);
  useEffect(() => {
    params?.results && setResults(params.results);
  }, [params]);

  const handleResult = e => {
    const { name, value } = e.target;
    dispatch(SETPARAMS({ ...params, [name]: value }));
  };

  return (
    <div>
      <MDBRow>
        <MDBCol md="12">
          <h5> RESULTS</h5>
        </MDBCol>
        <MDBCol>
          <MDBInputGroup className="mb-3" textBefore="Methamphetamine:">
            <select
              className="form-control"
              name="met"
              value={results?.met || undefined}
              onChange={handleResult}
            >
              <option></option>
              <option value="0" style={{ backgroundColor: "yellow" }}>
                Negative
              </option>
              <option value="1" style={{ backgroundColor: "red" }}>
                Positive
              </option>
            </select>
          </MDBInputGroup>
          <MDBInputGroup className="mb-3" textBefore="Tetrahidrocannabinol:">
            <select
              className="form-control"
              name="thc"
              value={results?.thc || undefined}
              onChange={handleResult}
            >
              <option></option>
              <option value="0" style={{ backgroundColor: "yellow" }}>
                Negative
              </option>
              <option value="1" style={{ backgroundColor: "red" }}>
                Positive
              </option>
            </select>
          </MDBInputGroup>
        </MDBCol>
      </MDBRow>
    </div>
  );
}
