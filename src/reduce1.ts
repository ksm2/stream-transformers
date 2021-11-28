import { TransformStream } from "isomorphic-streams";

/**
 * Aggregates a stream to a value emitting the result when the stream closes.
 *
 * @param reducer - The function which aggregates the stream starting the second chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function reduce1<I>(reducer: (acc: I, value: I) => I): TransformStream<I, I> {
  let acc: I | undefined;
  return new TransformStream<I, I>({
    transform(chunk) {
      acc = acc === undefined ? chunk : reducer(acc, chunk);
    },
    flush(controller) {
      if (acc === undefined) {
        controller.error(new TypeError("Stream finished without emitting a value"));
      } else {
        controller.enqueue(acc);
      }
    },
  });
}
