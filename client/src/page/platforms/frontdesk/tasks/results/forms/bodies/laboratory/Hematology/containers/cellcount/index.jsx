import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { preference, cellAbbr } from "../preference";
import Overview from "./overview";
import { SETPARAMS } from "../../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { params, patron } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [gender, setGender] = useState(false);
  const [cells, setCells] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const _cells = params.cc.length !== 0 ? params.cc : [0, 0, 0, 0];
    setCells(_cells);
  }, [params]);
  useEffect(() => {
    setGender(patron.isMale);
  }, [patron]);
  const handleCells = e => {
    const { id, value } = e.target;
    let _cells = [...cells];
    _cells[id] = parseFloat(value);

    if (Number(id) === 0) {
      const hgb = value * 340;
      const rbc = value * 11;
      _cells[1] = parseInt(hgb.toFixed(0));
      _cells[2] = parseFloat(rbc.toFixed(2));
    }
    dispatch(SETPARAMS({ ...params, cc: _cells }));
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
        {cells?.map((value, index) => (
          <Overview
            index={index}
            value={value === 0 ? "" : value}
            reference={preference[gender ? "Male" : "Female"][cellAbbr[index]]}
            handleCells={handleCells}
          />
        ))}
      </tbody>
    </table>
  );
};

// Index.propTypes = {
//   cell: propTypes.array,
//   setCells: propTypes.function,
//   gender: propTypes.boolean,
// };

export default Index;
