import React, { useState } from "react";
import usePost from "../hooks/usePost";
import { Supplier } from "../model/supplier";
import { Button, Label, TextInput } from "flowbite-react";

const CreateSupplier: React.FC = () => {
  const { data, error, loading, postData } = usePost<Supplier>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData("supplier", { name, email, phone, address });
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

          {/* Email */}
          <div className="mb-2 block">
            <Label htmlFor="email" color="info" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            color="info"
          />

          {/* telefono */}
          <div className="mb-2 block">
            <Label htmlFor="phone" color="info" value="Telefono" />
          </div>
          <TextInput
            id="phone"
            type="text"
            placeholder="Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            color="info"
          />

          {/* Indirizzo */}
          <div className="mb-2 block">
            <Label htmlFor="adress" color="info" value="Quantità" />
          </div>
          <TextInput
            id="adress"
            type="text"
            placeholder="Indirizzo"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            color="info"
          />
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

export default CreateSupplier;
