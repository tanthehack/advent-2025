import * as fs from "fs";

const filePath = "./input.txt";
let data: string = "";

try {
  data = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(error);
}

function getInvalidIDs(range: string): number[] {
  const firstRange = range.split("-")[0];
  const secondRange = range.split("-")[1];

  const ids: number[] = [];

  for (let i = Number(firstRange); i <= Number(secondRange); i++) {
    if (String(i).length % 2 === 0) {
      const currentNumber: string = String(i);

      let firstHalf = currentNumber.slice(0, currentNumber.length / 2);
      let secondHalf = currentNumber.slice(currentNumber.length / 2);

      if (firstHalf[0] === "0" || secondHalf[0] === "0") {
        continue;
      }

      if (firstHalf === secondHalf) {
        ids.push(i);
      }
    }
  }

  return ids;
}

function readData(data: string) {
  const ranges: string[] = data.split(",");
  let sumOfIDs: number = 0;

  for (const range of ranges) {
    const invalidIDs: number[] = getInvalidIDs(range.trim());
    for (const id of invalidIDs) {
      sumOfIDs += id;
    }
  }

  return sumOfIDs;
}

console.log(readData(data));
