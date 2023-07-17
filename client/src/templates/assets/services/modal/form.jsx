import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETMODEL } from "../../../../redux/slices/task/preferences";
import { preferences, units } from "../../../../assets/references";

export default function ModalForm() {
  const { theme } = useSelector(({ auth }) => auth),
    { model, category } = useSelector(({ preferences }) => preferences),
    dispatch = useDispatch();
  // const { lo } = model;

  const handleParams = (e) => {
    const { name, value, type } = e.target;

    let _model = {
      ...model,
      [name]: type === "number" ? Number(value) : value,
    };
    dispatch(SETMODEL(_model));
  };
  const categories = preferences[category];

  return (
    <MDBContainer>
      {category !== "equal" && (
        <>
          <span>Category:</span>
          <MDBCol md={4}>
            <select
              type="number"
              className={`form-control ${theme.bg} ${theme.text}`}
              name={category === "gender" ? "isMale" : "development"}
              value={category === "gender" ? model?.isMale : model?.development}
              onChange={handleParams}
            >
              {categories?.map((name, index) => (
                <option key={`unit-${index}`} value={index}>
                  {name}
                </option>
              ))}
            </select>
          </MDBCol>
        </>
      )}
      <hr />
      <span>Values</span>
      <MDBRow className="mb-2">
        <MDBCol md={4}>
          <MDBInput
            type="number"
            label="Low Value"
            name="lo"
            value={model?.lo}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={4}>
          <MDBInput
            type="number"
            label="High Value"
            name="hi"
            value={model?.hi}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={4}>
          <select
            className={`form-control ${theme.bg} ${theme.text}`}
            name="units"
            value={model?.units}
            onChange={handleParams}
          >
            {units.map((unit, index) => (
              <option key={`unit-${index}`} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Warning Value"
            name="warn"
            value={model?.warn}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <hr />
      <span>Alarming</span>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Low Panic Value"
            name="pvLo"
            value={model?.pvLo}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="High Panic Value"
            name="pvHi"
            value={model?.pvHi}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
