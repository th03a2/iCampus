import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fecalColor,
  consistency,
} from "../../../../../../../../../../../assets/references";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [pe, setPe] = useState([null, null]);

  useEffect(() => {
    setPe(params?.pe || [null, null]);
  }, [params]);

  const valueHandler = e => {
    const { name, value } = e.target;
    let _pe = [...pe];
    _pe[name === "color" ? 0 : 1] = parseInt(value);
    dispatch(SETPARAMS({ ...params, pe: _pe }));
  };

  return (
    <div>
      <MDBInputGroup className="mb-3" textBefore="Color">
        <select
          className=" form-control"
          name="color"
          value={pe[0]}
          onChange={valueHandler}
        >
          <option />
          {fecalColor.map((color, index) => (
            <option value={index}>{color}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Consistency">
        <select
          name="cons"
          className="  form-control"
          value={pe[1]}
          onChange={valueHandler}
        >
          <option />
          {consistency.map((name, index) => (
            <option value={index}>{name}</option>
          ))}
        </select>
      </MDBInputGroup>
    </div>
  );
};

export default Index;
