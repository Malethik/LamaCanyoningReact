import { Button, Table } from "flowbite-react";

import useFetch from "../hooks/useFetch";
import { Supplier } from "../model/supplier";
import { useState } from "react";
import CreateModal from "../components/CreateModal";

const SupplierList: React.FC = () => {
  const { data, error, loading } = useFetch<Supplier[]>("supplier");
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
        <Button
          onClick={() => setOpenModal(true)}
          className="bg-cyan-600 text-white p-2 rounded-lg"
        >
          Aggiungi fornitore
        </Button>

        <div>Nessun fornitore</div>
        <CreateModal
          contentType="supplier"
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </>
    );
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Aggiungi fornitore</Button>
      <CreateModal
        contentType="supplier"
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
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
                {data.name}
              </Table.Cell>
              <Table.Cell>{data.email}</Table.Cell>
              <Table.Cell>{data.phone}</Table.Cell>
              <Table.Cell>{data.address}</Table.Cell>
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
    </>
  );
};

export default SupplierList;
