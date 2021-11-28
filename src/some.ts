import { TransformStream } from "isomorphic-streams";

/**
 * Determines whether some chunks of the stream fulfill a given predicate.
 *
 * @param predicate - The predicate which is applied on each chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function some<I>(predicate: (value: I) => boolean): TransformStream<I, boolean> {
  return new TransformStream<I, boolean>({
    transform(chunk, controller) {
      if (predicate(chunk)) {
        controller.enqueue(true);
        controller.terminate();
      }
    },
    flush(controller) {
      controller.enqueue(false);
    },
  });
}
