const regions = require("../json/philreg/regions.json");
const provinces = require("../json/philreg/provinces.json");
const cities = require("../json/philreg/city-mun.json");
const brgys = require("../json/philreg/barangays.json");

export const Philippines = {
  regions: regions,
  region: "",
  provinces: provinces,
  province: "",
  cities: cities,
  city: "",
  barangays: brgys,
  barangay: "",
  address: "",

  // set Region && get Provices
  setRegionbyCode: (fk) => {
    Philippines.region = regions.find(({ code }) => code === fk);
    Philippines.provinces = provinces.filter(({ reg_code }) => reg_code === fk);
  },
  setRegionbyName: (value) => {
    Philippines.region = regions.find(({ name }) => name === value);
    const _provinces = provinces.filter(
      ({ reg_code }) => reg_code === Philippines.region.code
    );
    return _provinces;
  },

  // set Province && get Cities
  setProvinceByCode: (fk) => {
    Philippines.province = provinces.find(({ code }) => fk === code);
    Philippines.cities = cities.filter(({ prov_code }) => prov_code === fk);
  },
  setProvinceByName: (value) => {
    Philippines.province = provinces.find(({ name }) => name === value);
    const _cities = cities.filter(
      ({ prov_code }) => prov_code === Philippines.province.code
    );
    return _cities;
  },

  // set Municipality | city && get Barangay
  setCityByCode: (fk) => {
    Philippines.city = cities.find(({ code }) => fk === code);
    Philippines.barangays = brgys.filter(({ mun_code }) => fk === mun_code);
  },
  setCityByName: (value) => {
    Philippines.city = cities.find(({ name }) => name === value);
    const _barangays = brgys.filter(
      ({ mun_code }) => Philippines.city.code === mun_code
    );
    return _barangays;
  },
  getCityName: (city) => cities.find(({ code }) => code === Number(city))?.name,
  getProvinceName: (province) =>
    provinces.find(({ code }) => code === Number(province))?.name,
  getRegionName: (region) =>
    regions.find(({ code }) => code === Number(region))?.name,
  // get all barangays in selected city or municipality
  getBarangay: (value) => {
    Philippines.city = cities.find(({ name }) => name === value);
    const _barangays = brgys.filter(
      ({ mun_code }) => mun_code === Philippines.city.code
    );
    return _barangays;

    Philippines.barangay = value;
  },

  sort: (arr, sort = "A") => {
    // A for asc
    // z for desc

    var sorted = arr.slice(0);

    if (sort === "A") {
      sorted.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (sort === "Z") {
      sorted.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return y < x ? -1 : y > x ? 1 : 0;
      });
    }

    return sorted;
  },
};
