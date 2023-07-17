import React, { useState, useEffect } from "react";
import {
  MDBTabsContent,
  MDBCardBody,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsPane,
  MDBBtn,
} from "mdb-react-ui-kit";
import Troupe from "./troupe";
import { useSelector, useDispatch } from "react-redux";
import { bodySwitcher } from "./bodySwitcher";
import { Cluster } from "./categories";
import {
  SETPARAMS,
  SETSIGNATORIES,
} from "../../../../../../../../../redux/slices/task/forms";

const Index = ({ is_protected }) => {
  const { auth } = useSelector(({ auth }) => auth),
    { packages, params, form } = useSelector(({ task }) => task),
    [specimen, setSpecimen] = useState(""),
    dispatch = useDispatch();

  let FormBody = bodySwitcher(packages);

  useEffect(() => {
    dispatch(SETSIGNATORIES({ encoder: auth?._id, section: form }));
  }, [auth, dispatch, form]);

  useEffect(() => {
    params?.specimen && setSpecimen(params.specimen);
  }, [params]);

  const [verticalActive, setVerticalActive] = useState("tab1");

  const handleVerticalClick = value =>
    value !== verticalActive && setVerticalActive(value);
  const handleParams = e => {
    const { name, value } = e.target;
    dispatch(SETPARAMS({ ...params, [name]: value }));
  };

  return (
    <>
      <MDBCardBody>
        <h2 className="text-center">Description</h2>
        <MDBRow>
          <MDBCol size="3">
            {"name" !== "BLOOD TYPING + RH" && (
              <MDBTabs className="flex-column text-center ">
                <MDBBtn
                  className="mb-2"
                  color="info"
                  outline={verticalActive === "tab1"}
                  onClick={() => handleVerticalClick("tab1")}
                >
                  Results
                </MDBBtn>
                <MDBBtn
                  color="info"
                  outline={verticalActive === "tab2"}
                  onClick={() => handleVerticalClick("tab2")}
                >
                  Kit Details
                </MDBBtn>
              </MDBTabs>
            )}
          </MDBCol>
          <MDBCol size="9">
            <MDBTabsContent>
              <MDBTabsPane show={verticalActive === "tab1"}>
                <MDBInput
                  label="Specimen"
                  icon="envelope"
                  type="text"
                  name="specimen"
                  value={specimen}
                  className="my-2"
                  onChange={handleParams}
                />
                <FormBody />
                {/* {model?.packages.length === 1 ? (
                  
                ) : (
                  <Cluster
                    result={result}
                    setResult={setResult}
                    services={services}
                  />
                )} */}
              </MDBTabsPane>
              <MDBTabsPane show={verticalActive === "tab2"}>
                <Troupe />
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </>
  );
};

export default Index;
