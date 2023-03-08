export const capacityFilters = [
  { _id: "1001", capFilter: 1500 },
  { _id: "1002", capFilter: 1800 },
  { _id: "1003", capFilter: 2000 },
  { _id: "1004", capFilter: 2500 },
  { _id: "1005", capFilter: 3000 },
  { _id: "1006", capFilter: 3500 },
  { _id: "1007", capFilter: 4000 },
  { _id: "1008", capFilter: 5000 },
  { _id: "1009", capFilter: 6000 },
  { _id: "10010", capFilter: 7000 },
  // { _id: "1008", capFilter: 8000 },
  { _id: "1011", capFilter: 10000 },
];

export function getCapacityFilters() {
  return capacityFilters.filter((g) => g);
}
