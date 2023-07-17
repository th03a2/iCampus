import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Pager from "../../../../../../../components/pager";
import HistoryTable from "./table";

export default function TransactionHistoryList({
  handleSearch,
  page,
  setPage,
  totalPages,
  transactions,
  privilege,
}) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBContainer className="mt-3">
      <MDBRow className="mb-3">
        <MDBCol md={6}>
          <MDBInput
            onChange={e => handleSearch(e.target.value)}
            type="search"
            label="Search by Date"
            contrast={theme.dark}
          />
        </MDBCol>
        <Pager setPage={setPage} total={totalPages} page={page} />
      </MDBRow>
      <HistoryTable
        privilege={privilege}
        transactions={transactions}
        page={page}
      />
    </MDBContainer>
  );
}
