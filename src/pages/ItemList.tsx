import { Button, Table } from "flowbite-react";

import useFetch from "../hooks/useFetch";
import { Item } from "../model/item";
import { useState } from "react";
import CreateModal from "../components/CreateModal";

const ItemList: React.FC = () => {
  const { data, error, loading } = useFetch<Item[]>("item");
  const [openModal, setOpenModal] = useState(false);
  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>{error}</div>
      </>
    );
  }
  if (data?.length === 0) {
    return (
      <>
        <Button onClick={() => setOpenModal(true)}>Create New Item</Button>
        <div>No items</div>
        <CreateModal
          contentType="item"
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </>
    );
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create New Item</Button>
      <CreateModal
        contentType="item"
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Costo</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Supplier</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.cost}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.supplier.name}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ItemList;
