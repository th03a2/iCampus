import React from "react";
import {
  fecalColor,
  consistency,
  microscopicResultInWord,
  ph,
  resultInBool,
  bacteriaInRange,
  microscopicInRange,
} from "../../../../../../assets/references";
const Overview = () => {
  // const { service, result, units, lo, hi } = deal;
  // const color = {
  //   color: deal?.result < deal.lo ? "blue" : deal?.result > deal.hi && "red",
  //   fontWeight: "bold",
  // };
  const deal = JSON.parse(localStorage.getItem(`task-printout`));
  const pe = deal?.pe || [null, null];
  const color = pe[0];
  const _consistency = pe[1];
  const ce = deal?.ce || [null, null];
  const _ph = ce[0];
  const occult = ce[1];
  const me = deal?.me || [null, null, null, null, null, null];
  const pus = me[0];
  const red = me[1];
  const bac = me[2];
  const yeast = me[3];
  const fat = me[4];

  // const design = {
  // color: value < lo ? "blue" : value > hi && "red",
  // fontWeight: "bold",
  // };

  return (
    <>
      <tr key={`result-1`}>
        <td className="py-0 px-2">Color</td>
        <td
          className="py-0 px-2"
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {fecalColor[color]}
        </td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">Pus cells</td>
        <td
          className="py-0 px-2"
          style={{ color: pus > 3 && "red", fontWeight: "bold" }}
        >
          {microscopicInRange[pus]}
        </td>
      </tr>
      <tr key={`result-2`}>
        <td className="py-0 px-2">Consistency </td>
        <td className="py-0 px-2" style={{ fontWeight: "bold" }}>
          {consistency[_consistency]}
        </td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">Red cells</td>
        <td
          className="py-0 px-2"
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {microscopicInRange[red]}
        </td>
      </tr>
      <tr key={`result-3`}>
        <td className="py-0 px-2">Stool pH</td>
        <td className="py-0 px-2" style={{ fontWeight: "bold" }}>
          {ph[_ph]}
        </td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">Bacteria</td>
        <td
          className="py-0 px-2"
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {bacteriaInRange[bac]}
        </td>
      </tr>
      <tr key={`result-4`}>
        <td className="py-0 px-2">Occult Blood</td>
        <td className="py-0 px-2" style={{ fontWeight: "bold" }}>
          {resultInBool[occult]}
        </td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">Yeast Cells</td>
        <td
          className="py-0 px-2"
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {microscopicResultInWord[yeast]}
        </td>
      </tr>
      <tr key={`result-6`}>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">&nbsp;</td>
        <td className="py-0 px-2">Fat Globules</td>
        <td
          className="py-0 px-2"
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {microscopicResultInWord[fat]}
        </td>
      </tr>
    </>
  );
};

export default Overview;
