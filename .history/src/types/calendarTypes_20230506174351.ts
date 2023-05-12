export interface CalendarDayInfo {
  year: number;
  month: number;
  day: number;
  dayTodoInfo?: DayTodoInfo;
}

export interface CalendarInfo {
  startDate: Date;
  endDate: Date;
}

export interface DayTodoInfo {
  day: number;
  total: number;
  completed: number;
}

export interface MonthSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}
