import React, { useEffect, useState } from "react";
import usePost from "../hooks/usePost";
import { Order } from "../model/order";
import { Item } from "../model/item";
import { Button, Label, Radio, TextInput } from "flowbite-react";

import CostumerSelect from "../hooks/CostumerSelect";
import ItemSelect from "../hooks/ItemSelect";

const CreateOrder: React.FC = () => {
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
    postData,
  } = usePost<Order>();

  const [items, setSelectedItems] = useState<Item[]>([]);
  const [costumersId, setcostumersId] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [sended, setSended] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedItems = items.map((i) => ({
      itemId: i.id,
      quantity: i.quantity || 1,
    }));
    console.log("Payload inviato:", {
      total,
      item: formattedItems,
      costumersId: costumersId,
    });
    await postData("order", {
      total,
      items: formattedItems,
      costumersId,
      sended,
    });
  };

  useEffect(() => {
    const calculatedTotal = items.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(calculatedTotal);
  }, [items]);
  /* Calcolo autometico del totale */
  const calculateTotal = () => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(newTotal);
  };

  const handleItemsChange = (selectedItems: Item[]) => {
    setSelectedItems(selectedItems);
    calculateTotal(); // Aggiorna il totale quando gli articoli cambiano
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Costumers */}
          <div className="mb-2 block">
            <Label htmlFor="costumers" color="info" value="Clienti" />
          </div>
          <CostumerSelect onCostumersChange={setcostumersId} />

          {/* Items */}

          <ItemSelect onItemsChange={handleItemsChange} />
          <div className="mb-2 block">
            <Label htmlFor="item" color="info" value="Item Selezionati" />
          </div>
          <ul>
            {items.map((item, index) => (
              <li key={item.id}>
                <i className="fa-solid fa-check"></i>
                {item.name} -
                <TextInput
                  type="number"
                  min="1"
                  value={item.quantity || 1}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    setSelectedItems((prev) =>
                      prev.map((it, idx) =>
                        idx === index ? { ...it, quantity: newQuantity } : it
                      )
                    );
                    calculateTotal();
                  }}
                />
              </li>
            ))}
          </ul>

          {/* Total */}
          {/* se vuoi inserire valore a mano */}
          {/* <div className="mb-2 block">
            <Label htmlFor="total" color="info" value="Totale" />
          </div>
          <TextInput
            id="total"
            type="number"
            placeholder="Totale"
            value={orderData?.total}
            onChange={(e) => setTotal(Number(e.target.value))}
            required
            color="info"
          /> */}

          {/* se vuoi calcolo automatico */}
          <div className="mb-2 block">
            <Label htmlFor="total" color="info" value="Totale" />
          </div>
          <p id="total" className="font-bold">
            Totale: €{total.toFixed(2)}
          </p>

          {/* sended opcion*/}
          <fieldset className="flex flex-col gap-4 max-w-md">
            <legend className="mb-4">È stato inviato?</legend>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="sended-yes"
                  name="sended"
                  value="true"
                  onChange={(e) => setSended(e.target.value === "true")}
                />
                <Label htmlFor="sended-yes">Sì</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="sended-no"
                  name="sended"
                  value="false"
                  defaultChecked
                  onChange={(e) => setSended(e.target.value === "true")}
                />
                <Label htmlFor="sended-no">No</Label>
              </div>
            </div>
          </fieldset>

          {/* Bottone Submit */}
          <Button
            className="mt-2.5"
            type="submit"
            disabled={orderLoading}
            color="info"
          >
            {orderLoading ? "Creando..." : "Crea Oggetto"}
          </Button>
        </form>
        {orderError && <p>Errore: {orderError}</p>}
        {orderData && <p>Oggetto creato con ID: {orderData.id}</p>}
      </div>
    </>
  );
};

export default CreateOrder;
