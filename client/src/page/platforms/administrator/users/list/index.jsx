import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../../../components/table";
import Pager from "../../../../../components/pager";
import Search from "../../../../../components/search";
import Swal from "sweetalert2";
import {
  BROWSE,
  DESTROY,
  UPDATE,
  REFURBISH,
} from "../../../../../redux/slices/assets/persons/users";
import {
  formatCurrency,
  fullMobile,
  nameFormatter,
} from "../../../../../components/utilities";
import Company from "../../../../../fakeDb/company";
import { toast } from "react-toastify";
import { save } from "../../../../../redux/sqlbuilder";

const paths = [
  {
    name: "Registered Users",
  },
];

export default function UsersList() {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { catalogs, isLoading } = useSelector(({ users }) => users),
    [users, setUsers] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    [inputOptions, setInputOptions] = useState({}),
    dispatch = useDispatch();

  useEffect(() => {
    var newObj = {};
    const _newRoles = [...Company.employees];
    _newRoles.splice(0, 1);
    _newRoles?.map(role => (newObj[role.id] = role?.display_name));
    setInputOptions(newObj);
  }, [Company]);

  useEffect(() => {
    dispatch(BROWSE(token));
  }, [token]);

  useEffect(() => {
    if (users.length > 0) {
      let totalPages = Math.floor(users.length / maxPage);
      if (users.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      if (page > totalPages) {
        setPage(totalPages);
      }
    }
  }, [users, page, maxPage]);

  useEffect(() => {
    setUsers(catalogs);
  }, [catalogs]);

  const handleSearch = e => {
    const key = e.target.value;

    if (key) {
      setUsers(
        catalogs.filter(catalog =>
          nameFormatter(catalog.fullName).includes(key.toUpperCase())
        )
      );
    } else {
      setUsers(catalogs);
    }
  };

  const handleAppoint = async data => {
    const { value: _role } = await Swal.fire({
      title: "Choose a role",
      input: "select",
      inputValue: data.role,
      inputOptions,
    });

    if (_role) {
      if (_role !== data.role) {
        save(
          "personnels",
          {
            user: data._id,
            roleId: _role,
            isDefault: true,
          },
          token
        ).then(res => {
          dispatch(REFURBISH(res));
        });
      } else {
        toast.warn("No changes found!");
      }
    }
  };

  const handleRate = async data => {
    const { value: _rate } = await Swal.fire({
      title: "Update hourly rate",
      text: `${
        data.alias || data.fullName?.fname
      }'s current rate is ${formatCurrency(data.rate)}`,
      input: "number",
      inputValue: data.rate,
      inputValidator: value => {
        if (!value) {
          return "You need to write something!";
        }

        if (Number(value) < 1) {
          return "Cannot set below 1!";
        }

        if (Number(value) === data.rate) {
          return "Cannot set the same rate!";
        }
      },
    });

    if (_rate) {
      dispatch(
        UPDATE({
          id: data._id,
          data: { rate: _rate },
          token,
        })
      );
    }
  };

  const handleArchive = data =>
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      html: `You are about to archive ${data.fullName?.fname}.`,
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(DESTROY({ id: data._id, token }));
      }
    });

  const handleAttendance = data =>
    window.open(
      `/attendance/${data._id}`,
      "Attendance",
      "top=100px,width=768px,height=650px"
    );

  // const handleFind = async () => {
  //   const { value: formValues } = await Swal.fire({
  //     title: "Multiple inputs",
  //     html:
  //       '<input id="swal-fname" class="swal2-input" placeholder="First name">' +
  //       '<input id="swal-mname" class="swal2-input" placeholder="Middle name">' +
  //       '<input id="swal-lname" class="swal2-input" placeholder="Last name">',
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       return [
  //         document.getElementById("swal-fname").value,
  //         document.getElementById("swal-mname").value,
  //         document.getElementById("swal-lname").value,
  //       ];
  //     },
  //   });

  //   if (formValues) {
  //     const response = await browse(
  //       "users/employee",
  //       {
  //         fname: formValues[0].toUpperCase().trim(),
  //         mname: formValues[1].toUpperCase().trim(),
  //         lname: formValues[2].toUpperCase().trim(),
  //       },
  //       token
  //     );

  //     if (response) {
  //       setViewUser(response);
  //       setViewProfile(true);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "User not found",
  //         text: "Would you like to register this user?",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes",
  //       }).then(result => {
  //         /* Read more about isConfirmed, isDenied below */
  //         if (result.isConfirmed) {
  //           window.open("/register", "_blank", "noreferrer");
  //         }
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <BreadCrumb
        title="Users List"
        button
        paths={paths}
        tooltip="Create new user"
        handler={() => window.open("/register", "_blank", "noreferrer")}
      />
      {/* <ViewProfile
        user={viewUser}
        visibility={viewProfile}
        setVisibility={setViewProfile}
      /> */}
      <MDBContainer fluid className="pt-5 mt-5">
        <MDBCard background={theme.color} className={`${theme.text} mb-2`}>
          <MDBCardBody>
            <MDBRow>
              <Search label="Search by Fullname" handler={handleSearch} />
              <Pager total={totalPages} page={page} setPage={setPage} />
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        <MDBCard background={theme.color} className={`${theme.text}`}>
          <MDBCardBody>
            <DataTable
              name="Users"
              datas={users}
              titles={[
                "Credentials",
                {
                  _title: "Mobile",
                  _styles: "text-center",
                },
                {
                  _title: "Rate & Role",
                  _styles: "text-center",
                },
                {
                  _title: "Actions",
                  _styles: "text-center",
                },
              ]}
              contents={[
                {
                  _keys: ["fullName", "email"],
                  _format: [data => nameFormatter(data)],
                },
                {
                  _keys: "mobile",
                  _styles: "text-center",
                  _format: data => fullMobile(data),
                },
                {
                  _keys: ["rate", "onDuty"],
                  _styles: "text-center",
                  _format: [
                    data => formatCurrency(data),
                    data =>
                      Company.employees.find(role => role.id === data?.roleId)
                        ?.display_name,
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
              handlers={[
                handleAttendance,
                handleAppoint,
                handleRate,
                handleArchive,
              ]}
              actions={[
                {
                  _title: "Attendance",
                  _icon: "calendar-alt",
                  _color: "primary",
                  _placement: "left",
                  _function: 0,
                },
                {
                  _title: "Appoint",
                  _icon: "user-cog",
                  _color: "secondary",
                  _placement: "top",
                  _function: 1,
                  _condition: data => data.onDuty.roleId === 1,
                },
                {
                  _title: "Hourly Rate",
                  _icon: "file-invoice-dollar",
                  _color: "info",
                  _placement: "top",
                  _function: 2,
                },
                {
                  _title: "Archive",
                  _icon: "folder-minus",
                  _color: "warning",
                  _placement: "right",
                  _function: 3,
                },
              ]}
              isLoading={isLoading}
              page={page}
              empty="Users are empty"
            />
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
