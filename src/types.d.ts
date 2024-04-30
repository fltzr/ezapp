/* eslint-disable @typescript-eslint/ban-types */
import type { FlashbarProps } from '@cloudscape-design/components';

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
  } & {};

  type NotificationItem = FlashbarProps.MessageDefinition & { autoDismiss?: boolean };
}

export {};
