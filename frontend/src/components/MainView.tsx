"use client";
import MenuBar from "./MenuBar";
import MonthView from "./MonthView";

export default function MainView() {
  return (
    <div className="flex">
      <MenuBar />
      <MonthView />
    </div>
  );
}