import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETPARAMS } from "../../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { theme } = useSelector(({ auth }) => auth),
    { params } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  const [apc, setApc] = useState(0);
  useEffect(() => {
    setApc(params?.apc || 0);
  }, [params]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <MDBTableHead>
        <tr>
          <th>Category</th>
          <th>Result</th>
          <th>Reference</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr id="tr-plt">
          <th>APC</th>
          <td>
            <MDBInput
              type="number"
              value={apc === 0 ? "" : apc}
              contrast={theme.dark}
              style={{
                color: apc < 150 ? "red" : apc > 400 && "red",
              }}
              onChange={(e) =>
                dispatch(
                  SETPARAMS({ ...params, apc: parseInt(e.target.value) })
                )
              }
            />
          </td>
          <td>
            150-400x10 <sup>9</sup>/L
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
};

export default Index;
