import { C, marbles } from "jest-stream-marbles";
import { reduce1 } from "../reduce1.js";

describe("reduce1", () => {
  it("should reduce one stream to another by a callback", async () => {
    const act = marbles`---${1}-${2}--${3}---|`;
    const exp = marbles`---------------------${[6, C]}`;

    await expect(act.pipeThrough(reduce1((acc, it) => acc + it))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--x`;
    const exp = marbles`--------------x`;

    await expect(act.pipeThrough(reduce1((acc, it) => acc + it))).toStream(exp);
  });

  it("should fail the other stream if the reducer throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`--------x`;

    await expect(act.pipeThrough(reduce1(cb))).toStream(exp);
  });
});
