import { TransformStream } from "isomorphic-streams";

/**
 * Aggregates a stream to a value emitting the intermediate result with each chunk.
 *
 * @param reducer - The function which aggregates the stream
 * @param seed - The initial value which is passed to the `reducer` for the first chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function scan<I, O>(reducer: (acc: O, value: I) => O, seed: O): TransformStream<I, O> {
  let acc: O = seed;
  return new TransformStream<I, O>({
    transform(chunk, controller) {
      try {
        acc = reducer(acc, chunk);
        controller.enqueue(acc);
      } catch (reason) {
        controller.error(reason);
      }
    },
  });
}
