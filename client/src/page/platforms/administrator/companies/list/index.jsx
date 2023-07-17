import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/table";
import Pager from "../../../../../components/pager";
import Search from "../../../../../components/search";
import Swal from "sweetalert2";
import { BROWSE, DESTROY } from "../../../../../redux/slices/assets/companies";
import { fullMobile, nameFormatter } from "../../../../../components/utilities";

const paths = [
  {
    name: "Registered Companies",
  },
];

export default function CompaniesList() {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { catalogs, isLoading } = useSelector(({ companies }) => companies),
    [companies, setCompanies] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE(token));
  }, [token]);

  useEffect(() => {
    if (companies.length > 0) {
      let totalPages = Math.floor(companies.length / maxPage);
      if (companies.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [companies, page, maxPage]);

  useEffect(() => {
    setCompanies(catalogs);
  }, [catalogs]);

  const handleSearch = e => {
    const key = e.target.value;

    if (key) {
      setCompanies(
        catalogs?.filter(catalog =>
          nameFormatter(catalog.fullName).includes(key.toUpperCase())
        )
      );
    } else {
      setCompanies(catalogs);
    }
  };

  const handleArchive = data =>
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      html: `You are about to archive ${data.name}.`,
      footer: "Employees from this company will not be able to login.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(DESTROY({ id: data._id, token }));
      }
    });

  const handleBranches = data => {
    console.log(data);
  };

  return (
    <>
      <BreadCrumb
        title="Companies List"
        button
        paths={paths}
        tooltip="Create new company"
        handler={() => window.open("/register", "_blank", "noreferrer")}
      />
      <MDBContainer fluid className="pt-5 mt-5">
        <MDBCard background={theme.color} className={`${theme.text} mb-2`}>
          <MDBCardBody>
            <MDBRow>
              <Search label="Search by Name" handler={handleSearch} />
              <Pager total={totalPages} page={page} setPage={setPage} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard background={theme.color} className={`${theme.text}`}>
          <MDBCardBody>
            <DataTable
              name="Companies"
              datas={companies}
              titles={[
                "Name",
                {
                  _title: "Owner",
                  _styles: "text-center",
                },
                {
                  _title: "Contacts",
                  _styles: "text-center",
                },
                {
                  _title: "Actions",
                  _styles: "text-center",
                },
              ]}
              contents={[
                {
                  _keys: ["name", "name"],
                  _format: [data => data.toUpperCase()],
                },
                {
                  _keys: ["owner", "owner"],
                  _styles: "text-center",
                  _format: [
                    data => nameFormatter(data?.fullName),
                    data => data?.email,
                  ],
                },
                {
                  _keys: ["contacts", "contacts"],
                  _styles: "text-center",
                  _format: [
                    data => fullMobile(data?.mobile),
                    data => data?.email,
                  ],
                },
                // {
                //   _keys: "createdAt",
                //   _format: data => new Date(data).toDateString(),
                //   _styles: "text-center",
                // },
                // {
                //   _keys: ["createdAt", "updatedAt"],
                //   _format: [
                //     data => new Date(data).toDateString(),
                //     data => new Date(data).toDateString(),
                //   ],
                // },
              ]}
              handlers={[handleBranches, handleArchive]}
              actions={[
                {
                  _title: "Branches",
                  _icon: "code-branch",
                  _color: "info",
                  _placement: "left",
                  _function: 0,
                },
                {
                  _title: "Archive",
                  _icon: "folder-minus",
                  _color: "warning",
                  _placement: "right",
                  _function: 1,
                },
              ]}
              isLoading={isLoading}
              page={page}
              empty="Companies are empty"
            />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
