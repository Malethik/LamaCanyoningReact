import React, { useEffect, useState } from "react";
import { Costumers } from "../model/costumers";
import { Label, Select } from "flowbite-react";

type CostumerSelectProps = {
  onCostumersChange: (id: number) => void;
};

const CostumerSelect: React.FC<CostumerSelectProps> = ({
  onCostumersChange,
}) => {
  const baseurl = "https://lamaback-owg8.onrender.com";
  const [costumers, setCostumers] = useState<Costumers[]>([]);
  const [selectedCostumer, setSelectedCostumer] = useState<number | "">("");

  useEffect(() => {
    const fetchCostumers = async () => {
      try {
        const response = await fetch(baseurl + "/costumers");
        if (!response.ok) {
          throw new Error("Errore nel recupero dei clienti!");
        }
        const data: Costumers[] = await response.json();
        setCostumers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCostumers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const costumerId = Number(e.target.value);
    setSelectedCostumer(costumerId);

    onCostumersChange(costumerId);
  };

  return (
    <div>
      <Label htmlFor="costumers">Seleziona un cliente</Label>
      <Select id="costumers" value={selectedCostumer} onChange={handleChange}>
        <option value="" disabled>
          -- Seleziona un cliente --
        </option>
        {costumers.map((costumer) => (
          <option key={costumer.id} value={costumer.id}>
            {costumer.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default CostumerSelect;
