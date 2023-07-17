import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../components/pager";
import BreadCrumb from "../../../../../components/breadcrumb";
import { BROWSE } from "../../../../../redux/slices/commerce/menus";
import { TBLmenu, MenuModal } from "../../../../../templates/index";

const path = [
  {
    path: "Menus",
  },
];

export default function Branches() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    [visibility, setVisibility] = useState(false),
    [menus, setMenus] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id && dispatch(BROWSE({ branchId: onDuty._id, token }));
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    setMenus(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (menus.length > 0) {
      let totalPages = Math.floor(menus.length / maxPage);
      menus.length % maxPage > 0 && totalPages++;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [menus, page, maxPage]);

  const searchHandler = (keys) => {
    if (keys) {
      setMenus(
        catalogs.filter((menu) =>
          Object.values(menu).some((val) =>
            String(val).toLowerCase().includes(keys)
          )
        )
      );
    } else {
      setMenus(catalogs);
    }
  };
  return (
    <>
      <>
        <BreadCrumb title="Menus" paths={path} />
        <MDBContainer className="py-5 mt-4">
          <MDBRow className="mb-3">
            <MDBCol md={6}>
              <MDBInput
                onChange={(e) => searchHandler(e.target.value)}
                type="search"
                label="Search by Title"
                contrast={theme.dark}
              />
            </MDBCol>
            <Pager setPage={setPage} total={totalPages} page={page} />
          </MDBRow>
          <TBLmenu menus={menus} page={page} setVisibility={setVisibility} />
          <MenuModal visibility={visibility} setVisibility={setVisibility} />
        </MDBContainer>
      </>
    </>
  );
}
