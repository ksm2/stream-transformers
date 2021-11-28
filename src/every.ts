import { TransformStream } from "isomorphic-streams";

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
