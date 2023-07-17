import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
const initials = { bt: null, rh: null };

export default function BloodTyping() {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [results, setResults] = useState(initials);
  useEffect(() => {
    params?.results && setResults(params.results);
  }, [params]);

  const handleResult = e => {
    const { name, value } = e.target;
    const _results = { ...results };
    _results[name] = value;
    dispatch(SETPARAMS({ ...params, results: _results }));
  };

  return (
    <div>
      <MDBRow>
        <MDBCol md="12">
          <h5> RESULTS</h5>
        </MDBCol>
        <MDBCol>
          <MDBInputGroup className="mb-3" textBefore="Blood Type:">
            <select
              className="form-control"
              name="bt"
              value={results?.bt || undefined}
              onChange={handleResult}
            >
              <option></option>
              <option value="0" style={{ backgroundColor: "yellow" }}>
                A
              </option>
              <option value="1" style={{ backgroundColor: "red" }}>
                B
              </option>
              <option value="2" style={{ backgroundColor: "blue" }}>
                O
              </option>
              <option value="3">AB</option>
            </select>
          </MDBInputGroup>
          <MDBInputGroup className="mb-3" textBefore="RH:">
            <select
              className="form-control"
              name="rh"
              value={results?.rh || undefined}
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
