import { TypeConstant, ActionCreator } from './type-helpers';
import { action } from './action';

export type PayloadMetaAction<
  T extends TypeConstant,
  P,
  M
> = P extends undefined
  ? M extends undefined
    ? { type: T }
    : { type: T; meta: M }
  : M extends undefined
  ? { type: T; payload: P }
  : { type: T; payload: P; meta: M };

/**
 * @description typesafe action-creator factory
 */
declare function createAction<
  TType extends TypeConstant,
  TArgs extends any[],
  TReturn extends object
>(
  type: TType,
  createHandler?: (...args: TArgs) => TReturn
): (...args: TArgs) => { type: TType } & TReturn;

const action1 = createAction('TYPE', (name: string, id: number) => ({
  payload: name,
  meta: id,
}));

declare function createReduxAction<
  TType extends TypeConstant,
  TArgs extends any[],
  TPayload extends any,
  TMeta extends any
>(
  type: TType,
  payloadCreator: (...args: TArgs) => TPayload,
  metaCreator?: (...args: TArgs) => TMeta
): (
  ...args: TArgs
) => { type: TType } & { payload: TPayload } & { meta: TMeta };

// and maybe to make redux-action migration easier
const action2 = createReduxAction(
  'TYPE',
  (name: string, id: number) => name, // payload creator
  (name: string, id: number) => id // meta creator
);

declare function createActions<
  TMap extends { [P in keyof TMap]: ActionCreator<TType> },
  TType extends TypeConstant
>(actionMap?: { [P in keyof TMap]: TMap[P] }): TMap;

const actions = createActions({
  action1: (name: string, id: string) => ({
    type: 'TYPE1',
    payload: name,
    meta: id,
  }),
  action2: (name: string, id: string) => ({
    type: 'TYPE2',
    payload: name,
    meta: id,
  }),
});
