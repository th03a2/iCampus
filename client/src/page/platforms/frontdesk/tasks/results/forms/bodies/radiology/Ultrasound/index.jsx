import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBInputGroup,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { update, setCluster } from "../../../../redux/Branch/actions";
// import Printout from "../../Printout";
import useAuth from "../../../../hooks/useAuth";

const Index = ({ is_protected, cluster, form, signatories }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState(null);
  const [ecg, setEcg] = useState({
    interpretation: undefined,
    impression: undefined,
  });

  const { auth } = useAuth();

  useEffect(() => {
    setServices(cluster.services);
    setEcg({
      interpretation: cluster.interpretation,
      impression: cluster.impression,
    });
  }, [cluster]);

  const handleRemarks = e => {
    const { name, value } = e.target;
    setEcg({ ...ecg, [name]: value });
  };
  const handleSave = will_post => {
    dispatch(setCluster(cluster));
    // let _result = {};
    // services.map(({ id, result }) => (_result[id] = result));
    let params = {
      interpretation: ecg.interpretation,
      impression: ecg.impression,
      signatories: signatories,
      has_published: will_post,
      user_id: auth.id,
    };

    dispatch(update(`record/${form}/${cluster.id}/publish`, params, false));
    if (will_post) window.print();
  };

  return (
    <>
      {/* <Printout is_duplicate={true} /> */}
      <MDBCard className="gui-viewer" style={{ minHeight: 500 }}>
        <MDBCardHeader className="py-0">
          <h2>{form?.toLocaleUpperCase()}</h2>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBInputGroup
            className="mb-3"
            prepend="Interpretation"
            inputs={
              <textarea
                className="form-control"
                rows={7}
                name="interpretation"
                value={ecg.interpretation || ""}
                onChange={handleRemarks}
              />
            }
          />
          <MDBInputGroup
            className="mb-3"
            prepend="Impression"
            inputs={
              <textarea
                className="form-control"
                rows={5}
                name="impression"
                value={ecg.impression || ""}
                onChange={handleRemarks}
              />
            }
          />
        </MDBCardBody>
        <MDBCardFooter className="py-0">
          <MDBCol md="6" className="offset-6">
            <MDBBtnGroup className="d-flex justify-center ">
              {is_protected && !cluster.created_at ? (
                <button className="btn btn-danger" onClick={window.print}>
                  Print
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSave(true)}
                  >
                    Post
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave(false)}
                  >
                    Save
                  </button>
                </>
              )}
            </MDBBtnGroup>
          </MDBCol>
        </MDBCardFooter>
      </MDBCard>
    </>
  );
};

export default Index;
