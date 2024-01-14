import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import SortBy from "../ui/SortBy";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
        <SortBy
          options={[
            { value: "name-asc", label: "Sort By Name (A-Z)" },
            { value: "name-desc", label: "Sort By Name (Z-A)" },
            { value: "regularPrice-asc", label: "Sort By Price (Low to High)" },
            {
              value: "regularPrice-desc",
              label: "Sort By Price (High to Low)",
            },
            {
              value: "maxCapacity-asc",
              label: "Sort By Capacity (Low to High)",
            },
            {
              value: "maxCapacity-desc",
              label: "Sort By Capacity (High to Low)",
            },
          ]}
        />
      </Row>
      <Row type="vertical">
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
