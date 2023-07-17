import React, { useState, useEffect } from "react";
import { MDBRow, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";

export default function Pregtest() {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [results, setResults] = useState(false);
  useEffect(() => {
    params?.results && setResults(params.results);
  }, [params]);
  const handleResult = e => {
    const { value } = e.target;
    dispatch(SETPARAMS({ ...params, results: value }));
  };

  return (
    <MDBRow>
      <MDBInputGroup className="mb-3" textBefore="RESULTS : Pregtest">
        <select
          className="form-control"
          value={results || undefined}
          onChange={handleResult}
        >
          <option></option>
          <option value="0">NEGATIVE</option>
          <option value="1" style={{ backgroundColor: "red" }}>
            POSITIVE
          </option>
        </select>
      </MDBInputGroup>
    </MDBRow>
  );
}
