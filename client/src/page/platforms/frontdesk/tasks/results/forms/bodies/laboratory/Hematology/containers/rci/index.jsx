import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { preference, rciCategory } from "../preference";
import Overview from "./overview";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [rci, setRci] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const _rci = params.rci.length > 0 ? params.rci : [0, 0, 0, 0];
    setRci(_rci);
  }, [params]);

  const handleValue = (e) => {
    const { id, value } = e.target;
    let _rci = [...rci];
    _rci[id] = id === "2" ? parseInt(value) : parseFloat(value);
    dispatch(SETPARAMS({ ...params, rci: _rci }));
  };

  return (
    <table className="table  table-responsive-md table-hover text-center striped">
      <thead>
        <tr>
          <th>Category</th>
          <th>Result</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>
        {rci?.map((value, index) => (
          <Overview
            index={index}
            value={value === 0 ? "" : value}
            reference={preference["rci"][rciCategory[index]]}
            handleValue={handleValue}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Index;
