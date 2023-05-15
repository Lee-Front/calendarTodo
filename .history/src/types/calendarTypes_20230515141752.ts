export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DayInfo {
  year: number;
  month: number;
  day: number;
  todoInfo?: TodoInfo;
  textColor: string;
  backgroundColor: string;
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
  dayInfo: DayInfo;
  backgroundColor: string;
}
