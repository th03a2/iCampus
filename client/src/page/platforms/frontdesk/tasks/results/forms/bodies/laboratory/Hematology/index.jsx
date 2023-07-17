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
import {
  CellCount,
  DiffCount,
  Rci,
  Platelet,
  Special,
  Blood,
} from "./containers";
import { useSelector, useDispatch } from "react-redux";
import { SETSIGNATORIES } from "../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { theme, auth } = useSelector(({ auth }) => auth),
    { patron, packages } = useSelector(({ task }) => task),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(SETSIGNATORIES({ encoder: auth?._id, section: "chemistry" }));
  }, [auth, dispatch]);

  const [tab, setTab] = useState("tab1");
  //  packages?.includes(60) ? "tab6" : packages?.includes(59) ? "tab4" : "tab1";
  const handleVerticalClick = value => value === tab || setTab(value);

  return (
    <>
      <MDBCardBody>
        <MDBRow>
          <MDBCol size="3" className="border-end border-secondary">
            <MDBTabs className="flex-column text-center">
              {packages?.includes(58) && (
                <>
                  <MDBBtn
                    color="info"
                    outline={tab === "tab1"}
                    className={`${
                      tab === "tab1" ? "text-dark" : theme.text
                    } mb-2`}
                    onClick={() => handleVerticalClick("tab1")}
                  >
                    Cell Count
                  </MDBBtn>
                  <MDBBtn
                    color="primary"
                    outline={tab === "tab2"}
                    className={`${
                      tab === "tab2" ? "text-dark" : theme.text
                    } mb-2`}
                    onClick={() => handleVerticalClick("tab2")}
                  >
                    Diff Count
                  </MDBBtn>
                  <MDBBtn
                    color="secondary"
                    outline={tab === "tab3"}
                    className={`${
                      tab === "tab3" ? "text-dark" : theme.text
                    } mb-2`}
                    onClick={() => handleVerticalClick("tab3")}
                  >
                    RCI
                  </MDBBtn>
                </>
              )}
              {packages?.includes(59) && (
                <MDBBtn
                  color="denger"
                  outline={tab === "tab4"}
                  onClick={() => handleVerticalClick("tab4")}
                  className={`${
                    tab === "tab4" ? "text-dark" : theme.text
                  } mb-2`}
                >
                  Platelet
                </MDBBtn>
              )}
              {(packages?.includes(60) || packages?.includes(61)) && (
                <MDBBtn
                  color="denger"
                  onClick={() => handleVerticalClick("tab5")}
                  active={tab === "tab5"}
                  className={`${
                    tab === "tab5" ? "text-dark" : theme.text
                  } mb-2`}
                >
                  Clotting factor
                </MDBBtn>
              )}
              {(packages?.includes(62) || packages?.includes(63)) && (
                <MDBBtn
                  color="denger"
                  className={`${
                    tab === "tab6" ? "text-dark" : theme.text
                  } mb-2`}
                  onClick={() => handleVerticalClick("tab6")}
                  active={tab === "tab6"}
                >
                  Special Test
                </MDBBtn>
              )}
            </MDBTabs>
          </MDBCol>
          <MDBCol size="9">
            <MDBTabsContent>
              <MDBTabsPane show={tab === "tab1"}>
                <CellCount />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab2"}>
                <DiffCount />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab3"}>
                <Rci />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab4"}>
                <Platelet />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab5"}>
                <Blood ct={[3, 2]} bt={[4, 2]} />
              </MDBTabsPane>
              <MDBTabsPane show={tab === "tab6"}>
                <Special retic={1.8} esr={15} gender={patron?.gender} />
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </>
  );
};

export default Index;
