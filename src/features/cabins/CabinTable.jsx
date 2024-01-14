import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";
  const sortedValue = searchParams.get("sortBy") || "name-asc";

  /* if (!cabins) {
    return <Empty />;
  }*/

  if (isLoading) {
    return <Spinner />;
  }

  let filteredCabins = [];

  if (filteredValue === "all") {
    filteredCabins = cabins;
  } else if (filteredValue === "no-discount" && cabins) {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filteredValue === "with-discount" && cabins) {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  let sortedFilteredCabins = [];

  if (sortedValue === "name-asc") {
    sortedFilteredCabins = [...filteredCabins].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortedValue === "name-desc") {
    sortedFilteredCabins = [...filteredCabins].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  } else if (sortedValue === "regularPrice-asc") {
    sortedFilteredCabins = [...filteredCabins].sort(
      (a, b) => a.regularPrice - b.regularPrice
    );
  } else if (sortedValue === "regularPrice-desc") {
    sortedFilteredCabins = [...filteredCabins].sort(
      (a, b) => b.regularPrice - a.regularPrice
    );
  } else if (sortedValue === "maxCapacity-asc") {
    sortedFilteredCabins = [...filteredCabins].sort(
      (a, b) => a.maxCapacity - b.maxCapacity
    );
  } else if (sortedValue === "maxCapacity-desc") {
    sortedFilteredCabins = [...filteredCabins].sort(
      (a, b) => b.maxCapacity - a.maxCapacity
    );
  }

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.5fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedFilteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
