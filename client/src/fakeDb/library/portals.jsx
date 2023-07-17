export {
  headquarter,
  admin,
  manager,
  auditor,
  author,
  cashier,
  frontdesk,
  accreditation,
  laboratory,
  radiology,
  pharmacist,
  procurement,
  hr,
  nutritionist,
  utility,
  patron,
} from "../json/portals";

export const Portal = {
  find: (platform) => {
    switch (platform) {
      case "admin": // super Admin
        return admin;
      case "headquarter": // admin
        return headquarter;
      case "manager":
        return manager;
      case "auditor":
        return auditor;
      case "author":
        return author;
      case "cashier":
        return cashier;
      case "frontdesk":
        return frontdesk;
      case "accreditation":
        return accreditation;
      case "laboratory":
        return laboratory;
      case "radiology":
        return radiology;
      case "pharmacist":
        return pharmacist;
      case "procurement":
        return procurement;
      case "hr":
        return hr;
      case "nutritionist":
        return nutritionist;
      case "utility":
        return utility;
      default:
        return patron;
    }
  },
};
