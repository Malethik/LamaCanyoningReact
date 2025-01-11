import useFetch from "../hooks/useFetch";
import { Supplier } from "../model/supplier";

const SupplierList: React.FC = () => {
  const { data, error, loading } = useFetch<Supplier[]>("supplier");
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
        <div>No items</div>
      </>
    );
  }
  return (
    <>
      <ul>
        {data?.map((data) => (
          <li key={data.id}>
            {data.id}-{data.name}-{data.phone}-{data.address}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SupplierList;
