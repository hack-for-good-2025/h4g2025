import { Dayjs } from "dayjs";
import MeetingRenderer from "./MeetingRenderer";
import { useMeetings } from "../Contexts/Hooks/MeetingsContextHook";

export default function MonthViewBox({
    day,
    rowIndex,
}: {
    day: Dayjs | null;
    rowIndex: number;
}) {
    if(!day) {
        return <div className="h-12 w-full border md:h-28 md:w-full lg:h-full"></div>
    }

    const { meetings, selectedMonthIndex } = useMeetings();
    const isFirstDay = day.date() === 1;
    const isToday = day.isSame(new Date(), "day");
    const isCurrentMonth = day.month() === ((selectedMonthIndex % 12) + 12) % 12;

    return (
        <div
            style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #D1D5DB',
            transition: 'background-color 0.3s',
            cursor: 'pointer',
            gap: '0.5rem',
            height: '100%',
            width: '100%',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 'auto', width: "100%"}}>
            {rowIndex === 0 && (
                <h4 style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: 0, marginTop: '0.25rem'}}>
                {day.format("ddd").toUpperCase()}
                </h4>
            )}
            <h4
                style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
                marginBottom: '0',
                width: '90%',
                ...(isToday ? {
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    backgroundColor: '#2563EB',
                    color: 'white',
                } : 
                isCurrentMonth ? {
                    color: 'black',
                } : {
                    color: '#9CA3AF',
                })
                }}
            >
                {isFirstDay ? day.format("MMM D") : day.format("D")}
            </h4>
            </div>
            <MeetingRenderer day={day} meetings={meetings} />
        </div>

    );
}