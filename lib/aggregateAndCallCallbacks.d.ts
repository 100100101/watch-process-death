import { WatchProcessDeath } from './';
import { TEventNames } from './types';
export declare const aggregateAndCallCallbacks: (this: WatchProcessDeath, eventName: TEventNames, withExit: boolean) => Promise<void>;
