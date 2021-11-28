import { marbles } from "jest-stream-marbles";
import { scan1 } from "../scan1.js";

describe("scan1", () => {
  it("should scan one stream to another by a callback", async () => {
    const act = marbles`---${1}-${2}--${3}---|`;
    const exp = marbles`--------${3}--${6}---|`;

    await expect(act.pipeThrough(scan1((acc, it) => acc + it))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--x`;
    const exp = marbles`--------${3}--x`;

    await expect(act.pipeThrough(scan1((acc, it) => acc + it))).toStream(exp);
  });

  it("should fail the other stream if the reducer throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`--------x`;

    await expect(act.pipeThrough(scan1(cb))).toStream(exp);
  });
});
