import React, { useState } from "react";
import usePost from "../hooks/usePost";
import { Item } from "../model/user";
import SupplierSelect from "../hooks/SupplierSelect";

const CreateItem: React.FC = () => {
  const { data, error, loading, postData } = usePost<Item>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [supplierId, setSupplier] = useState<number>(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData("item", { name, description, price, quantity, supplierId });
  };

  return (
    <>
      <h2>CreateItem</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Prezzo"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Quantità"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <SupplierSelect onSupplierChange={setSupplier} />

          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crea Oggetto"}
          </button>
        </form>
        {error && <p>Errore: {error}</p>}
        {data && <p>Oggetto creato con ID: {data.id}</p>}
      </div>
    </>
  );
};

export default CreateItem;
