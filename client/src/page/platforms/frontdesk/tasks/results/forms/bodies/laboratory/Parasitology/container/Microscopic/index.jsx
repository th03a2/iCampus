import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  microscopicInRange,
  bacteriaInRange,
  microscopicResultInWord,
} from "../../../../../../../../../../../assets/references";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch(),
    [me, setMe] = useState([null, null, null, null, null]);
  useEffect(() => {
    setMe(params?.me || [null, null, null, null, null]);
  }, [params]);
  const handleMe = e => {
    const { name, value } = e.target;
    let _me = [...me];
    switch (name) {
      case "pc":
        _me[0] = parseInt(value);
        break;
      case "rbc":
        _me[1] = parseInt(value);
        break;
      case "bac":
        _me[2] = parseInt(value);
        break;
      case "yc":
        _me[3] = parseInt(value);
        break;
      default:
        _me[4] = parseInt(value);
        break;
    }
    dispatch(SETPARAMS({ ...params, me: _me }));
  };

  return (
    <div>
      <MDBInputGroup className="mb-3" textBefore="Pus cells">
        <select
          className=" form-control "
          name="pc"
          value={me[0]}
          onChange={handleMe}
        >
          <option />
          {microscopicInRange.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="RBC">
        <select
          className=" form-control "
          name="rbc"
          value={me[1]}
          onChange={handleMe}
        >
          <option />
          {microscopicInRange.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Bacteria">
        <select
          name="bac"
          className="form-control  "
          value={me[2]}
          onChange={handleMe}
        >
          <option />
          {bacteriaInRange.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Yeast Cells">
        <select
          name="yc"
          className=" form-control  "
          value={me[3]}
          onChange={handleMe}
        >
          <option />
          {microscopicResultInWord.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Fat Globules">
        <select
          name="fg"
          className=" form-control  "
          value={me[4]}
          onChange={handleMe}
        >
          <option />
          {microscopicResultInWord.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
    </div>
  );
};

export default Index;
