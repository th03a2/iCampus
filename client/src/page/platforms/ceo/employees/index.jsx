import React, { useEffect } from "react";
import BreadCrumb from "../../../../components/breadcrumb";
import { MDBContainer } from "mdb-react-ui-kit";
// import Pager from "../../../../components/pager";
// import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { BROWSE } from "../../../../redux/slices/assets/persons/users";
// import { UPDATE as REFORM } from "../../../../redux/slices/assets/branches";
// import { REVERT, SAVE } from "../../../../redux/slices/notifications";
// import PetitionTable from "./table/";
// import { nameFormatter, socket } from "../../../../components/utilities";

const path = [
  {
    path: "List of Employees",
  },
];

export default function Employees() {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    // { catalogs } = useSelector(({ petitions }) => petitions),
    // { record, didSubmit } = useSelector(({ notifications }) => notifications),
    // [petitions, setPetitions] = useState([]),
    // [page, setPage] = useState(1),
    // [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  //   useEffect(() => {
  //     if (didSubmit) {
  //       socket.emit("sendNotification", { roomId: record.userId, form: record });
  //       dispatch(REVERT());
  //     }
  //   }, [record, didSubmit]);

  useEffect(() => {
    if (onDuty.role) {
      dispatch(
        BROWSE({
          type: {
            company: onDuty.companyId,
            branch: onDuty._id,
          },
          token,
        })
      );
    }
  }, [onDuty]);

  //   useEffect(() => {
  //     if (catalogs.length > 0) {
  //       //Pagination
  //       let totalPages = Math.floor(catalogs.length / maxPage);
  //       if (catalogs.length % maxPage > 0) totalPages += 1;
  //       setTotalPages(totalPages);

  // page > totalPages && setPage(totalPages);
  //     }
  //     setPetitions(catalogs);
  //   }, [catalogs, maxPage, page]);

  //   const handleSearch = string => {
  //     if (string) {
  //       setPetitions(
  //         catalogs.filter(catalog =>
  //           nameFormatter(catalog.userId?.fullName)
  //             .toLowerCase()
  //             .startsWith(string.toLowerCase())
  //         )
  //       );
  //     } else {
  //       setPetitions(catalogs);
  //     }
  //   };

  return (
    <>
      <BreadCrumb title="Employees" paths={path} />
      <MDBContainer className="py-5 mt-4">
        {/* <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow> */}
        {/* <PetitionTable
          petitions={petitions}
          page={page}
          handleAction={handleAction}
        /> */}
      </MDBContainer>
    </>
  );
}
