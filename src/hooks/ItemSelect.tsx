import React, { useEffect, useState } from "react";
import { Item } from "../model/item";
import { Button, Label, Select } from "flowbite-react";

type ItemSelectProps = {
  onItemsChange: (items: Item[]) => void;
};
const ItemSelect: React.FC<ItemSelectProps> = ({ onItemsChange }) => {
  const baseUrl = "https://lamaback-owg8.onrender.com";
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | "">("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(baseUrl + "/item");
        if (!response.ok) {
          throw new Error("Errore nel recupero degli items!");
        }
        const data: Item[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = () => {
    if (selectedItem === "") return;

    const itemToAdd = items.find((item) => item.id === Number(selectedItem));
    if (itemToAdd && !selectedItems.some((i) => i.id === itemToAdd.id)) {
      const updatedItems = [...selectedItems, itemToAdd];
      setSelectedItems(updatedItems);
      onItemsChange(updatedItems); // Informa il componente padre
    }
    setSelectedItem(""); // Resetta la selezione
  };

  return (
    <div>
      <Label htmlFor="items">Seleziona un item</Label>
      <div className="flex items-center gap-2">
        <Select
          id="items"
          value={selectedItem}
          onChange={(e) => setSelectedItem(Number(e.target.value))}
        >
          <option value="" disabled>
            -- Seleziona un item --
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <Button onClick={handleSelect}>Aggiungi</Button>
      </div>
    </div>
  );
};

export default ItemSelect;
