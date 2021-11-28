import { C, marbles } from "jest-stream-marbles";
import { every } from "../every.js";

describe("every", () => {
  it("should return false as soon as the predicate fails", async () => {
    const act = marbles`---${1}-${2}--${3}-${4}---|`;
    const exp = marbles`--------------${[false, C]}`;

    await expect(act.pipeThrough(every(isLessThanThree))).toStream(exp);
  });

  it("should return true when the stream completes", async () => {
    const act = marbles`---${1}-${2}--${1}-${2}---|`;
    const exp = marbles`--------------------------${[true, C]}`;

    await expect(act.pipeThrough(every(isLessThanThree))).toStream(exp);
  });

  it("should propagate an error through the stream", async () => {
    const act = marbles`---${1}-${2}--${1}-${2}---x`;
    const exp = marbles`--------------------------x`;

    await expect(act.pipeThrough(every(isLessThanThree))).toStream(exp);
  });

  it("should fail the other stream if the predicate throws", async () => {
    const cb = () => {
      throw undefined;
    };
    const act = marbles`---${1}-${2}--|`;
    const exp = marbles`---x`;

    await expect(act.pipeThrough(every(cb))).toStream(exp);
  });
});

function isLessThanThree(num: number): boolean {
  return num < 3;
}
