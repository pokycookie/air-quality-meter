import DashboardTile from "../components/dashboardTile";
import "../scss/layout/tileArea.scss";

export default function TileArea() {
  return (
    <div className="tileArea">
      <DashboardTile />
      <DashboardTile />
      <DashboardTile />
      <DashboardTile />
    </div>
  );
}
