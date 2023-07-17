import { Dengue, BloodTyping, Cluster, Pregtest, Typhoid } from "./categories";

export const bodySwitcher = packages => {
  if (packages.includes(77)) {
    return Dengue;
  } else if (packages.includes(66)) {
    return BloodTyping;
  } else if (packages.includes(67)) {
    return Pregtest;
  } else if (packages.includes(120)) {
    return Typhoid;
  } else {
    return Cluster;
  }
};
