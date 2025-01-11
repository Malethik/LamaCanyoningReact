import CreateItem from "../components/CreateItem";
import useFetch from "../hooks/useFetch";
import { Item } from "../model/user";

const ItemList: React.FC = () => {
  const { data, error, loading } = useFetch<Item[]>("item");
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
        <CreateItem />
        <div>No items</div>
      </>
    );
  }
  return (
    <>
      <CreateItem />
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
