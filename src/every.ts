import { TransformStream } from "isomorphic-streams";

/**
 * Determines whether every chunk of the stream fulfills a given predicate.
 *
 * @param predicate - The predicate which is applied on each chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function every<I>(predicate: (value: I) => boolean): TransformStream<I, boolean> {
  return new TransformStream<I, boolean>({
    transform(chunk, controller) {
      if (!predicate(chunk)) {
        controller.enqueue(false);
        controller.terminate();
      }
    },
    flush(controller) {
      controller.enqueue(true);
    },
  });
}
