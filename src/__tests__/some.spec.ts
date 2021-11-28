import { C, marbles } from "jest-stream-marbles";
import { some } from "../some.js";

describe("some", () => {
  it("should return true as soon as the predicate matches", async () => {
    const act = marbles`---${1}-${2}--${3}-${4}---|`;
    const exp = marbles`--------------${[true, C]}`;

    await expect(act.pipeThrough(some(isGreaterThanTwo))).toStream(exp);
  });

  it("should return false when the stream completes", async () => {
    const act = marbles`---${1}-${2}--${1}-${2}---|`;
    const exp = marbles`--------------------------${[false, C]}`;

    await expect(act.pipeThrough(some(isGreaterThanTwo))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--${1}-${2}---x`;
    const exp = marbles`--------------------------x`;

    await expect(act.pipeThrough(some(isGreaterThanTwo))).toStream(exp);
  });

  it("should fail the other stream if the predicate throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`---x`;

    await expect(act.pipeThrough(some(cb))).toStream(exp);
  });
});

function isGreaterThanTwo(num: number): boolean {
  return num > 2;
}
