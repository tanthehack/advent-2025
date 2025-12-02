import * as fs from "fs";

const filePath = "./input.txt";
let data: string = "";

try {
  data = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(error);
}

function isInvalidID(id: number): boolean {
  const lengthOfID = String(id).length;

  for (let i = 1; i <= lengthOfID / 2; i++) {
    if (lengthOfID % i !== 0) continue;

    let parts: string[] = String(id).match(new RegExp(`.{${i}}`, "g")) ?? [];

    let currentPart: string = "";
    let test: boolean = true;

    for (let i = 0; i < parts.length - 1; i++) {
      currentPart = parts[i];
      if (currentPart === parts[i + 1]) {
        test = true;
      } else {
        test = false;
        break;
      }
    }

    if (test === true && parts.length >= 2) return true;

    continue;
  }

  return false;
}

function getInvalidIDs(range: string): number[] {
  const firstRange = range.split("-")[0];
  const secondRange = range.split("-")[1];

  const ids: number[] = [];

  for (let i = Number(firstRange); i <= Number(secondRange); i++) {
    if (isInvalidID(i) === true) ids.push(i);
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
