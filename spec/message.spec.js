const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
  it("throws error if a names is NOT passed into the constructoras the first parameter", () => {
    expect(() => {
      new Message();
    }).toThrow(new Error("Name is required."));
  });

  it("constructor sets name", () => {
    let message = new Message("Test message", []);
    expect(message.name).toEqual("Test message");
  });

  it("contains a commands array passed into the constructor as 2nd argument", () => {
    let commands = [new Command("MOVE", 98382)];
    let message = new Message("Test message", commands);
    expect(message.commands).toEqual(commands);
  });
});
