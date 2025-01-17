import { Fragment } from "react";
import MonthViewBox from "./MonthViewBox";
import { useMeetings } from "../Contexts/Hooks/MeetingsContextHook";
import { MonthNames } from "../Models/MeetingsModels";

export default function MonthView() {
    const { monthArray, setUserSelectedMonth, selectedMonthIndex} = useMeetings();
    console.log((selectedMonthIndex % 12))
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <button onClick={() => setUserSelectedMonth(selectedMonthIndex - 1)}>Previous</button>
                <h2>{MonthNames[((selectedMonthIndex % 12) + 12) % 12]}</h2>
                <button onClick={() => setUserSelectedMonth(selectedMonthIndex + 1)}>Next</button>
            </div>
            <section style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(5, 1fr)", height: "80vh", width:"90vw" }}>
                {monthArray.map((week, weekIndex) => (
                    <Fragment key = {weekIndex}>
                        {week.map((day, dayIndex) => (
                            <MonthViewBox
                                key = {dayIndex}
                                day = {day}
                                rowIndex = {weekIndex}
                            />
                        ))}
                    </Fragment>
                ))}
            </section>
        </div>
    )
}
