import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch(),
    [ce, setCe] = useState([null, null, null, null, null, null, null, null]);

  useEffect(() => {
    setCe(params?.ce || [null, null, null, null, null, null, null, null]);
  }, [params]);

  const handleChem = e => {
    const { id, value } = e.target;
    let _ce = [...ce];
    _ce[id] = parseInt(value);
    dispatch(SETPARAMS({ ...params, ce: _ce }));
  };

  return (
    <MDBRow>
      <MDBCol size="6">
        <MDBInputGroup className="mb-3" textBefore="Sugar">
          <select
            className="form-control custom-select"
            value={ce[0]}
            onChange={handleChem}
            id={0}
          >
            <option></option>
            <option value="0" style={{ backgroundColor: "skyblue" }}>
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Protien">
          <select
            className="form-control custom-select  "
            onChange={handleChem}
            value={ce[1]}
            id={1}
          >
            <option value=""></option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Bilirubin">
          <select
            className="form-control custom-select "
            onChange={handleChem}
            value={ce[2]}
            id={2}
          >
            <option value=""></option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Ketone">
          <select
            className="form-control custom-select "
            onChange={handleChem}
            value={ce[3]}
            id={3}
          >
            <option value=""></option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol size="6">
        <MDBInputGroup className="mb-3" textBefore="Blood">
          <select
            className="form-control custom-select "
            onChange={handleChem}
            value={ce[4]}
            id={4}
          >
            <option value=""></option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Urobilinogen">
          <select
            className="form-control custom-select  "
            onChange={handleChem}
            value={ce[5]}
            id={5}
          >
            <option value=""> </option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Nitrate">
          <select
            className="form-control custom-select "
            onChange={handleChem}
            value={ce[6]}
            id={6}
          >
            <option value=""> </option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
        <MDBInputGroup className="mb-3" textBefore="Leukocytes">
          <select
            className="form-control custom-select "
            onChange={handleChem}
            value={ce[7]}
            id={7}
          >
            <option value=""> </option>
            <option style={{ backgroundColor: "skyblue" }} value="0">
              NEGATIVE
            </option>
            <option value="1">TRACE</option>
            <option value="2">+1</option>
            <option value="3">+2</option>
            <option value="4">+3</option>
            <option value="5">+4</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
    </MDBRow>
  );
};

export default Index;
