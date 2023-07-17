import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";

export default function Index({
  visibility,
  setVisibility,
  update,
  setUpdate,
  setIsUpdate,
  isUpdate,
}) {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth);
  const [AmRef, setAmRef] = useState(""),
    [PmRef, setPmRef] = useState(""),
    [AmRoom, setAmRoom] = useState(""),
    [PmRoom, setPmRoom] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setAmRoom(update.AmRoom);
    setPmRoom(update.PmRoom);
    setAmRef(update.AmRef);
    setPmRef(update.PmRef);
  }, [update]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate) {
      dispatch(
        SAVE({
          entity: "monitorings/temperatures",
          data: {
            AmRef,
            PmRef,
            AmRoom,
            PmRoom,
            branchId: onDuty._id,
            userId: auth._id,
          },
          token,
        })
      );
      setVisibility(false);

      setAmRef("");
      setPmRef("");
      setAmRoom("");
      setPmRoom("");
    } else {
      dispatch(
        UPDATE({
          entity: "monitorings/temperatures",
          data: {
            AmRef,
            PmRef,
            AmRoom,
            PmRoom,
            branchId: onDuty._id,
            userId: auth._id,
          },
          id: update._id,
          token,
        })
      );
      setAmRef("");
      setPmRef("");
      setAmRoom("");
      setPmRoom("");
      setUpdate({});
      setIsUpdate(false);
      setVisibility(false);
    }
  };

  const handleClose = () => {
    setVisibility(false);
    setUpdate({});
    setAmRef("");
    setPmRef("");
    setAmRoom("");
    setPmRoom("");
    setIsUpdate(false);
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility}>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Temperature</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody
            className={`${theme.bg} ${theme.text} gui-viewer`}
            style={{ minHeight: 500 }}
          >
            <form onSubmit={handleSubmit}>
              <label>Ref Temp AM</label>
              <MDBInput
                name="AmRef"
                className="my-2"
                type="number"
                value={AmRef}
                onChange={(e) => setAmRef(e.target.value)}
                required
              />
              <label>Ref Temp PM</label>
              <MDBInput
                name="PmRef"
                className="my-2"
                type="number"
                value={PmRef}
                onChange={(e) => setPmRef(e.target.value)}
                required
              />
              <label>Room AM</label>
              <MDBInput
                name="AmRoom"
                className="my-2"
                type="number"
                value={AmRoom}
                onChange={(e) => setAmRoom(e.target.value)}
                required
              />
              <label className="text-bold">Room PM</label>
              <MDBInput
                name="PmRoom"
                className="my-2"
                type="number"
                value={PmRoom}
                onChange={(e) => setPmRoom(e.target.value)}
                required
              />
              <MDBContainer className="d-flex justify-content-end mt-4">
                <MDBBtn type="submit">{isUpdate ? "Update" : "Submit"}</MDBBtn>
              </MDBContainer>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
