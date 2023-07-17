import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import BranchServices from "../../../services";
import MenuList from "./list";
// import MenuCreate from "./create";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import MenuView from "./view";

export default function CreatePackages({ id, name }) {
  const { theme } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [serviceIds, setServiceIds] = useState([]),
    [services, setServices] = useState([]),
    [duplicate, setDuplicate] = useState(0),
    [view, setView] = useState(false),
    [didEdit, setDidEdit] = useState(false),
    [individual, setIndividual] = useState({});

  const handleToggle = () => setVisibility(!visibility);

  const handleTransfer = service => {
    if (didEdit) {
      const newArr = [...individual.services];
      var notUnique = false;

      newArr.find(id => {
        if (id === service.id - 1) {
          notUnique = true;
        }
        return id;
      });

      if (notUnique) {
        toast.warn("This item is already selected!");
        setDuplicate(service.id);
      } else {
        setDuplicate(0);

        newArr.push(service.id - 1);

        setIndividual({
          ...individual,
          services: newArr,
        });
      }
    } else {
      const newIds = [...serviceIds],
        newServices = [...services];

      if (newServices.find(srvc => srvc.id == service.id)) {
        toast.warn("This item is already selected!");
        setDuplicate(service.id);
      } else {
        setDuplicate(0);

        newIds.push(service.id - 1);
        newServices.push(service);

        setServiceIds(newIds);
        setServices(newServices);
      }
    }
  };

  const handleDelete = index => {
    setDuplicate(0);

    if (didEdit) {
      const newArr = [...individual.services];
      newArr.splice(index, 1);
      setIndividual({
        ...individual,
        services: newArr,
      });
    } else {
      const newIds = [...serviceIds],
        newServices = [...services];

      newIds.splice(index, 1);
      newServices.splice(index, 1);

      setServiceIds(newIds);
      setServices(newServices);
    }
  };

  const handleReset = () => {
    setDuplicate(0);
    setServiceIds([]);
    setServices([]);
  };

  return (
    <>
      <MDBBtn
        onClick={handleToggle}
        color="warning"
        size="sm"
        title="Create menu."
      >
        menu
      </MDBBtn>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={visibility}
        setShow={setVisibility}
      >
        <MDBModalDialog size="fullscreen">
          <MDBModalContent className={`${theme.bg} ${theme.text}`}>
            <MDBModalHeader>
              <MDBModalTitle>{name}'s menu</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleToggle}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-start">
              <MDBRow>
                {!individual._id && (
                  <MDBCol
                    md={view ? 6 : 1}
                    className={`${
                      view ? "border-end" : "invisible"
                    } p-0 transition-all`}
                  >
                    <BranchServices
                      isComponent={true}
                      view={view}
                      handleTransfer={handleTransfer}
                    />
                  </MDBCol>
                )}
                {didEdit ? (
                  <MDBCol md={6} className="p-0 transition-all border-end">
                    <BranchServices
                      isComponent={true}
                      view={true}
                      handleTransfer={handleTransfer}
                    />
                  </MDBCol>
                ) : (
                  <MDBCol
                    md={view ? 6 : individual._id ? 6 : 10}
                    className={`${
                      view ? "border-start" : individual.name && "border-end"
                    } p-0 transition-all`}
                  >
                    {view ? (
                      "sample"
                    ) : (
                      // <MenuCreate
                      //   handleReset={handleReset}
                      //   branchId={id}
                      //   duplicate={duplicate}
                      //   services={services}
                      //   serviceIds={serviceIds}
                      //   handleDelete={handleDelete}
                      // />
                      <MenuList
                        branchId={id}
                        visibility={visibility}
                        setIndividual={setIndividual}
                      />
                    )}
                  </MDBCol>
                )}
                {individual._id && (
                  <MDBCol md={6} className="border-start">
                    {/* <MenuView
                      setDuplicate={setDuplicate}
                      duplicate={duplicate}
                      handleDelete={handleDelete}
                      didEdit={didEdit}
                      setDidEdit={setDidEdit}
                      menu={individual}
                      setMenu={setIndividual}
                    /> */}
                  </MDBCol>
                )}
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleToggle}>
                Close
              </MDBBtn>

              <MDBBtn
                onClick={() => {
                  setVisibility(false);
                  window.open(`/platform/owner/menus/${btoa(id)}/create`);
                }}
              >
                create
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
