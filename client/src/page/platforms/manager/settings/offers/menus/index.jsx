import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../../../components/pager";
import BreadCrumb from "../../../../../../components/breadcrumb";
import {
  SETVISIBILITY,
  BROWSE,
} from "../../../../../../redux/slices/commerce/menus";
import { MenusCollapsable } from "../../../../../../templates/assets/menus/collapse";
import { MenuModal } from "../../../../../../templates";
import ServicesModal from "../../../../../../templates/assets/menus/collapse/services";
const path = [
  {
    path: "Menus",
  },
];

export default function Index() {
  const { token, maxPage, onDuty, theme } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    [menus, setMenus] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id && dispatch(BROWSE({ data: { branch: onDuty._id }, token }));
  }, [onDuty, token, dispatch]);

  useEffect(() => {
    setMenus(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (menus.length > 0) {
      let totalPages = Math.floor(menus.length / maxPage);
      if (menus.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [menus, page, maxPage]);

  const searchHandler = string => {
    if (string) {
      setMenus(
        menus.filter(service =>
          Object.values(service).some(val =>
            String(val).toLowerCase().includes(string)
          )
        )
      );
    } else {
      setMenus(catalogs);
    }
  };

  const createHandler = () => dispatch(SETVISIBILITY(true));

  return (
    <>
      <BreadCrumb
        title="Menus"
        button={true}
        handler={createHandler}
        paths={path}
        tooltip="Create New Menu"
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={e => searchHandler(e.target.value)}
              type="search"
              label="Search by Title"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>

        <MenusCollapsable menus={menus} page={page} />
        <MenuModal />
        <ServicesModal />
      </MDBContainer>
    </>
  );
}
