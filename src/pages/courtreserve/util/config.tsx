import { StatusIndicator, type TableProps } from '@cloudscape-design/components';
import type { CourtreserveEvent } from './types';

export const eventTableColumnDefinitions: TableProps.ColumnDefinition<CourtreserveEvent>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'ID',
    cell: (item) => item.id,
  },
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => item.title,
  },
  {
    id: 'start',
    sortingField: 'start',
    header: 'Start',
    cell: (item) => item.id,
  },
  {
    id: 'eventType',
    sortingField: 'eventType',
    header: 'Event type',
    cell: (item) => item.eventType,
  },
  {
    id: 'isFull',
    sortingField: 'isFull',
    header: 'Status',
    cell: (item) => (
      <StatusIndicator type={item.isFull ? 'error' : 'success'}>
        {item.isFull ? 'Closed' : 'Open'}
      </StatusIndicator>
    ),
  },
];
