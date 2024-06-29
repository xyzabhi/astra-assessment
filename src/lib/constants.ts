const routes = [
  { href: "/people", label: "Characters" },
  { href: "/planets", label: "Planets" },
  { href: "/starships", label: "StarShips" },
  { href: "/species", label: "Species" },
  { href: "/vehicles", label: "Vehicles" },
];

const keysEntityMap: any = {
  people: [
    {
      key: "name",
      label: "Name",
    },
    { key: "mass", label: "Mass" },
    { key: "hair_color", label: "Hair Color" },
    { key: "gender", label: "Gender" },
    { key: "height", label: "Height" },
  ],
  planets: [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "diameter",
      label: "Diameter",
    },
    {
      key: "population",
      label: "Population",
    },
    {
      key: "orbital_period",
      label: "Days in Year",
    },
    {
      key: "climate",
      label: "Climate",
    },
  ],
  starships: [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "passengers",
      label: "Passengers",
    },
    {
      key: "max_atmosphering_speed",
      label: "Speed",
    },
    {
      key: "cargo_capacity",
      label: "Capacity",
    },
    {
        key: "length",
        label: "Length",
      },
  ],
  species: [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "language",
      label: "Language",
    },
    {
      key: "average_heigh",
      label: "Avg. Height",
    },
    {
      key: "skin_colors",
      label: "Skin Colors",
    },
    {
        key: "eye_colors",
        label: "Eye Colors",
      },
  ],
  vehicles: [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "length",
      label: "Length",
    },
    {
      key: "crew",
      label: "Crew",
    },
    {
      key: "max_atmosphering_speed",
      label: "Speed",
    },
    {
        key: "cargo_capacity",
        label: "Capacity",
      },
  ],
};
const STAR_WARS_API_BASE_URL = "https://www.swapi.tech/api/";
export { routes, STAR_WARS_API_BASE_URL, keysEntityMap };
