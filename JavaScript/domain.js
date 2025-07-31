const AllItems = [];

export const GetIncompleteItems = () => {
  return AllItems.filter((i) => !i.Complete);
};
export const GetCompleteItems = () => {
  return AllItems.filter((i) => i.Complete);
};

export const AddItem = (item) => {
  const newItem = {
    Item: item,
    Complete: false,
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
  if (typeof item === "string")
  {
    item = AllItems.find((i) => i.Item === item);
  }
    AllItems.splice(AllItems.indexOf(item), 1);
    const newItem = {
      Item: item.Item,
      Complete: (!item.Complete),
    };
    AllItems.push(newItem);
};
