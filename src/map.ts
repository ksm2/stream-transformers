import { TransformStream } from "isomorphic-streams";

/**
 * Maps each chunk emitted by the stream to another type using a callback.
 *
 * @param callback - The callback which maps each chunk
 * @returns A `TransformStream` through which a `ReadableStream` can be piped
 */
export function map<I, O>(callback: (value: I) => O): TransformStream<I, O> {
  return new TransformStream<I, O>({
    transform(chunk, controller) {
      try {
        controller.enqueue(callback(chunk));
      } catch (reason) {
        controller.error(reason);
      }
    },
  });
}
