import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBCol, MDBInput } from "mdb-react-ui-kit";
import { SETPARAMS } from "../../../../../../../../../redux/slices/task/forms";
const initial = {
  method: null,
  kit: null,
  lotNum: null,
  expiry: null,
};
export default function Troupe() {
  const { params } = useSelector(({ task }) => task),
    [troupe, setTroupe] = useState(initial),
    dispatch = useDispatch();
  useEffect(() => {
    params?.troupe && setTroupe(params.troupe);
  }, [params]);

  const troupeHandler = e => {
    const { name, value } = e.target;
    dispatch(SETPARAMS({ ...params, [name]: value }));
  };

  return (
    <MDBCol md="10" className="offset-1">
      <MDBInput
        icon="flask"
        name="ccf"
        label="CCF No:"
        className="my-1"
        onChange={troupeHandler}
        value={params.ccf || ""}
        required
      />
      <MDBInput
        icon="flask"
        name="method"
        label="Method :"
        className="my-1"
        onChange={troupeHandler}
        value={params.method || ""}
        required
      />
      <MDBInput
        icon="medkit"
        name="purpose"
        label="Purpose :"
        className="my-1"
        onChange={troupeHandler}
        value={params?.purpose || ""}
      />
      <MDBInput
        icon="fingerprint"
        name="company"
        label="Company :"
        className="my-1"
        onChange={troupeHandler}
        value={params?.company || ""}
      />
    </MDBCol>
  );
}
