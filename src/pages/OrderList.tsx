import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Order } from "../model/order";

import CreateModal from "../components/CreateModal";
import { Button, Table } from "flowbite-react";
import calculateTotalItemCost from "../helper/calculateTotalItemCost";

const OrderList: React.FC = () => {
  const { data, error, loading, refetch } = useFetch<Order[]>("order");
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false);
    refetch(); 
  };
  if (loading) {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span>Loading...⏰SERVER WAKE UP⏰</span>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (data?.length === 0) {
    return (
      <>
        <Button onClick={() => setOpenModal(true)}>Aggiungi ordine</Button>
        <div>Nessun ordine</div>;
        <CreateModal
          contentType="order"
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleModalClose}
        />
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Aggiungi ordine</Button>
      <CreateModal
        contentType="order"
        openModal={openModal}
        setOpenModal={setOpenModal}
        onClose={handleModalClose}
      />
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Item</Table.HeadCell>
          <Table.HeadCell>Cliente</Table.HeadCell>
          <Table.HeadCell>Totale</Table.HeadCell>
          <Table.HeadCell>Costo</Table.HeadCell>
          <Table.HeadCell>Inviato</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((data) => (
            <Table.Row
              key={data.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data.items.map((item) => (
                  <div key={item.item.id}>{item.item.name}</div>
                ))}
              </Table.Cell>
              <Table.Cell>{data.costumers.name}</Table.Cell>
              <Table.Cell>{data.total} €</Table.Cell>
              <Table.Cell>{calculateTotalItemCost(data.items)} €</Table.Cell>
              <Table.Cell>
                {data.sended ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-xmark"></i>
                )}
              </Table.Cell>
              <Table.Cell>
                <i className="fa-solid fa-pen"></i>
                <a
                  href="#"
                  className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default OrderList;
