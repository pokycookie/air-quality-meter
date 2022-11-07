import DatabasePage from "./databasePage";
import GraphPage from "./graphPage";
import HomePage from "./homePage";

export default function pageSwitcher(page: number) {
  switch (page) {
    case 0:
      return <HomePage />;
    case 1:
      return <GraphPage />;
    case 2:
      return <DatabasePage />;
    default:
      return <HomePage />;
  }
}
