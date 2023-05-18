export const engTypes = [
  { _id: "2001", name: "Electric" },
  { _id: "2002", name: "Diesel" },
  { _id: "2003", name: "LPG" },
 //{ _id: "2004", name: "Warehouse" },
  { _id: "2005", name: "Rough Terrain" },
  { _id: "2006", name: "Reach" },
  { _id: "2007", name: "Warehouse" }
];

export const engRestrictedTypes = [
  { _id: "2001", name: "Electric" },
  { _id: "2005", name: "Rough Terrain" },
  { _id: "2007", name: "Warehouse" }
];

export function getEngTypes(restricted) {

  if (restricted) return engRestrictedTypes.filter(g => g);
  return engTypes.filter(g => g);
}



