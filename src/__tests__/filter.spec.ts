import { marbles } from "jest-stream-marbles";
import { filter } from "../filter.js";

describe("filter", () => {
  it("should filter a stream by a predicate", async () => {
    const act = marbles`---${1}-${2}--${3}-${4}---|`;
    const exp = marbles`--------${2}-------${4}---|`;

    await expect(act.pipeThrough(filter(isEven))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--x`;
    const exp = marbles`--------${2}--x`;

    await expect(act.pipeThrough(filter(isEven))).toStream(exp);
  });

  it("should fail the other stream if the predicate throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`---x`;

    await expect(act.pipeThrough(filter(cb))).toStream(exp);
  });
});

function isEven(num: number): boolean {
  return num % 2 === 0;
}
