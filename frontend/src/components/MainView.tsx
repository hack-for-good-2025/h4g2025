import MenuBar from "./MenuBar";
import MonthView from "./MonthView";

const MainView: React.FC<{}> = () => {
  return (
    <div className="flex">
      <MenuBar />
      <MonthView />
    </div>
  );
}

export default MainView;