import React, { useState, useEffect } from "react";
import { MDBInputGroup } from "mdb-react-ui-kit";
import {
  microscopicInRange,
  microscopicResultInWord,
} from "../../../../../../../../../../assets/references";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch(),
    [me, setMe] = useState([null, null, null, null, null, null]);
  useEffect(() => {
    setMe(params?.me || [null, null, null, null, null, null]);
  }, [params]);
  const handleMicro = e => {
    const { id, value } = e.target;
    let _me = [...me];
    _me[id] = parseInt(value);
    dispatch(SETPARAMS({ ...params, me: _me }));
  };

  return (
    <>
      <MDBInputGroup className="mb-3" textBefore="Pus Cells">
        <select
          className="form-control"
          value={me[0]}
          onChange={handleMicro}
          id={0}
        >
          <option></option>
          {microscopicInRange.map((value, Index) => (
            <option
              style={{ backgroundColor: Index === 2 && "skyblue" }}
              value={Index}
            >
              {value}
            </option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Red Cells">
        <select
          className="form-control custom-select "
          value={me[1]}
          onChange={handleMicro}
          id={1}
        >
          <option></option>
          {microscopicInRange.map((value, Index) => (
            <option
              style={{ backgroundColor: Index === 1 && "skyblue" }}
              value={Index}
            >
              {value}
            </option>
          ))}
        </select>
      </MDBInputGroup>
      <MDBInputGroup className="mb-3 mr-5" textBefore="Epithelial cell">
        {microscopicResultInWord.map((value, index) => (
          <label className="mr-3 ml-5">
            <input
              type="radio"
              id={2}
              className="mr-5 ml-5"
              data-id={2}
              value={index}
              checked={me[2] === index && true}
              onClick={handleMicro}
            />
            {value}
          </label>
        ))}
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Mucus Threads">
        {microscopicResultInWord.map((value, index) => (
          <label className="mr-3">
            <input
              type="radio"
              id={3}
              className="mr-1"
              data-id={3}
              value={index}
              checked={me[3] === index && true}
              onClick={handleMicro}
            />
            {value}
          </label>
        ))}
      </MDBInputGroup>
      <MDBInputGroup textBefore="Amorphous Urates">
        {microscopicResultInWord.map((value, index) => (
          <label className="mr-3">
            <input
              type="radio"
              id={4}
              className="mr-1"
              data-id={4}
              value={index}
              checked={me[4] === index && true}
              onClick={handleMicro}
            />
            {value}
          </label>
        ))}
      </MDBInputGroup>
      <MDBInputGroup className="mb-3" textBefore="Bacteria">
        {microscopicResultInWord.map((value, index) => (
          <label className="mr-3">
            <input
              type="radio"
              id={5}
              className="mr-1"
              data-id={5}
              value={index}
              checked={me[5] === index && true}
              onClick={handleMicro}
            />
            {value}
          </label>
        ))}
      </MDBInputGroup>
    </>
  );
};

export default Index;
