// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

// Solution1: use await
let items = [];
let id;
const fetchListWithAmount = async (amount = 5) => {
  while (items.length < amount) {
    const resp = await fetchList(id);
    if (resp.items.length > 0) {
      items.push(...resp.items);
      id = items[items.length - 1];
    } else {
      break; // no more data from server
    }
  }
  return items.slice(0, amount);
};

// // you can change this to generator function if you want
// Solution 2: async generator func
// you can change this to generator function if you want
const fetchListWithAmount = async (amount = 5) => {
  let items = [];
  for await (const curItems of asyncFetch()) {
    items.push(...curItems);
  }
  async function* asyncFetch() {
    let id;
    while (items.length < amount) {
      let resp = await fetchList(id);
      if (!resp.items || resp.items.length === 0) {
        break;
      }
      id = resp.items[resp.items.length - 1].id;
      yield resp.items;
    }
  }
  return items.slice(0, amount);
};
