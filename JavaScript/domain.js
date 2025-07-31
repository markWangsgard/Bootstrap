const AllItems = [];

export const GetIncompleteItems = () => {
  return AllItems.filter((i) => !i.Complete).sort((a, b) => {
    return a.CreatedAt - b.CreatedAt;
  });
};
export const GetCompleteItems = () => {
  return AllItems.filter((i) => i.Complete).sort((a, b) => {
    return a.CreatedAt - b.CreatedAt;
  });
};

export const AddItem = (item) => {
  const newItem = {
    Item: item,
    Complete: false,
    CreatedAt: new Date(),
  };
  AllItems.push(newItem);
};
export const DeleteItem = (item) => {
  if (typeof item === "string") {
    item = AllItems.find((i) => i.Item === item);
  }
  AllItems.splice(AllItems.indexOf(item), 1);
};

export const ToggleComplete = (item) => {
  if (typeof item === "string") {
    item = AllItems.find((i) => i.Item === item);
  }
  AllItems.splice(AllItems.indexOf(item), 1);
  const newItem = {
    Item: item.Item,
    Complete: !item.Complete,
    CreatedAt: item.CreatedAt,
  };
  AllItems.push(newItem);
};
