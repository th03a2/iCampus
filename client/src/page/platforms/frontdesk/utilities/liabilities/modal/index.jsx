import React, { useState } from "react";
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
  const { theme } = useSelector(({ auth }) => auth),
    [isPerson, setIsPerson] = useState(true),
    [bill, setBill] = useState({});

  const handleBill = e => {
    const { name, value } = e.target;
    const _bill = { ...bill, [name]: value };
    setBill(_bill);
  };
  const handleParticulars = e =>
    setIsPerson(e.target.value === "1" ? true : false);
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
                onChange={handleParticulars}
              >
                <option value="1">Person</option>
                <option value="0">Vendor</option>
              </select>
            </MDBInputGroup>
            {isPerson ? (
              <MDBInputGroup className="mb-3" textBefore="Person">
                <select
                  className="form-control custom-select  "
                  onChange={handleBill}
                  value={bill.particular}
                  name="particular"
                >
                  <option value=""></option>
                  {Statement.category("liabilities").map(({ id, title }) => (
                    <option value={id}>{title}</option>
                  ))}
                </select>
              </MDBInputGroup>
            ) : (
              <MDBInputGroup className="mb-3" textBefore="Company">
                <select
                  className="form-control custom-select  "
                  onChange={handleBill}
                  value={bill.vendorId}
                  name="vendorId"
                >
                  <option value=""></option>
                  {Statement.category("liabilities").map(({ id, title }) => (
                    <option value={id}>{title}</option>
                  ))}
                </select>
              </MDBInputGroup>
            )}
            <MDBInputGroup className="mb-3" textBefore="Financial Statement">
              <select
                className="form-control custom-select  "
                onChange={handleBill}
                value={bill.fsId}
                name="fsId"
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
              required
            />
            <MDBInput
              type="text"
              label="Amount"
              name="amount"
              contrast={theme.dark}
              onChange={handleBill}
              // defaultValue={form?.fullName?.fname}
              required
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
