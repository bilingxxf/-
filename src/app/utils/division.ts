import { provinces } from '../../assets/provinces'
import { cities } from '../../assets/cities';
import { areas } from '../../assets/areas';

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.name,
      isLeaf: true
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.name,
      children: city.children,
    });
  }
});

export const divisions = provinces.map(province => ({
  label: province.name,
  value: province.name,
  children: province.children,
}));
