import DashboardTile from "../components/dashboardTile";
import "../scss/layout/tileArea.scss";

export default function TileArea() {
  return (
    <div className="tileArea">
      <DashboardTile index={0} type="temp" />
      <DashboardTile index={1} type="humi" />
      <DashboardTile index={2} type="pm" />
      <DashboardTile index={3} type="form" />
    </div>
  );
}
