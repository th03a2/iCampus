const platforms = require("../json/platforms.json");

const checkPortal = (access) =>
  platforms.filter(({ code }) => access.includes(code));

export const GrantedPortal = {
  find: (designation) => {
    switch (designation) {
      case "dev":
      case 6:
      case 15: // CEO
        return checkPortal([
          "headquarter",
          "manager",
          // "admin",
          // "auditor",
          // "author",
          // "procurement",
          // "laboratory",
          // "radiology",
          // "pharmacy",
          // "clinical",
          // "utility",
          // "nutritionist",
          // "carpentry",
          "accreditations",
          "cashier",
          "frontdesk",
          "patron",
        ]);
      case 14: // AO
        return checkPortal([
          "manager",
          // "auditor",
          "accreditations",
          "cashier",
          "frontdesk",
          "patron",
        ]);
      case 17: // hr
        return checkPortal(["hr", "patron"]);
      case 20: //frontdesk
        return checkPortal(["frontdesk", "patron"]);
      case 21: // labtech
      case 22: // medtech
        return checkPortal([
          "accreditations",
          // "laboratory",
          "cashier",
          "frontdesk",
          "patron",
        ]);
      case "radtech": // Radiologic technician
      case "sonographer":
        return checkPortal(["accreditations", "radiology", "patron"]);
      case "pharmacist":
        return checkPortal(["accreditations", "pharmacy", "cashier", "patron"]);
      case "nurse":
        return checkPortal(["accreditations", "clinical", "cashier", "patron"]);
      case "physician":
      case "Medical admissions clerk":
        return checkPortal(["clinical", "patron"]);
      case "Occupational therapist":
        return checkPortal(["therapist", "patron"]);
      case "Coding specialist":
        return checkPortal(["billing", "patron"]);
      case "purchasing":
        return checkPortal(["procurement", "patron"]);
      case "utility":
      case "laundry":
        return checkPortal(["utility", "patron"]);
      case "carpentry":
        return checkPortal(["carpentry", "patron"]);
      case "guard":
      case "driver":
        return checkPortal(["guard", "patron"]);
      case "cashier":
        return checkPortal(["cashier", "patron"]);
      default:
        return checkPortal(["patron"]);
    }
  },
};
