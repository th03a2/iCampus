import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/breadcrumb";
import CompanyTables from "./cards";
import { APPLICATION } from "../../../../redux/slices/assets/persons/personnels";
import Pager from "../../../../components/pager";

const path = [
  {
    path: "List of Companies",
  },
];

export default function UnsetApply() {
  const { theme, token, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [history, setHistory] = useState([]),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    auth._id && dispatch(APPLICATION({ data: { _id: auth._id } }));
  }, [dispatch, auth]);

  useEffect(() => {
    setHistory(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (!!history.length) {
      //Pagination
      let totalPages = Math.floor(history.length / maxPage);
      if (history.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [history, page]);

  const handleSearch = (string) => {
    if (string) {
      setHistory(
        catalogs?.filter((catalog) =>
          String(catalog.name).toLowerCase().startsWith(string.toLowerCase())
        )
      );
    } else {
      setHistory(catalogs);
    }
  };

  const [value, setValue] = useState("");
  const [operators, setOperators] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");

  const handleNumbers = (num) => {
    if (operators) {
      setNum2((prev) => prev + num);
      setValue((prev) => prev + num);
    } else {
      setNum1((prev) => prev + num);
      setValue((prev) => prev + num);
    }
  };

  const handleOperators = (operator) => {
    if (operators) {
      const index = value.indexOf(operators);
      const newValue = value.slice(0, index) + operator;
      setValue(newValue);
      setOperators(operator);
    } else {
      setOperators(operator);
      setValue((prev) => prev + operator);
    }
  };

  const handleDecision = () => {
    var total = 0;
    switch (operators) {
      case "+":
        total = Number(num1) + Number(num2);
        break;
      case "-":
        total = Number(num1) - Number(num2);
        break;
      case "*":
        total = Number(num1) * Number(num2);
        break;

      default:
        total = Number(num1) / Number(num2);
        break;
    }
    setValue((prev) => prev + "=" + total);
  };

  const handleBackSpace = () => {
    const newValue = value.slice(0, -1);
    setValue(newValue);

    if (operators) {
      const newNum2 = num2.slice(0, -1);
      setNum2(newNum2);
      console.log(newNum2);
    } else {
      const newNum1 = num1.slice(0, -1);
      setNum1(newNum1);
    }
    if (num2.length === 0) {
      setOperators("");
    }
  };

  const handleClear = () => {
    setValue("");
    setOperators("");
    setNum1("");
    setNum2("");
  };

  return (
    <>
      {/* <BreadCrumb title="Applied Companies" paths={path} /> */}
      {/* <MDBContainer className="py-5 mt-4"> */}
      <MDBContainer className="d-flex justify-content-center">
        {/* <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Company name"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <CompanyTables history={history} page={page} /> */}

        <div>
          <MDBRow>
            <MDBCol md={12}>
              <MDBInput value={value} type="text" readOnly />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol md={3}>
              <MDBBtn onClick={handleBackSpace}>X</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={handleClear}>c</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol md={"3"}>
              <MDBBtn onClick={() => handleNumbers("7")}>7</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("8")}>8</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("9")}>9</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleOperators("*")}>x</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("4")}>4</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("5")}>5</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("6")}>6</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleOperators("-")}>-</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("1")}>1</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("2")}>2</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("3")}>3</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleOperators("+")}>+</MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-2">
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleOperators("+")}>+</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers("0")}>0</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={() => handleNumbers(".")}>.</MDBBtn>
            </MDBCol>
            <MDBCol md={3}>
              <MDBBtn onClick={handleDecision}>=</MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
        {/* Modal must be here */}
      </MDBContainer>
    </>
  );
}
