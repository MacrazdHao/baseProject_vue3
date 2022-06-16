import moment from "moment";

export default {
  getMonthDays: (date: string) => {
    const today = moment(date).format("YYYY-MM-DD");
    return moment(today).daysInMonth();
  },
  getMonthCalendar: (date: string) => {
    const today = moment(date).format("YYYY-MM-DD");
    const curMonthWeekday = moment(today).date(1).isoWeekday();
    const lastMonthDays = moment(today).subtract(1, "month").daysInMonth();
    const curMonthDays = moment(today).daysInMonth();
    const calendar = [];
    for (let i = curMonthWeekday - 2; i >= 0; i--) {
      calendar.push(lastMonthDays - i);
    }
    for (let i = 1; i <= curMonthDays; i++) {
      calendar.push(i);
    }
    const surDays = 42 - calendar.length;
    for (let i = 1; i <= surDays; i++) {
      calendar.push(i);
    }
    return calendar;
  },
  getDateString: (timestamp: number | string, format = "YYYY-MM-DD HH:mm") => {
    return moment(timestamp).format(format);
  },
  formatDuring(mss: number) {
    const hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    const minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
    return hours + "时" + minutes + "分";
  },
};
