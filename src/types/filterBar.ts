export type Status = 'All' | 'Completed' | 'Pending';
export type Priority = 'All' | 'High' | 'Medium' | 'Low';
export type SortBy = 'Newest' | 'Oldest';

export interface Filters {
  status: Status;
  priority: Priority;
  sortBy: SortBy;
}

export interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
