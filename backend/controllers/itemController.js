const Item = require("../models/Item");

exports.generateCombinations = (variants) => {
  const combinations = [];

  const generate = (current, index) => {
    if (index === variants.length) {
      combinations.push(current);
      return;
    }
    for (const attribute of variants[index].attributes) {
      generate(
        [...current, `${variants[index].class}: ${attribute}`],
        index + 1
      );
    }
  };

  generate([], 0);
  return combinations;
};

exports.createItem = async (req, res) => {
  try {
    const { name, itemCode, variants } = req.body;
    const combinations = exports
      .generateCombinations(variants)
      .map((combo) => ({
        combination: combo,
        price: 0,
        quantity: 0,
      }));

    const newItem = new Item({ name, itemCode, variants, combinations });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.updateCombination = async (req, res) => {
  const { itemId, index } = req.params;
  const { price, quantity } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.combinations[index].price = price;
    item.combinations[index].quantity = quantity;
    await item.save();

    res.status(200).json(item.combinations[index]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getItemCombinations = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item.combinations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
