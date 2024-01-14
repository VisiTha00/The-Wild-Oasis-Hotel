import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleOnChange(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  const currentValue = searchParams.get("sortBy") || options[0].value;
  return (
    <Select
      options={options}
      onChange={(e) => handleOnChange(e.target.value)}
      type="white"
      value={currentValue}
    ></Select>
  );
}

export default SortBy;
