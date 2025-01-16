import { Fragment } from "react";
import { useDateStore } from "../consts/date";
import MonthViewBox from "./MonthViewBox";

export default function MonthView() {
    const {monthArray} = useDateStore();
    return (
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
    )
}
