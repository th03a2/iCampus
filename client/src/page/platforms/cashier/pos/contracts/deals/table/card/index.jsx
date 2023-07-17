import React, { useEffect, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { currencyFormatter } from "./../../../../../../../../components/utilities";
import { useSelector, useDispatch } from "react-redux";
import { REMOVEITEM } from "../../../../../../../../redux/slices/commerce/pos";

export default function TableCard({ deal, index }) {
  const [title, setTitle] = useState(""),
    { percentage, category, privilege } = useSelector(({ pos }) => pos),
    [net, setNet] = useState(0),
    [srp, setSrp] = useState(0),
    [gotPromo, setGotPromo] = useState(false),
    [gotDiscount, setGotDiscount] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (deal._id) {
      const amount = deal[category === "walkin" ? "opd" : category];

      setSrp(amount);

      if (category === "walkin" || category === "opd") {
        if (deal.isPromo) {
          setNet(deal.promo);
          setGotPromo(true);
        } else {
          setGotPromo(false);
          if (privilege > 0 && deal.discountable) {
            setNet((amount * (100 - percentage)) / 100);
            setGotDiscount(true);
          } else {
            setGotDiscount(false);
            setNet(amount);
          }
        }
      } else {
        setGotPromo(false);
        if (privilege > 0 && deal.discountable) {
          setNet((amount * (100 - percentage)) / 100);
          setGotDiscount(true);
        } else {
          setNet(amount);
          setGotDiscount(false);
        }
      }
    }
  }, [deal, category, privilege, percentage]);

  useEffect(() => {
    if (deal._id) {
      var str = "";

      deal.services?.map((service, index) => {
        str += `${service.abbreviation || service.name}${
          deal.services.length - 1 !== index ? ", " : ""
        }`;
      });

      setTitle(str);
    }
  }, [deal]);

  return (
    <tr title={`Services: ${title}`}>
      <td>
        <p className="fw-normal mb-1">{deal.name}</p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">{currencyFormatter(srp)}</p>
      </td>
      <td>
        <p
          title={
            gotPromo ? "Active promo" : gotDiscount ? "Active discount" : ""
          }
          className={`text-center fw-normal mb-1 d-flex align-items-center justify-content-between ${
            gotPromo && "text-warning"
          } ${gotDiscount && "text-success"}`}
        >
          <span>{currencyFormatter(net)}</span>
          <MDBIcon
            onClick={() => dispatch(REMOVEITEM(index))}
            icon="trash"
            className="ms-1 cursor-pointer"
            color="danger"
            title={`Remove ${deal.name}`}
          />
        </p>
      </td>
    </tr>
  );
}
