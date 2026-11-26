// Make the Judge Laugh in One Line — entry program.
//
// Writes exactly one funny line to <output dir>/entry.txt, with no
// trailing newline and nothing else, after enforcing the competition
// gate: the line must be 1-200 characters and a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smartwatch congratulated me on 10,000 steps, then asked why eight thousand of them were to the fridge.";

// Enforce the competition gate before writing anything.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `entry line must be 1-200 characters, got ${LINE.length}`,
  );
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line with no newline characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read it back and confirm the file holds exactly the line, byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line exactly");
}
console.log(`wrote ${LINE.length}-character entry to ${outPath}`);
