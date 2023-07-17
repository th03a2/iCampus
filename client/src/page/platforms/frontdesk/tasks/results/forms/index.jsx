import React, { useEffect } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { formColors } from "../../../../../../assets/references";
import { SETREMARKS } from "../../../../../../redux/slices/task/forms";
import { SETSIGNATORIES } from "../../../../../../redux/slices/task/forms";

import Headers from "./headers";
import { bodySwitcher } from "./bodies/bodySwitcher";
import Footers from "./footers";

export default function Index() {
  const { theme, auth } = useSelector(({ auth }) => auth),
    { visibility, form, remarks } = useSelector(({ task }) => task),
    dispatch = useDispatch();
  console.log("form", form);
  let FormBody = bodySwitcher(form);

  useEffect(() => {
    dispatch(SETSIGNATORIES({ encoder: auth?._id, section: form }));
  }, [auth, dispatch, form]);
  return (
    <MDBModal staticBackdrop show={visibility} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <Headers />
          <MDBModalBody>
            <MDBCard
              className={`${theme.bg} ${theme.text} gui-viewer`}
              style={{ minHeight: 500 }}
            >
              <MDBCardHeader className="p-0">
                <span
                  className={`alert alert-${formColors(
                    form
                  )} d-block text-center text-uppercase py-2 mb-0`}
                >
                  <h5
                    className="mb-0 fw-bold"
                    style={{ letterSpacing: "30px" }}
                  >
                    {form}
                  </h5>
                </span>
              </MDBCardHeader>
              <MDBCardBody>
                <FormBody />
              </MDBCardBody>
              <MDBCardFooter>
                <MDBInput
                  label="Remarks"
                  contrast={theme.dark}
                  value={remarks || ""}
                  onChange={e => dispatch(SETREMARKS(e.target.value))}
                />
              </MDBCardFooter>
            </MDBCard>
          </MDBModalBody>
          <Footers />
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
