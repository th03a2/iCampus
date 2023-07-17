import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { paginationHandler } from "../../../components/utilities";
import Swal from "sweetalert2";
import { DESTROY } from "../../../redux/slices/query";
import { Package } from "../../../widgets";
import { ENDPOINT } from "../../../components/utilities";
import Modal from "./modal";
import defaultImage from "../../../assets/images/image.png";
export function TBLproducts({ products, page, handleUpdate, update }) {
  const { token, theme, maxPage } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    [visibility, setVisibility] = useState(false),
    [image, setImage] = useState("");

  const handlePopImage = (image) => {
    setVisibility(true);
    setImage(image);
  };
  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending products</caption>
        <caption className="caption-top">
          Total of <b>{products?.length}</b> product(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th>Image</th>
            <th scope="col">Name</th>
            <th scope="col">Package/s</th>
            <th scope="col">Category</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {products?.length > 0 ? (
            paginationHandler(products, page, maxPage).map((product, index) => (
              <tr key={product?._id}>
                <td>{index + 1}</td>
                <td
                  onClick={() => handlePopImage(product.name)}
                  className="cursor-pointer"
                >
                  <MDBCardImage
                    src={
                      product.isUpload
                        ? `${ENDPOINT}/public/products/${product.name}.png`
                        : defaultImage
                    }
                    className="mx-auto rounded img-max img-fluid mb-1"
                    style={{ width: "50px" }}
                  ></MDBCardImage>
                </td>
                <td>
                  <h5 className="fw-bold mb-1 text-capitalize">
                    {product.name}
                  </h5>
                  <small className="text-muted mb-0">{product.subname}</small>
                </td>
                <td>
                  {product.packages &&
                    Object.keys(product.packages).map((item) => (
                      <Package pack={item} value={product.packages[item]} />
                    ))}
                </td>
                <td>{product.isConsumable ? "Consumable" : "Depricated"}</td>
                <td className="text-center">
                  <MDBBtnGroup className="shadow-0">
                    <MDBBtn
                      onClick={() => handleUpdate(product)}
                      color="info"
                      size="sm"
                      title="Update information."
                    >
                      update
                    </MDBBtn>
                    <MDBBtn
                      onClick={() =>
                        Swal.fire({
                          icon: "warning",
                          title: "Are you sure?",
                          html: `You won't be able to revert this!`,
                          showCancelButton: true,
                          confirmButtonText: "Yes, continue!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(
                              DESTROY({
                                entity: "commerce/merchandise/products",
                                id: product._id,
                                token,
                              })
                            );
                          }
                        })
                      }
                      color={theme.color}
                      size="sm"
                      title="Archive this branch."
                    >
                      archive
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={4}>
                <h2>No Tag products.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      <Modal
        visibility={visibility}
        setVisibility={setVisibility}
        theme={theme}
        image={image}
      />
    </>
  );
}
