import { marbles } from "jest-stream-marbles";
import { map } from "../map.js";

describe("map", () => {
  it("should map one stream to another by a callback", async () => {
    const act = marbles`---${1}-${2}--${3}---|`;
    const exp = marbles`---${2}-${3}--${4}---|`;

    await expect(act.pipeThrough(map((it) => it + 1))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--x`;
    const exp = marbles`---${2}-${3}--x`;

    await expect(act.pipeThrough(map((it) => it + 1))).toStream(exp);
  });

  it("should fail the other stream if the callback throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`---x`;

    await expect(act.pipeThrough(map(cb))).toStream(exp);
  });
});
