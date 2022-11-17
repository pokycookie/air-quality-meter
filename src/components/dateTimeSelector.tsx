import "../scss/components/dateTimeSelector.scss";
import DateSelector from "./dateSelector";
import TimeSelector from "./timeSelector";

export default function DateTimeSelector() {
  return (
    <div className="dateTimeSelector">
      <DateSelector />
      <TimeSelector />
    </div>
  );
}
