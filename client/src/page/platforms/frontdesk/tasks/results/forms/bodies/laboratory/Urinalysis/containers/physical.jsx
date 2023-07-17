import React, { useState, useEffect } from "react";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch(),
    [pe, setPe] = useState([null, null, null, null, null, null]);

  useEffect(() => {
    setPe(params?.pe || [null, null, null, null, null, null]);
  }, [params]);

  const handleResults = e => {
    const { id, value } = e.target;
    let _pe = [...pe];
    _pe[id] = parseInt(value);
    dispatch(SETPARAMS({ ...params, pe: _pe }));
  };

  return (
    <div>
      <MDBInputGroup className="mb-3" textBefore="Color">
        <select
          className="form-control custom-select"
          value={pe[0]}
          onChange={handleResults}
          id={0}
        >
          <option></option>
          <option value="0">Very Light Yellow</option>
          <option value="1">Light Yellow</option>
          <option style={{ backgroundColor: "skyblue" }} value="2">
            Yellow
          </option>
          <option value="3">Dark Yellow</option>
          <option value="4">Reddish Yellow</option>
          <option value="5">Orange</option>
          <option value="6">Amber</option>
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Transparency">
        <select
          className="form-control custom-select "
          value={pe[1]}
          onChange={handleResults}
          id={1}
        >
          <option></option>
          <option style={{ backgroundColor: "skyblue" }} value="0">
            Clear
          </option>
          <option value="1">Sligthty Turbid</option>
          <option value="2">Turbid</option>
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Reaction/ pH">
        <select
          className="form-control custom-select "
          value={pe[3]}
          onChange={handleResults}
          id={3}
        >
          <option></option>
          <option value="0">5.0</option>
          <option style={{ backgroundColor: "skyblue" }} value="1">
            6.0
          </option>
          <option value="2">6.5</option>
          <option value="3">7.0</option>
          <option value="4">7.5</option>
          <option value="5">8.0</option>
          <option value="6">8.5</option>
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Specific Gravity">
        <select
          className="form-control custom-select "
          value={pe[2]}
          onChange={handleResults}
          id={2}
        >
          <option></option>
          <option value="0">1.005</option>
          <option style={{ backgroundColor: "skyblue" }} value="1">
            1.010
          </option>
          <option value="2">1.015</option>
          <option value="3">1.020</option>
          <option value="4">1.025</option>
          <option value="5">1.030</option>
        </select>
      </MDBInputGroup>
    </div>
  );
};

export default Index;
