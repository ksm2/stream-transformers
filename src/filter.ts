import { TransformStream } from "isomorphic-streams";

/**
 * Filters chunks emitted by the stream using a predicate.
 *
 * @param predicate - The predicate which is applied on each chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function filter<I>(predicate: (value: I) => boolean): TransformStream<I, I> {
  return new TransformStream<I, I>({
    transform(chunk, controller) {
      try {
        if (predicate(chunk)) {
          controller.enqueue(chunk);
        }
      } catch (reason) {
        controller.error(reason);
      }
    },
  });
}
