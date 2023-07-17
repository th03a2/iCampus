import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Cluster } from "./cluster";
import { paginationHandler } from "../../../../components/utilities";
import { useState } from "react";

export function MenusCollapsable({ menus, page }) {
  const { maxPage } = useSelector(({ auth }) => auth),
    // { cluster, page } = useSelector(({ menus }) => menus),
    [activeIndex, setActiveIndex] = useState(0);

  return (
    <MDBContainer className="p-0">
      <MDBRow>
        <MDBCol size={12} className="transition-all">
          {menus.length &&
            paginationHandler(menus, page, maxPage).map((menu, index) => (
              <Cluster
                key={`collapse-${menu._id}`}
                menu={menu}
                page={page}
                index={index + 1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
