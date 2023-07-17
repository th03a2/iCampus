import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../../components/breadcrumb";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BranchServices from "../services";
import MenuCreate from "./create";
import { FIND } from "../../../../../redux/slices/commerce/menus";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const path = [
  {
    path: "Branches",
    url: "/owner/branches",
  },
  {
    path: "Menu",
  },
  {
    path: "Construct",
  },
];

const PackageConstructor = () => {
  const { token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    [menu, setMenu] = useState({ services: [] }),
    { branchId, menuId } = useParams(),
    dispatch = useDispatch();

  useEffect(() => {
    if (atob(branchId).length === 24) {
      dispatch(FIND({ id: atob(branchId), token }));
    } else {
      toast.warn("Next time, do not tamper datas!");
      setTimeout(window.close, 5500);
    }
  }, [branchId, token, dispatch]);

  useEffect(() => {
    if (catalogs.length > 0) {
      if (atob(menuId).length === 24) {
        const menu = catalogs.find(catalog => catalog._id === atob(menuId));
        setMenu(menu);
      } else {
        if (menuId !== "create") {
          toast.warn("Next time, do not tamper datas!");
          setTimeout(window.close, 5500);
        }
      }
    }
  }, [menuId, catalogs]);

  const addHandler = fk => {
    const _menu = { ...menu };
    _menu.services = [...menu.services, fk];
    setMenu(_menu);
  };
  const removeHandler = fk => {
    const _menu = { ...menu };
    _menu.services = menu.services.filter(({ id }) => fk !== id);
    setMenu(_menu);
  };

  return (
    <>
      <BreadCrumb title="Construct a menu" paths={path} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow>
          <MDBCol size={6} className="p-0">
            <BranchServices packages={menu.services} addHandler={addHandler} />
          </MDBCol>
          <MDBCol size={6} className="p-0">
            <MenuCreate
              menu={menu}
              setMenu={setMenu}
              removeHandler={removeHandler}
              branchId={atob(branchId)}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      ;
    </>
  );
};

export default PackageConstructor;
