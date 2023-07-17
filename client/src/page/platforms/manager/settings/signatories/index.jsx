import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import { UPLOAD } from "../../../../../redux/slices/assets/persons/auth";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";
import { TBLsignatories } from "../../../../../templates";
import axios from "axios";
import { toast } from "react-toastify";

const path = [
  {
    path: "signatories",
  },
];

const Signatories = () => {
  const { theme, token, maxPage, auth, onDuty } = useSelector(
      ({ auth }) => auth
    ),
    [signatories, setSignatory] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`branches/signatories/${onDuty._id}/find`, {
        headers: { Authorization: `QTracy ${token}` },
      })
      .then((res) => setSignatory(res.data));
  }, [onDuty]);

  //Pagination
  useEffect(() => {
    if (signatories.length > 0) {
      let totalPages = Math.floor(signatories.length / maxPage);
      if (signatories.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [signatories, maxPage, page]);

  const handleSearch = (string) => {
    if (string) {
      const doctor = signatories.filter((signatory) => signatory.length < 1);
      setSignatory(
        doctor.filter((signatory) =>
          nameFormatter(signatory.fullName)
            .toLowerCase()
            .startsWith(string.toLowerCase())
        )
      );
    } else {
      setSignatory(signatories);
    }
  };

  const uploadSignature = (file, email) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        UPLOAD({
          data: {
            path: `patron/${email}`,
            base64: reader.result.split(",")[1],
            name: `signature.png`,
          },
          token,
        })
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <BreadCrumb title="Signatories" paths={path} button={true} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLsignatories
          signatories={signatories}
          page={page}
          uploadSignature={uploadSignature}
        />
      </MDBContainer>
    </>
  );
};

export default Signatories;
