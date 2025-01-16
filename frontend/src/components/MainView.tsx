"use client";
import { Meeting } from "../Models/MeetingsModels";
import MenuBar from "./MenuBar";
import MonthView from "./MonthView";

interface MainViewProps {
  postMeeting: (meeting: Meeting) => void;
}

const MainView: React.FC<MainViewProps> = ({ postMeeting }) => {
  return (
    <div className="flex">
      <MenuBar postMeeting={postMeeting} />
      <MonthView />
    </div>
  );
}

export default MainView;