import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Deals from "./deals";
import Menus from "./menus";
import { toast } from "react-toastify";

export default function PatientTransaction({
  visibility,
  setVisibility,
  user,
  usage = "default",
}) {
  const { theme, onDuty } = useSelector(({ auth }) => auth),
    [deals, setDeals] = useState([]),
    [source, setSource] = useState("walkin");

  const handleToggle = () => setVisibility(!visibility);
  const handleTransfer = item => {
    const newArr = [...deals];

    var isDuplicate = false;

    newArr.find(deets => {
      if (deets._id === item._id) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      toast.warn(`${item.description} is already selected!`);
    } else {
      var indexes = [];

      newArr.map((detail, index) => {
        var duplicate = false;
        detail.packages?.map(service => {
          item.packages.find(srvc => {
            if (srvc === service) {
              duplicate = true;
            }
          });
        });

        // collecting all index with conflict of current item
        duplicate && indexes.push(index);
      });

      // removing all indexes with conflict of the current item
      if (indexes.length > 0) {
        for (let index = indexes.length - 1; index >= 0; index--) {
          newArr.splice(indexes[index], 1);
        }
      }
      newArr.push(item);
      setDeals(newArr);
    }
  };

  const handleRemove = index => {
    const _deals = [...deals];
    _deals.splice(index, 1);
    setDeals(_deals);
  };

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Point of Sale</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <MDBModalBody className="text-start">
            <MDBRow>
              <MDBCol size={7} className="p-0 border-end">
                <Menus
                  source={source}
                  handleTransfer={handleTransfer}
                  branchId={onDuty._id}
                  usage={usage}
                />
              </MDBCol>
              <MDBCol size={5} className="p-0 border-start">
                <Deals
                  handleToggle={handleToggle}
                  setDeals={setDeals}
                  user={user}
                  deals={deals}
                  handleRemove={handleRemove}
                  source={source}
                  setSource={setSource}
                />
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
