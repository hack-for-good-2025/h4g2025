import dayjs, { Dayjs } from "dayjs";
import MeetingRenderer from "./MeetingRenderer";

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

    const isFirstDay = day.date() === 1;
    const isToday = day.isSame(new Date(), "day");
    const isCurrentMonth = day.isSame(new Date(), "month");
    const meetings = [{
        id: '1',
        title: 'Team Standup',
        startTime: dayjs(new Date()).hour(9).minute(0).add(1, 'day'),
        endTime: dayjs(new Date()).hour(9).minute(30).add(1, 'day'),
        description: 'Daily team standup meeting',
        organiserId: 'organiser1',
        participants: ['user1', 'user2', 'user3']
      },
      {
        id: '2',
        title: 'Project Planning test test test',
        startTime: dayjs(new Date()).hour(10).minute(0),
        endTime: dayjs(new Date()).hour(11).minute(0),
        description: 'Planning for the new project',
        organiserId: 'organiser2',
        participants: ['user1', 'user4']
      },
      {
        id: '3',
        title: 'Client Call',
        startTime: dayjs(new Date()).hour(13).minute(0),
        endTime: dayjs(new Date()).hour(14).minute(0),
        description: 'Call with the client to discuss requirements',
        organiserId: 'organiser3',
        participants: ['user2', 'user5']
      },
      {
        id: '4',
        title: 'Design Review',
        startTime: dayjs(new Date()).hour(15).minute(0),
        endTime: dayjs(new Date()).hour(16).minute(0),
        description: 'Review of the new design mockups',
        organiserId: 'organiser4',
        participants: ['user1', 'user3', 'user6']
      }];

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