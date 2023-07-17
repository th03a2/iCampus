import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import TBLmenu from "./table";
import Pager from "../../../../../../../components/pager";
import { FIND, RESET } from "../../../../../../../redux/slices/commerce/menus";

export default function MenuList({ branchId, visibility }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    [menu, setMenu] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (branchId && visibility) {
      dispatch(FIND({ id: branchId, token }));
    } else {
      dispatch(RESET());
    }
  }, [branchId, visibility]);

  useEffect(() => {
    setMenu(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (menu.length > 0) {
      //Pagination
      let totalPages = Math.floor(menu.length / maxPage);
      if (menu.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [menu, page]);

  const handleSearch = (string) => {
    if (string) {
      setMenu(
        catalogs?.filter((catalog) =>
          catalog.name.includes(String(string).toUpperCase())
        )
      );
    } else {
      setMenu(catalogs);
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        <MDBCol md={6}>
          <MDBInput
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            label="Search by Name"
            contrast={theme.dark}
          />
        </MDBCol>
        <Pager setPage={setPage} total={totalPages} page={page} />
      </MDBRow>
      <TBLmenu menu={menu} page={page} branchId={branchId} />
    </MDBContainer>
  );
}
