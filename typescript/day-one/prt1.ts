import * as fs from "fs";

const filePath = "./input.txt";
let data: string = "";

try {
  data = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(error);
}

function dialGetNumber(instruction: string, startPos: number): number {
  const direction: string = instruction[0];
  const distance: number = Number(instruction.slice(1, instruction.length));

  let currentNumber: number = startPos;

  if (direction === "L") {
    const totalJump = currentNumber - distance;
    currentNumber = ((totalJump % 100) + 100) % 100;
  } else if (direction === "R") {
    currentNumber = (currentNumber + distance) % 100;
  }

  return currentNumber;
}

function getPassword(data: string): number {
  const instructions: string[] = data.split("\n");
  let currentDialNumber: number = 50;
  let actualPassword = 0;

  for (const instruction of instructions) {
    currentDialNumber = dialGetNumber(instruction, currentDialNumber);
    if (currentDialNumber == 0) {
      actualPassword++;
    }
  }

  return actualPassword;
}

console.log(getPassword(data));
