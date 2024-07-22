import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Chip } from "@mui/material";
import { createItem } from "../services/itemService";

const CreateItemForm = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [variantClasses, setVariantClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [currentAttributes, setCurrentAttributes] = useState("");
  const [error, setError] = useState(null);

  const handleAddVariantClass = () => {
    if (!currentClass || !currentAttributes) {
      setError("Both class and attributes are required");
      return;
    }

    const attributesArray = currentAttributes
      .split(",")
      .map((attr) => attr.trim());
    setVariantClasses([
      ...variantClasses,
      { class: currentClass, attributes: attributesArray },
    ]);
    setCurrentClass("");
    setCurrentAttributes("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !itemCode || variantClasses.length === 0) {
      setError("Name, item code, and at least one variant class are required");
      return;
    }

    try {
      const newItem = await createItem({
        name,
        itemCode,
        variants: variantClasses,
      });
      onCreate(newItem);
      setName("");
      setItemCode("");
      setVariantClasses([]);
      setError(null);
    } catch (err) {
      setError("Failed to create item");
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Create New Item
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Item Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Item Code"
              fullWidth
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Add Variant Class</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Variant Class"
                  fullWidth
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Attributes (comma separated)"
                  fullWidth
                  value={currentAttributes}
                  onChange={(e) => setCurrentAttributes(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVariantClass}
            >
              Add Variant Class
            </Button>
            <Grid container spacing={1} marginTop={2}>
              {variantClasses.map((vc, index) => (
                <Grid item key={index}>
                  <Chip label={`${vc.class}: ${vc.attributes.join(", ")}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateItemForm;
