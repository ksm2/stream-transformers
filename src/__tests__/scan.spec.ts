import { marbles } from "jest-stream-marbles";
import { scan } from "../scan.js";

describe("scan", () => {
  it("should scan one stream to another by a callback", async () => {
    const act = marbles`---${1}-${2}--${3}---|`;
    const exp = marbles`---${2}-${4}--${7}---|`;

    await expect(act.pipeThrough(scan((acc, it) => acc + it, 1))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--x`;
    const exp = marbles`---${2}-${4}--x`;

    await expect(act.pipeThrough(scan((acc, it) => acc + it, 1))).toStream(exp);
  });

  it("should fail the other stream if the reducer throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`---x`;

    await expect(act.pipeThrough(scan(cb, 1))).toStream(exp);
  });
});
