import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { BROWSE } from "../../../../../../../../../redux/slices/subquery";
// import { BROWSE } from "../../../../../../../../redux/slices/assets/tieup";
import { SAVE } from "../../../../../../../../../redux/slices/commerce/sales";
import { nameFormatter } from "../../../../../../../../../components/utilities";

import ModalForm from "./form";

export default function SendoutModal({ sold, setVisibility, visibility }) {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth),
    { catalogs, isLoading } = useSelector(({ subquery }) => subquery),
    [vendor, setVendor] = useState(null),
    [inhouse, setInhouse] = useState([]),
    [packages, setPackages] = useState([]),
    dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      BROWSE({ entity: "assets/persons/personnels", branch: onDuty._id, token })
    );
  }, [onDuty, dispatch]);
  // useEffect(() => {
  //   if (sold.deals) {
  //     if (sold.deals) {
  //       const _inhouse = sold.deals.reduce((pre, cur) =>
  //         pre.inhouse.concat(cur.inhouse)
  //       );
  //       const _packages = sold.deals.reduce((pre, cur) =>
  //         pre.packages.concat(cur.packages)
  //       );

  //       Array.isArray(_inhouse) && setInhouse(_inhouse);
  //       Array.isArray(_packages) && setPackages(_packages);
  //     }
  //   }
  // }, [sold]);

  const vendorHandler = e => {
    const { value } = e.target;
    setVendor(value);
  };
  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = () => {
    const data = {
      branchId: vendor,
      source: onDuty._id,
      user: auth._id,
      subcon: sold._id,
      category: "sc",
    };
    dispatch(SAVE({ entity: "sales", data, token, id: sold._id }));
    toggleShow();
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBInputGroup
                textBefore={<span className={theme.text}>Company</span>}
              >
                <select
                  className="form-select"
                  name="user"
                  // defaultValue={model?.user}
                  onChange={vendorHandler}
                >
                  {catalogs.map(branch => (
                    <option value={branch?.user._id}>
                      {nameFormatter(branch.user?.fullName, false)}
                    </option>
                  ))}
                </select>
              </MDBInputGroup>
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <MDBModalBody>
            <ModalForm inhouse={inhouse} packages={packages} />
          </MDBModalBody>
          <MDBModalFooter className="py-0">
            <MDBBtn
              type="button"
              className="shadow-0"
              color={theme.color}
              onClick={toggleShow}
              disabled={isLoading}
            >
              Cancel
            </MDBBtn>
            <MDBBtn type="submit" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? <MDBSpinner size="sm" grow /> : "Generate Sendout"}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
