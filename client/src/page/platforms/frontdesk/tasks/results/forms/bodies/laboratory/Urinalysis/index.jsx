import React, { useState, useEffect } from "react";
import {
  MDBTabsContent,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsPane,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Microscopic, Physical, Chemical } from "./containers";
import { useSelector, useDispatch } from "react-redux";
import { SETSIGNATORIES } from "../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { auth } = useSelector(({ auth }) => auth),
    { form } = useSelector(({ task }) => task),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(SETSIGNATORIES({ encoder: auth?._id, section: form }));
  }, [auth, dispatch, form]);

  const [verticalActive, setVerticalActive] = useState("tab1");
  const handleVerticalClick = value =>
    value === verticalActive || setVerticalActive(value);

  return (
    <MDBCardBody>
      <MDBRow>
        <MDBCol size="3">
          <MDBTabs className="flex-column text-center">
            <MDBBtn
              color="info"
              className="mb-2"
              outline={verticalActive === "tab1"}
              onClick={() => handleVerticalClick("tab1")}
            >
              Physical
            </MDBBtn>
          </MDBTabs>
          <MDBTabs className="flex-column text-center">
            <MDBBtn
              color="primary"
              className="mb-2"
              outline={verticalActive === "tab2"}
              onClick={() => handleVerticalClick("tab2")}
            >
              Chemical
            </MDBBtn>
          </MDBTabs>
          <MDBTabs className="flex-column text-center">
            <MDBBtn
              color="secondary"
              outline={verticalActive === "tab3"}
              onClick={() => handleVerticalClick("tab3")}
            >
              Microscopic
            </MDBBtn>
          </MDBTabs>
        </MDBCol>
        <MDBCol size="9">
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === "tab1"}>
              <Physical />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === "tab2"}>
              <Chemical />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === "tab3"}>
              <Microscopic />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    </MDBCardBody>
  );
};

export default Index;
