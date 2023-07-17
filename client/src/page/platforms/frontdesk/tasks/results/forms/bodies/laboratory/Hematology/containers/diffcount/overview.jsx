import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { preference, differentialCategory } from "../preference";

const Overview = ({ index, value, diffrentialHandler }) => {
  const { theme } = useSelector(({ auth }) => auth);
  const key = differentialCategory[index];
  const { lo, hi } = preference["differentials"][key];
  return (
    <tr id={`tr-${index}`}>
      <th>{key}</th>
      <td>
        <MDBInput
          type="number"
          id={index}
          value={value || ""}
          contrast={theme.dark}
          style={{
            color: value && (value < lo ? "red" : value > hi && "red"),
          }}
          className="cellCount"
          onChange={diffrentialHandler}
        />
      </td>
      <td>
        {lo} - {hi}
      </td>
    </tr>
  );
};

export default Overview;
