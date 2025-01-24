import React, { useState } from "react";
import usePost from "../hooks/usePost";
import { Item } from "../model/item";
import SupplierSelect from "../hooks/SupplierSelect";
import { Button, Label, TextInput } from "flowbite-react";

const CreateItem: React.FC = () => {
  const { data, error, loading, postData } = usePost<Item>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [supplierId, setSupplier] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData("item", { name, description, price, quantity, supplierId, cost });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-2 block">
            <Label htmlFor="name" color="info" value="Nome" />
          </div>
          <TextInput
            id="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            color="info"
          />

          {/* Descrizione */}
          <div className="mb-2 block">
            <Label htmlFor="description" color="info" value="Descrizione" />
          </div>
          <TextInput
            id="description"
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            color="info"
          />

          {/* Prezzo */}
          <div className="mb-2 block">
            <Label htmlFor="price" color="info" value="Prezzo" />
          </div>
          <TextInput
            id="price"
            type="number"
            placeholder="Prezzo"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            color="info"
          />

          {/* Costo */}
          <div className="mb-2 block">
            <Label htmlFor="price" color="info" value="Costo" />
          </div>
          <TextInput
            id="costo"
            type="number"
            placeholder="Costo"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            required
            color="info"
          />

          {/* Quantità */}
          <div className="mb-2 block">
            <Label htmlFor="quantity" color="info" value="Quantità" />
          </div>
          <TextInput
            id="quantity"
            type="number"
            placeholder="Quantità"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            color="info"
          />

          {/* Supplier */}
          <div className="mb-2 block">
            <Label htmlFor="supplier" color="info" value="Fornitore" />
          </div>
          <SupplierSelect onSupplierChange={setSupplier} />

          {/* Bottone Submit */}
          <Button
            className="mt-2.5"
            type="submit"
            disabled={loading}
            color="info"
          >
            {loading ? "Creando..." : "Crea Oggetto"}
          </Button>
        </form>
        {error && <p>Errore: {error}</p>}
        {data && <p>Oggetto creato con ID: {data.id}</p>}
      </div>
    </>
  );
};

export default CreateItem;
