import React, { useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import { nameFormatter } from "../../../../../../../../components/utilities";
import InhouseTable from "./table";
import { useSelector, useDispatch } from "react-redux";
import { save } from "../../../../../../../../redux/sqlbuilder";
import { UPDATE } from "../../../../../../../../redux/slices/commerce/sales";
import { sourceColors } from "../../../../../../../../assets/references";
import {
  currencyFormatter,
  harvestTask,
} from "../../../../../../../../components/utilities";
import SendoutModal from "./form";

export default function InhouseCard({
  sold,
  index,
  activeIndex,
  setActiveIndex,
}) {
  const { auth, token, onDuty } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index);
  const { category, renderedBy, customerId, deals, amount } = sold;

  const formModal = () => setVisibility(!visibility);

  const formHandlers = () => {
    var task = harvestTask(sold.deals);
    console.log("task", task);
    Object.keys(task).map(key => {
      console.log("key", key);

      if (key === "Miscellaneous") {
        const buntis = [68, 69, 70, 131, 97]; // HIV, RPR, HBsAg, HAV, HCV
        var tests = task[key];
        // Check if all elements to remove are present in the array
        const buntisPresent = buntis.filter(item => test.includes(item));
        if (buntisPresent.length > 0) {
          tests = tests.filter(item => !buntis.includes(item));
          save(
            `results/laboratory/miscellaneous`,
            {
              packages: buntisPresent,
              saleId: sold._id,
              customerId: sold.customerId?._id,
              branchId: onDuty._id,
            },
            token,
            false
          );
        }

        // Solo form:
        // 1. Preg test (70),
        // 2. Dengue Duo (77),
        // 3. Blood Typing (66)
        const newArr = tests.map(test => ({
          packages: [test],
          saleId: sold._id,
          customerId: sold.customerId?._id,
          branchId: onDuty._id,
        }));

        save(`results/laboratory/miscellaneous`, newArr, token, false);
      } else if (key === "ECG" || key === "X-ray") {
        save(
          `results/radiology/${String(key).toLowerCase()}`,
          {
            packages: task[key],
            _id: sold._id,
            customerId: sold.customerId?._id,
            branchId: onDuty._id,
          },
          token,
          false
        );
      } else {
        save(
          `results/laboratory/${String(key).toLowerCase()}`,
          {
            packages: task[key],
            _id: sold._id,
            customerId: sold.customerId?._id,
            branchId: onDuty._id,
          },
          token,
          false
        );
      }
    });

    dispatch(
      UPDATE({
        data: {
          renderedBy: auth._id,
          renderedAt: new Date().toLocaleString(),
          hasResult: true,
        },
        id: sold._id,
        token,
      })
    );
    setActiveIndex(0);
  };

  return (
    <MDBTypography
      note
      noteColor={renderedBy ? "primary" : "warning"}
      className="text-dark mb-2"
    >
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{index}.</strong>
          <span className="ms-2 me-3">
            {nameFormatter(customerId?.fullName, false)}
          </span>
          <MDBBadge className="text-uppercase" color={sourceColors(category)}>
            {category}
          </MDBBadge>
        </span>
        <span>
          {currencyFormatter(amount)}
          <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
            <MDBIcon
              icon={`caret-${index === activeIndex ? "down" : "left"}`}
              color="white"
            />
          </MDBBtn>
        </span>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <InhouseTable deals={deals || []} />
        <div className="d-flex justify-content-between">
          <MDBBtn color="danger" onClick={formModal}>
            Create Request Sendout
          </MDBBtn>
          <MDBBtn color="info" onClick={formHandlers}>
            Generate Tickets(Front desk)
          </MDBBtn>
        </div>
      </MDBCollapse>
      <SendoutModal
        sold={sold}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </MDBTypography>
  );
}
