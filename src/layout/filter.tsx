import Range from "../components/range";
import ToggleArea from "../components/toggleArea";
import "../scss/layout/filter.scss";

export default function Filter() {
  return (
    <div className="filter">
      <ToggleArea title="온도 필터">
        <Range min={-20} max={60} />
      </ToggleArea>
    </div>
  );
}
