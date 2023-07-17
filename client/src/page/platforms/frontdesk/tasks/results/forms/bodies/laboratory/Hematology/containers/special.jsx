import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";
const Special = () => {
  // Reticulocytes:140
  // ESR: 144
  const { packages, params } = useSelector(({ task }) => task),
    [troupe, setTroupe] = useState({}),
    dispatch = useDispatch();

  useEffect(() => {
    params?.troupe && setTroupe(params.troupe);
  }, [params, setTroupe]);

  const troupeHandler = e => {
    const { name, value } = e.target;
    let _troupe = { ...troupe, [name]: Number(value) };
    dispatch(SETPARAMS({ ...params, troupe: _troupe }));
  };

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
        {packages.includes(62) && (
          <tr id="tr-retic">
            <td>Reticulocytes</td>
            <td>
              <input
                type="number"
                name="retic"
                id="retic"
                className="form-control"
                onChange={e => troupeHandler(e)}
                value={troupe?.retic}
              />
            </td>
            <td>0.5-1.5%</td>
          </tr>
        )}
        {packages.includes(63) && (
          <tr id="tr-esr">
            <td>ESR</td>
            <td>
              <input
                type="number"
                name="esr"
                id="esr"
                className="form-control"
                onChange={e => troupeHandler(e)}
                value={troupe?.esr}
              />
            </td>
            <td>0-15 mm/hr</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Special;
