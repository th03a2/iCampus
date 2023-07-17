import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";
import { HISTORY } from "../../../../../../redux/slices/commerce/sales";
import { useState } from "react";
import TransactionHistoryList from "./list";

export default function PatientTransactionHistory({
  visibility,
  setVisibility,
}) {
  const { theme, onDuty, token, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ sales }) => sales),
    [transactions, setTransaction] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    { patron } = useSelector(({ pos }) => pos),
    dispatch = useDispatch();

  const handleToggle = () => setVisibility(!visibility);

  useEffect(() => {
    if (patron._id && visibility) {
      dispatch(
        HISTORY({
          type: { branchId: onDuty._id, customerId: patron._id },
          token,
        })
      );
    }
  }, [patron, visibility]);

  useEffect(() => {
    setTransaction(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (transactions.length > 0) {
      //Pagination
      let totalPages = Math.floor(transactions.length / maxPage);
      if (transactions.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [transactions, page]);

  const handleSearch = string => {
    if (string) {
      setTransaction(
        catalogs?.filter(catalog =>
          String(new Date(catalog.createdAt).toDateString())
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setTransaction(catalogs);
    }
  };

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog size="xl">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              {nameFormatter(patron?.fullName)}'s history
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <MDBModalBody className="text-start p-0">
            <TransactionHistoryList
              transactions={transactions}
              privilege={patron.privilege}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              handleSearch={handleSearch}
            />
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
