import Guage from "../components/guage";
import "../scss/pages/graphPage.scss";

export default function GraphPage() {
  return (
    <div className="graphPage">
      <div className="test">
        <Guage min={-40} max={80} value={18} />
      </div>
    </div>
  );
}
