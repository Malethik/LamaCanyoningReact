import React, { useEffect, useState } from "react";
import { Supplier } from "../model/supplier";

type SupplierSelectProps = {
  onSupplierChange: (id: number) => void; // Callback per aggiornare il fornitore selezionato
};

const SupplierSelect: React.FC<SupplierSelectProps> = ({
  onSupplierChange,
}) => {
  const baseUrl = "https://lamaback-owg8.onrender.com";
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | "">("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(baseUrl + "/supplier");
        if (!response.ok) {
          throw new Error("Errore nel recupero dei fornitori");
        }
        const data: Supplier[] = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const supplierId = Number(e.target.value);
    setSelectedSupplier(supplierId);
    onSupplierChange(supplierId); // Informa il componente padre
  };

  return (
    <div>
      <label htmlFor="supplier">Seleziona Fornitore:</label>
      <select id="supplier" value={selectedSupplier} onChange={handleChange}>
        <option value="" disabled>
          -- Seleziona un fornitore --
        </option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupplierSelect;
