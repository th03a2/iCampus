import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Statement } from "../../../../../../fakeDb";

export default function Index({ visibility, setVisibility, model, key }) {
  const { theme } = useSelector(({ auth }) => auth);

  // const statementHandler = e => alert(e.target.value);
  return (
    <MDBModal show={visibility} setShow={setVisibility}>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Add New</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setVisibility(false)}
            />
          </MDBModalHeader>
          <MDBModalBody
            className={`${theme.bg} ${theme.text} gui-viewer`}
            style={{ minHeight: 500 }}
          >
            <MDBInputGroup className="mb-3" textBefore="Particular">
              <select
                className="form-control custom-select  "
                // onChange={handleChem}
                // value={ce[1]}
                id={1}
              >
                <option value=""></option>
                {Statement.category("liabilities").map(({ id, title }) => (
                  <option value={id}>{title}</option>
                ))}
              </select>
            </MDBInputGroup>
            <MDBInputGroup className="mb-3" textBefore="Company">
              <select
                className="form-control custom-select  "
                // onChange={handleChem}
                // value={ce[1]}
                id={1}
              >
                <option value=""></option>
                {Statement.category("liabilities").map(({ id, title }) => (
                  <option value={id}>{title}</option>
                ))}
              </select>
            </MDBInputGroup>
            <MDBInputGroup className="mb-3" textBefore="Financial Statement">
              <select
                className="form-control custom-select  "
                // onChange={handleChem}
                // value={ce[1]}
                id={1}
              >
                <option value=""></option>
                {Statement.category("liabilities").map(({ id, title }) => (
                  <option value={id}>{title}</option>
                ))}
              </select>
            </MDBInputGroup>
            <MDBInput
              type="text"
              label="Due"
              name="due"
              contrast={theme.dark}
              // defaultValue={form?.fullName?.fname}
              required
            />
            <MDBInput
              type="text"
              label="Amount"
              name="amount"
              contrast={theme.dark}
              // defaultValue={form?.fullName?.fname}
              required
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
