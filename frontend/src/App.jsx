import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import CreateItemForm from "./components/CreateItemForm";
import ProductCombinations from "./components/ProductCombinations";
import { getItems } from "./services/itemService";

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleItemCreated = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    setShowCreateForm(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Item Variants
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? "Back to Items" : "Create New Item"}
      </Button>
      {showCreateForm ? (
        <CreateItemForm onCreate={handleItemCreated} />
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem
                button
                key={item._id}
                onClick={() => setSelectedItemId(item._id)}
              >
                <ListItemText primary={item.name} secondary={item.itemCode} />
              </ListItem>
            ))}
          </List>
          {selectedItemId && <ProductCombinations productId={selectedItemId} />}
        </>
      )}
    </Container>
  );
};

export default App;
