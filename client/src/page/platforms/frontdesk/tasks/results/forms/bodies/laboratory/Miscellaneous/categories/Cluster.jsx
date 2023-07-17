import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
import { Services } from "../../../../../../../../../../fakeDb";
// HIV : 68
// Syphilis |RPR :69
// HBsAg :70
// HCV : 97
// HAV :131
export default function Cluster() {
  const { params, packages } = useSelector(({ task }) => task),
    [results, setResults] = useState(),
    dispatch = useDispatch();

  useEffect(() => {
    params?.results ? setResults(params.results) : setResults({});
  }, [params]);

  const handleResult = e => {
    const { name, value } = e.target;
    const _results = { ...results, [name]: value };
    dispatch(SETPARAMS({ ...params, results: _results }));
  };

  return (
    <div>
      <MDBRow>
        <MDBCol md="12">
          <h5> RESULTS :</h5>
        </MDBCol>
        <MDBCol>
          {packages?.map(pk => (
            <MDBInputGroup
              className="mb-3"
              textBefore={`${Services.find(pk).abbreviation} :`}
            >
              <select
                className="form-control"
                name={pk}
                // value={results[pk] || undefined}
                onChange={handleResult}
              >
                <option></option>
                <option value={false}>NON-REACTIVE </option>
                <option value={true} style={{ backgroundColor: "red" }}>
                  REACTIVE
                </option>
              </select>
            </MDBInputGroup>
          ))}
        </MDBCol>
      </MDBRow>
    </div>
  );
}
