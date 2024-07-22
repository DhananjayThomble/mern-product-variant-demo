import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  getItemCombinations,
  updateCombination,
} from "../services/itemService";

const ProductCombinations = ({ productId }) => {
  const [combinations, setCombinations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchCombinations = async () => {
      const data = await getItemCombinations(productId);
      setCombinations(data);
    };

    fetchCombinations();
  }, [productId]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setPrice(combinations[index].price);
    setQuantity(combinations[index].quantity);
  };

  const handleSave = async (index) => {
    await updateCombination(productId, index, price, quantity);
    const updatedCombinations = [...combinations];
    updatedCombinations[index].price = price;
    updatedCombinations[index].quantity = quantity;
    setCombinations(updatedCombinations);
    setEditingIndex(null);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Variant Combinations
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Combination</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinations.map((combination, index) => (
              <TableRow key={index}>
                <TableCell>{combination.combination.join(", ")}</TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  ) : (
                    combination.price
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  ) : (
                    combination.quantity
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductCombinations;
