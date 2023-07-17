import { Inhouse } from "./inhouse";
import { Sendout } from "./sendout";
import { Subcon } from "./subcontract";

export const salesSwitchers = (category) => {
  switch (category) {
    case "sendout":
      return Sendout;
    case "Subcon":
      return Subcon;
    default:
      return Inhouse;
  }
};
