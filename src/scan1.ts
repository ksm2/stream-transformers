import { TransformStream } from "isomorphic-streams";

/**
 * Aggregates a stream to a value emitting the intermediate result with each chunk.
 *
 * @param reducer - The function which aggregates the stream starting the second chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function scan1<I>(reducer: (acc: I, value: I) => I): TransformStream<I, I> {
  let acc: I | undefined;
  return new TransformStream<I, I>({
    transform(chunk, controller) {
      try {
        if (acc === undefined) {
          acc = chunk;
        } else {
          acc = reducer(acc, chunk);
          controller.enqueue(acc);
        }
      } catch (reason) {
        controller.error(reason);
      }
    },
  });
}
