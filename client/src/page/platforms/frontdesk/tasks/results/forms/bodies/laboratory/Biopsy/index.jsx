import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCol,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { update } from "../../../../../../../../../redux/sqlbuilder";
import Overview from "./overview";

const Index = ({ is_protected, cluster, gender, signatories }) => {
  const [services, setServices] = useState(null);
  const [signatories, setSignatories] = useState([]);
  const [remarks, setRemarks] = useState(null);

  useEffect(() => {
    const _signatories = JSON.parse(localStorage.getItem(`signatories`));
    const performer = _signatories["Biopsy"];
    const pathologist = _signatories["patho"];
    setSignatories([performer, pathologist, auth?._id]);
    setServices(cluster.services);
    setRemarks(cluster.remarks);
  }, [cluster]);

  const handleResult = e => {
    const { id, value } = e.target;
    let _service = services.find(service => service.id === parseInt(id));
    _service.result = parseFloat(value);
    const _services = services.map(service =>
      service.id === id ? _service : service
    );
    setServices(_services);
  };

  const handleRemarks = e => {
    const { value } = e.target;
    setRemarks(value);
  };
  const handleSave = async hasDone => {
    let packages = {};
    services.map(({ id, result }) => (packages[id] = result));
    let params = {
      packages,
      remarks,
      signatories,
      hasDone,
      user_id: auth.id,
    };
    const task = await update(
      `results/laboratory/biopsy`,
      params,
      model._id,
      token
    );
    if (task && hasDone) {
      localStorage.setItem(`task-printout`, JSON.stringify(task));
      window.open(
        `/result/${form}/printout`,
        "Result",
        "top=100px,width=500px,height=650px"
      );
    }
  };

  return (
    <>
      {/* <Printout is_duplicate={true} /> */}
      <MDBCard className="gui-viewer" style={{ minHeight: 500 }}>
        <MDBCardHeader className="py-0">
          <h2>{form?.toLocaleUpperCase()}</h2>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBTable>
            <MDBTableHead>
              <tr className="text-center">
                <th rowSpan={2} width="5%">
                  #
                </th>
                <th rowSpan={2} width="55%">
                  Services
                </th>
                <th rowSpan={2} width="15%">
                  Results
                </th>
                <th colSpan={2} width="25%">
                  Conventional Unit
                </th>
              </tr>
              <tr>
                <th>Reference</th>
                <th>Units</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {services?.map((deal, index) => (
                <Overview
                  deal={deal}
                  index={index}
                  handleResult={handleResult}
                />
              ))}
            </MDBTableBody>
          </MDBTable>
          <div className="input-group margin">
            <div className="input-group-addon">
              <span className="input-group-text">Remarks</span>
            </div>

            <input
              className="form-control"
              value={remarks}
              onChange={handleRemarks}
            />
          </div>
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
