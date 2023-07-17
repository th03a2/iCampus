import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";
import { ENDPOINT } from "../../../../../../components/utilities";
import { UPLOAD } from "../../../../../../redux/slices/assets/persons/auth";
import defaultImage from "../../../../../../assets/images/image.png";
import ModalBody from "./modalBody";
export default function Index({
  visibility,
  setVisibility,
  token,
  onDuty,
  update,
  isUpdate,
  setIsUpdate,
}) {
  const { theme } = useSelector(({ auth }) => auth),
    [revert, setRevert] = useState(false),
    [pack, setPack] = useState(""),
    [Pquantity, setPquantity] = useState(0), //pack quantity
    [bottle, setBottle] = useState(""),
    [ml, setMl] = useState(""), //bottle Ml
    [halt, setHalt] = useState(false),
    [isConsumable, setConsumable] = useState(false),
    [name, setName] = useState(""),
    [subname, setSubname] = useState(""),
    [vat, setVat] = useState(false),
    [imageData, setImageData] = useState(null),
    [isUpload, setIsUpload] = useState(false),
    [image, setImage] = useState(null),
    dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      Object.keys(update.packages).map((item) => {
        switch (item) {
          case "btl":
            setBottle(update.packages[item].u);
            setMl(update.packages[item].v);
            break;
          case "pack":
            setPack(update.packages[item].u);
            setPquantity(update.packages[item].q);
          default:
            break;
        }
      });
      setHalt(update.halt);
      setConsumable(update.isConsumable);
      setRevert(update.revert);
      setName(update.name);
      setSubname(update.subname);
      setVat(update.VATable);
      setImageData(`${ENDPOINT}/public/products/${update.name}.png`);
    }
  }, [update, isUpdate]);

  useEffect(() => {
    if (image) {
      setIsUpload(true);
    }
  }, [image]);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setImage(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertImageToBase64(file);
    setImageData(base64Image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image) {
      dispatch(
        UPLOAD({
          data: {
            path: `products`,
            base64: image,
            name: `${name}.png`,
          },
          token,
        })
      );
    }
    if (update) {
      alert("update");
    } else {
      dispatch(
        SAVE({
          branchId: onDuty._id,
          entity: "commerce/merchandise/products",
          data: {
            branchId: onDuty._id,
            name,
            subname,
            isUpload,
            revert,
            isConsumable,
            halt,
            VATable: vat,
            packages: (() => {
              if (bottle && pack) {
                return {
                  pack: { u: pack, q: Pquantity },
                  btl: { v: ml, u: bottle },
                };
              } else if (!pack && bottle) {
                return { btl: { v: ml, u: bottle } };
              } else if (!bottle && pack) {
                return { pack: { u: pack, q: Pquantity } };
              }
            })(),
          },
          token,
        })
      );
    }
  };

  const handleClose = () => {
    setName("");
    setSubname("");
    setBottle("");
    setMl("");
    setConsumable(false);
    setHalt(false);
    setPack("");
    setPquantity(0);
    setImage(null);
    setIsUpload(false);
    setRevert(false);
    setVat(false);
    setImageData(null);
    setVisibility(false);
    setIsUpdate(false);
  };
  return (
    <MDBModal show={visibility} staticBackdrop>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Add Product</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody
              className={`${theme.bg} ${theme.text} gui-viewer`}
              style={{ minHeight: 500 }}
            >
              <ModalBody
                setBottle={setBottle}
                setMl={setMl}
                setConsumable={setConsumable}
                setHalt={setHalt}
                setName={setName}
                setRevert={setRevert}
                setSubname={setSubname}
                defaultImage={defaultImage}
                setPack={setPack}
                setPquantity={setPquantity}
                setVat={setVat}
                handleImageChange={handleImageChange}
                vat={vat}
                bottle={bottle}
                ml={ml}
                isConsumable={isConsumable}
                halt={halt}
                name={name}
                revert={revert}
                subname={subname}
                pack={pack}
                Pquantity={Pquantity}
                imageData={imageData}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="button" color="secondary" onClick={handleClose}>
                Close
              </MDBBtn>
              <MDBBtn type="submit">{isUpdate ? "Update" : "Submit"}</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
