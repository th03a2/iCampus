import React from "react";
import {
  urineColors,
  transparency,
  specificGravity,
  ph,
  resultInRange,
  microscopicInRange,
  microscopicResultInWord,
} from "../../../../../../assets/references";
import { MDBTypography } from "mdb-react-ui-kit";

const Overview = () => {
  const deal = JSON.parse(localStorage.getItem(`task-printout`));
  const pe = deal?.pe;
  const color = pe[0];
  const _transparency = pe[1];
  const sg = pe[2];
  const _ph = pe[3];
  const ce = deal?.ce;
  const sugar = ce[0];
  const protien = ce[1];
  const billirubin = ce[2];
  const ketone = ce[3];
  const blood = ce[4];
  const urobilinogen = ce[5];
  const nitrate = ce[6];
  const leukocytes = ce[7];
  const me = deal?.me;
  const pus = me[0];
  const red = me[1];
  const epithelial = me[2];
  const mucus = me[3];
  const amorphous = me[4];
  const bacteria = me[5];

  return (
    <>
      <tr key={`result-1`} className="my-0">
        <td className="py-0 px-2 ">Color</td>
        <td
          className="py-0 px-2 "
          style={{ color: color > 3 && "red", fontWeight: "bold" }}
        >
          {urineColors[color]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Sugar</td>
        <td
          className="py-0 px-2"
          style={{ color: sugar > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[sugar]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Blood</td>
        <td
          className="py-0 px-2"
          style={{ color: blood > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[blood]}
        </td>
      </tr>
      <tr key={`result-2`}>
        <td className="py-0 px-2">Transparency</td>
        <td
          className="py-0 px-2"
          style={{ color: _transparency > 0 && "red", fontWeight: "bold" }}
        >
          {transparency[_transparency]}
        </td>
        <td className="py-0 px-2 "></td>

        <td className="py-0 px-2">Protein</td>
        <td
          className="py-0 px-2"
          style={{ color: protien > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[protien]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Urobilinogen</td>
        <td
          className="py-0 px-2"
          style={{ color: urobilinogen > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[urobilinogen]}
        </td>
      </tr>
      <tr key={`result-3`}>
        <td className="py-0 px-2">Specific Gravity</td>
        <td className="py-0 px-2">
          <MDBTypography className="mb-0 font-weight-bold">
            {specificGravity[sg]}
          </MDBTypography>
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Bilirubin</td>
        <td
          className="py-0 px-2"
          style={{ color: billirubin > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[billirubin]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Nitrate</td>
        <td
          className="py-0 px-2"
          style={{ color: nitrate > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[nitrate]}
        </td>
      </tr>
      <tr key={`result-4`}>
        <td className="py-0 px-2">Reaction/ pH</td>
        <td className="py-0 px-2">
          <MDBTypography className="mb-0 font-weight-bold">
            {ph[_ph]}
          </MDBTypography>
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Ketone</td>
        <td
          className="py-0 px-2"
          style={{ color: ketone > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[ketone]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Leukocytes</td>
        <td
          className="py-0 px-2"
          style={{ color: leukocytes > 0 && "red", fontWeight: "bold" }}
        >
          {resultInRange[leukocytes]}
        </td>
      </tr>
      <tr key={`result-5`}>
        <td colSpan={10} className="text-center py-1">
          Microscopic Examination
        </td>
      </tr>
      <tr key={`result-6`}>
        <td className="py-0 px-2">PUS</td>
        <td
          className="py-0 px-2"
          style={{ color: pus > 2 && "red", fontWeight: "bold" }}
        >
          {microscopicInRange[pus]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Epithelial cell</td>
        <td className="py-0 px-2">
          <MDBTypography className="mb-0 font-weight-bold">
            {microscopicResultInWord[epithelial]}
          </MDBTypography>
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">
          Amorphous {_ph < 2 ? "urates" : "phosphates"}
        </td>
        <td className="py-0 px-2">
          <MDBTypography className="mb-0 font-weight-bold">
            {microscopicResultInWord[amorphous]}
          </MDBTypography>
        </td>
      </tr>
      <tr key={`result-7`}>
        <td className="py-0 px-2">Red cells</td>
        <td
          className="py-0 px-2"
          style={{ color: red > 2 && "red", fontWeight: "bold" }}
        >
          {microscopicInRange[red]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Mucus Threads</td>
        <td
          className="py-0 px-2"
          style={{ color: mucus > 1 && "red", fontWeight: "bold" }}
        >
          {microscopicResultInWord[mucus]}
        </td>
        <td className="py-0 px-2 "></td>
        <td className="py-0 px-2">Bacteria</td>
        <td
          className="py-0 px-2"
          style={{ color: bacteria > 1 && "red", fontWeight: "bold" }}
        >
          {microscopicResultInWord[bacteria]}
        </td>
      </tr>
    </>
  );
};

export default Overview;
