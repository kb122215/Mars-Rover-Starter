const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// 7 tests here!
describe("Rover class", function () {
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  it("respone returned by receoveMessage contains name of message", () => {
    let rover = new Rover(98382);
    let commands = [new Command("MOVE", 98382)];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let rover = new Rover(98382);
    let commands = [new Command("MOVE", 98382), new Command("STATUS_CHECK")];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to status check command", () => {
    let rover = new Rover(98382);
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.position).toEqual(98382);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });

  it("responds correctly to mode change command", () => {
    let rover = new Rover(98382);
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual("LOW_POWER");
  });
  it("responds with false completed value when attempting to move in LOW_POWER mode", () => {
    let rover = new Rover(98382);
    rover.mode = "LOW_POWER";
    let commands = [new Command("MOVE", 120000)];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(false);
  });

  it("responds with position for move command", () => {
    let rover = new Rover(98382);
    let commands = [new Command("MOVE", 120000)];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(120000);
  });
});
