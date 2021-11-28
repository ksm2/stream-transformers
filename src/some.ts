import { TransformStream } from "isomorphic-streams";

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
