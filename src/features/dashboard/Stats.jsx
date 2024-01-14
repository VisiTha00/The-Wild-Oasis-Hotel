import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, cabins, numDays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const numCheckIns = confirmedStays.length;

  const occupancy =
    bookings.reduce((acc, booking) => acc + booking.numNights, 0) /
    (cabins.length * numDays);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      ></Stat>

      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      ></Stat>

      <Stat
        title="Check-ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={numCheckIns}
      ></Stat>

      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancy * 100) + "%"}
      ></Stat>
    </>
  );
}

export default Stats;
