import type { FlashbarProps } from '@cloudscape-design/components';

declare global {
  type NotificationItem = FlashbarProps.MessageDefinition & { autoDismiss?: boolean };
}

export {};
