import * as fs from "fs";

const filePath = "./input.txt";
let data: string = "";

try {
  data = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(error);
}

function maxJolts(banks: number[][]) {
  let maxJoltsArray: string[] = banks.map((bank) => {
    let bankArray: number[] = Array.from(bank);
    let originalBank: number[] = Array.from(bank);

    let firstMaxJolt: string = "";
    let secondMaxJolt: string = "";

    firstMaxJolt = String(Math.max(...bankArray));
    let firstMaxJoltIndex = bankArray.indexOf(Number(firstMaxJolt));

    if (firstMaxJoltIndex === bankArray.length - 1) {
      bankArray.splice(firstMaxJoltIndex, 1);

      secondMaxJolt = String(Math.max(...bankArray));
      let secondMaxJoltIndex = originalBank.indexOf(Number(firstMaxJolt));

      if (firstMaxJoltIndex < secondMaxJoltIndex) {
        return firstMaxJolt + secondMaxJolt;
      }

      return secondMaxJolt + firstMaxJolt;
    }

    bankArray = bankArray.slice(firstMaxJoltIndex);

    bankArray.shift();

    secondMaxJolt = String(Math.max(...bankArray));

    if (firstMaxJoltIndex < Array.from(bank).indexOf(Number(secondMaxJolt))) {
      return firstMaxJolt + secondMaxJolt;
    }

    return secondMaxJolt + firstMaxJolt;
  });

  return maxJoltsArray.reduce((sum, jolt) => sum + Number(jolt), 0);
}

function readData(data: string) {
  const banks: number[][] = data
    .trim()
    .split("\n")
    .map((bank) => bank.split("").map(Number));
  console.log(banks);
  return maxJolts(banks);
}

console.log(readData(data));
