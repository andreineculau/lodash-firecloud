/**
 * A Function that returns TReturn, with TArgs as arguments.
 */
export type Fn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => TReturn;

/**
 * A Function that returns Promise<TReturn>, with TArgs as arguments.
 */
export type AsyncFn<
  TReturn = unknown,
  TArgs extends unknown[] = unknown[]
> =
  (...args: TArgs) => Promise<TReturn>;

/**
 * Obtain the type of a Promise resolution.
 */
export type Unpromise<
  TMaybePromise extends any
> =
  TMaybePromise extends Promise<infer TValue>
    ? TValue
    : TMaybePromise;

/**
 * Promise<T> or T dependending on whether TFn returns a Promise or not.
 */
export type MaybePromiseReturn<
  TReturn,
  TFn extends Fn
> =
  ReturnType<TFn> extends Promise<any>
    ? Promise<TReturn>
    : TReturn;

/**
 * Change the return type of TFn, without changing the arguments.
 */
export type FnChangeReturnType<
  TFn extends Fn,
  TReturn = Unpromise<ReturnType<TFn>>
> =
  ReturnType<TFn> extends Promise<any>
    ? Fn<Promise<TReturn>, Parameters<TFn>>
    : Fn<TReturn, Parameters<TFn>>;