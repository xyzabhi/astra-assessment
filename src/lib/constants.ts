const routes = [
  { href: "/", label: "Home" },
  { href: "/people", label: "Characters" },
  { href: "/films", label: "Films" },
  { href: "/planets", label: "Planets" },
  { href: "/starships", label: "StarShips" },
];

const keysEntityMap :any= {
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
};
const STAR_WARS_API_BASE_URL = "https://www.swapi.tech/api/";
export { routes, STAR_WARS_API_BASE_URL ,keysEntityMap};
