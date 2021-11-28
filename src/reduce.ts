import { TransformStream } from "isomorphic-streams";

/**
 * Aggregates a stream to a value emitting the result when the stream closes.
 *
 * @param reducer - The function which aggregates the stream
 * @param seed - The initial value which is passed to the `reducer` for the first chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function reduce<I, O>(reducer: (acc: O, value: I) => O, seed: O): TransformStream<I, O> {
  let acc: O = seed;
  return new TransformStream<I, O>({
    transform(chunk, controller) {
      try {
        acc = reducer(acc, chunk);
      } catch (reason) {
        controller.error(reason);
      }
    },
    flush(controller) {
      controller.enqueue(acc);
    },
  });
}
