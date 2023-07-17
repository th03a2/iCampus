import React, { useEffect, useState } from "react";
import {
  MDBTabsContent,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsPane,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Physical, Microscopic, Chemical, Occult } from "./container";
import { useSelector, useDispatch } from "react-redux";
import { SETSIGNATORIES } from "../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { theme, auth } = useSelector(({ auth }) => auth),
    { packages, form } = useSelector(({ task }) => task),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(SETSIGNATORIES({ encoder: auth?._id, section: form }));
  }, [auth, dispatch, form]);

  const [tab, setTab] = useState("tab1");
  const handleVerticalClick = value => value === tab || setTab(value);

  return (
    <>
      <MDBCardBody>
        <MDBRow>
          <MDBCol size="3">
            <MDBTabs className="flex-column text-center">
              <MDBBtn
                color="info"
                className={`${tab === "tab1" ? "text-dark" : theme.text} mb-2`}
                outline={tab === "tab1"}
                onClick={() => handleVerticalClick("tab1")}
              >
                Physical
              </MDBBtn>
              <MDBBtn
                color="primary"
                outline={tab === "tab2"}
                className={`${tab === "tab2" ? "text-dark" : theme.text} mb-2`}
                onClick={() => handleVerticalClick("tab2")}
              >
                Chemical
              </MDBBtn>
              <MDBBtn
                color="secondary"
                outline={tab === "tab3"}
                className={`${tab === "tab3" ? "text-dark" : theme.text}`}
                onClick={() => handleVerticalClick("tab3")}
              >
                Microscopic
              </MDBBtn>
            </MDBTabs>
          </MDBCol>
          <MDBCol size="9">
            <MDBTabsContent>
              <MDBTabsPane show={tab === "tab1"}>
                <Physical />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab2"}>
                <Chemical />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab3"}>
                <Microscopic />
              </MDBTabsPane>
              {packages?.includes(69) && (
                <MDBTabsPane show={tab === "tab4"}>
                  <Occult />
                </MDBTabsPane>
              )}
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </>
  );
};

export default Index;
