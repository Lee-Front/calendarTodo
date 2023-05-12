export interface CalendarRange {
  startDate: Date;
  endDate: Date;
}

export interface CalendarDayInfo {
  year: number;
  month: number;
  day: number;
  todoInfo?: TodoInfo;
}

export interface TodoInfo {
  day: number;
  total: number;
  completed: number;
}

export interface MonthSelectorProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export interface DayListProps {
  currentDate: Date;
}

export interface PostItProps {
  todoInfo: TodoInfo;
  isDifferentMonth: boolean;
}
