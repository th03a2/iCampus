import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";

const Blood = () => {
  const { packages, params } = useSelector(({ task }) => task),
    [troupe, setTroupe] = useState({ bt: [], ct: [] }),
    dispatch = useDispatch();

  useEffect(() => {
    params?.troupe && setTroupe(params.troupe);
  }, [params, setTroupe]);

  const troupeHandler = (e) => {
    const { name, value, dataset } = e.target;
    const { subname } = dataset;
    const NewArray = troupe[name];
    NewArray[Number(subname)] = value;
    let _troupe = { ...troupe, [name]: NewArray };

    console.log(_troupe);
    dispatch(SETPARAMS({ ...params, troupe: _troupe }));
  };
  // Bleeding time=61=bt: [2,1]
  // clotting time=62=ct:[3,0]

  return (
    <table className="table  table-responsive-md table-hover text-center">
      <thead>
        <tr>
          <th>Category</th>
          <th>Result</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>
        {packages?.includes(60) && (
          <tr>
            <th>Bleeding time</th>
            <td>
              <div style={{ position: "block" }}>
                <input
                  name="bt"
                  data-subname="0"
                  type="number"
                  className="form-control"
                  style={{ width: "50%", zIndex: 100, float: "left" }}
                  // value={troupe?.bt[0]}
                  onChange={troupeHandler}
                />
                <select
                  name="bt"
                  data-subname="1"
                  className="form-control"
                  style={{ width: "50%", float: "left" }}
                  // value={troupe?.bt[1]}
                  onChange={troupeHandler}
                >
                  <option></option>
                  <option value="0">00 sec.</option>
                  <option value="1">15 sec.</option>
                  <option value="2">30 sec.</option>
                  <option value="3">45 sec.</option>
                </select>
              </div>
            </td>
            <td>2-4 min</td>
          </tr>
        )}
        {packages?.includes(61) && (
          <tr>
            <th>Clotting time</th>
            <td>
              <div style={{ position: "block" }}>
                <input
                  name="ct[0]"
                  data-subname="0"
                  type="number"
                  className="form-control"
                  style={{ width: "50%", zIndex: 100, float: "left" }}
                  // value={troupe?.ct[0]}
                  onChange={troupeHandler}
                />
                <select
                  name="ct"
                  data-subname="1"
                  className="form-control"
                  style={{ width: "50%;", float: "left" }}
                  // value={troupe?.ct[1]}
                  onChange={troupeHandler}
                >
                  <option></option>
                  <option value="0">00 sec.</option>
                  <option value="1">15 sec.</option>
                  <option value="2">30 sec.</option>
                  <option value="3">45 sec.</option>
                </select>
              </div>
            </td>
            <td>2-4 min</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Blood;
