import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface DateStoreType {
    userSelectedDate: Dayjs;
    setDate: (date: Dayjs) => void;
    monthArray: Dayjs[][];
    selectedMonthIndex: number;
    setMonthIndex: (index: number) => void;
}

const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year();
    const firstDay = dayjs().set("month", month).set("year", year).startOf("month").day();

    let dayCounter = -firstDay;

    return Array.from({length: 5}, () => {
        return Array.from({length: 7}, () => dayjs(new Date(year, month, ++dayCounter)));
    });
}

export const useDateStore = (): DateStoreType => {
    const [userSelectedDate, setUserSelectedDate] = React.useState(dayjs());
    const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(dayjs().month());
    const [monthArray, setMonthArray] = React.useState(getMonth(selectedMonthIndex));

    const setDate = (date: Dayjs) => {
        setUserSelectedDate(date);
    }

    const setMonthIndex = (index: number) => {
        setSelectedMonthIndex(index);
        setMonthArray(getMonth(index));
    }

    return {
        userSelectedDate,
        setDate,
        monthArray,
        selectedMonthIndex,
        setMonthIndex
    }
}