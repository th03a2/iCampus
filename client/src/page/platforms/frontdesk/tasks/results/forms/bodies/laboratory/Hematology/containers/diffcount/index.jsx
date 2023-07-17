import React, { useState, useEffect } from "react";
import Overview from "./overview";
import { enquireAvailable } from "../preference";
import { useSelector, useDispatch } from "react-redux";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";
import { diffToArray, diffToObject } from "../preference";
const Index = () => {
  const { theme } = useSelector(({ auth }) => auth),
    { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [diff, setDiff] = useState([0, 0, 0, 0, 0, 0]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (params?.dc) {
      setDiff(diffToArray(params.dc));
      setTotal(diff.reduce((x, y) => x + y));
    }
  }, [params, diff]);

  const diffrentialHandler = (e) => {
    const { id, value } = e.target;
    setTotal(enquireAvailable(Number(value), total));
    let _diff = [...diff];
    _diff[id] = Number(value);
    dispatch(SETPARAMS({ ...params, dc: diffToObject(_diff) }));
  };

  return (
    <div>
      <MDBTable align="middle" hover responsive color={theme.color} striped>
        <MDBTableHead>
          <tr>
            <th>Category</th>
            <th>Result</th>
            <th>Reference</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {diff?.map((value, index) => (
            <Overview
              index={index}
              value={value === 0 ? "" : value}
              total={total}
              diffrentialHandler={diffrentialHandler}
            />
          ))}
        </MDBTableBody>
      </MDBTable>
      <div
        id="countWarning"
        className="mx-auto text-center"
        style={{ display: total >= 101 ? "block" : "none" }}
      >
        <div>you have exceed the quota</div>
      </div>
    </div>
  );
};

export default Index;
