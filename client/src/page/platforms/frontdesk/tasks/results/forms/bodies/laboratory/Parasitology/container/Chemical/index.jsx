import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ph,
  resultInBool,
} from "../../../../../../../../../../../assets/references";
import { MDBInputGroup } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch(),
    [ce, setCe] = useState([null, null]);

  useEffect(() => {
    setCe(params?.ce || [null, null]);
  }, [params]);

  const handleCe = (e) => {
    const { name, value } = e.target;
    let _ce = [...ce];
    ce[name === "ph" ? 0 : 1] = parseInt(value);
    dispatch(SETPARAMS({ ...params, ce: _ce }));
  };
  return (
    <div>
      <MDBInputGroup className="mb-3" textBefore="Stool pH">
        <select
          name="ph"
          className=" form-control "
          value={ce[0]}
          onChange={handleCe}
        >
          <option />
          {ph.map((p, index) => (
            <option value={index}>{p}</option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Occult Blood">
        <select
          name="ob"
          className=" form-control "
          value={ce[1]}
          onChange={handleCe}
        >
          <option />
          {resultInBool.map((value, index) => (
            <option value={index}>{value}</option>
          ))}
        </select>
      </MDBInputGroup>
    </div>
  );
};

export default Index;
