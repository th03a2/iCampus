import React from "react";
import {
  MDBModalFooter,
  MDBBtnGroup,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE,
  SETPARAMS,
  SETREMARKS,
} from "../../../../../../redux/slices/task/forms";
export default function Index() {
  const { token } = useSelector(({ auth }) => auth),
    {
      form,
      packages,
      params,
      remarks,
      signatories,
      is_protected,
      id,
      created_at,
    } = useSelector(({ task }) => task),
    dispatch = useDispatch();

  const saveHandler = async hasDone => {
    let data = {
      remarks,
      signatories,
      hasDone,
    };
    console.log(params);
    switch (form) {
      case "chemistry":
      case "serology":
        data = { ...data, packages };
        break;
      default:
        data = { ...data, ...params };
        break;
    }

    dispatch(UPDATE({ form, data, id, token }));
  };

  const healthyHandler = () => {
    let data = {};
    if (form === "urinalysis") {
      // it depend if male or female?
      data = {
        me: [1, 0, 0, 1, 0, 0],
        ce: [0, 0, 0, 0, 0, 0, 0, 0],
        pe: [2, 0, 1, 1],
      };
    } else {
      data = { me: [0, 0, 0, 0, 0], pe: [0, 0] };
      dispatch(SETREMARKS("No Ova nor Parasite Seen"));
    }
    dispatch(SETPARAMS(data));
  };
  console.log();
  return (
    <MDBModalFooter>
      {is_protected && !created_at ? (
        <MDBBtn color="danger" onClick={() => saveHandler(true)}>
          Print
        </MDBBtn>
      ) : (
        <MDBRow className="w-100">
          {["parasitology", "urinalysis"].includes(form) && (
            <MDBCol>
              <MDBBtn color="secondary" onClick={healthyHandler}>
                Healthy Client
              </MDBBtn>
            </MDBCol>
          )}

          <MDBCol className="text-end">
            &nbsp;
            {signatories[0] === undefined && (
              <label htmlFor="">No Performer Assigned</label>
            )}
            &nbsp;
            {signatories[1] === undefined && (
              <label htmlFor="">No Pathologist Assigned</label>
            )}
            &nbsp;
            <MDBBtnGroup>
              {signatories[0] !== undefined &&
                signatories[1] !== undefined &&
                signatories[2] !== undefined && (
                  <MDBBtn color="primary" onClick={() => saveHandler(true)}>
                    post
                  </MDBBtn>
                )}
              <MDBBtn color="success" onClick={() => saveHandler(false)}>
                save
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      )}
    </MDBModalFooter>
  );
}
