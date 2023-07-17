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
    const _troupe = { ...troupe };
    _troupe[name] = value;
    dispatch(SETPARAMS({ ...params, troupe: _troupe }));
  };

  return (
    <MDBCol md="10" className="offset-1">
      <MDBInput
        icon="flask"
        name="method"
        label="Method :"
        className="my-1"
        onChange={troupeHandler}
        value={troupe.method || ""}
        required
      />
      <MDBInput
        icon="medkit"
        name="kit"
        label="Kit :"
        className="my-1"
        onChange={troupeHandler}
        value={troupe?.kit || ""}
      />
      <MDBInput
        icon="fingerprint"
        name="lot"
        label="lotNum :"
        className="my-1"
        onChange={troupeHandler}
        value={troupe?.lot || ""}
      />
      <MDBInput
        icon="calendar"
        name="expiry"
        label="Expiry :"
        className="my-1"
        onChange={troupeHandler}
        value={troupe?.expiry || ""}
      />
    </MDBCol>
  );
}
