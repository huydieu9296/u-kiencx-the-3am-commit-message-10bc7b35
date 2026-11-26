// The 3AM Commit Message — make.fun text bounty entry.
// Reads entry.txt (exactly one line, 1-139 characters), validates it
// against the competition gate, and writes it unchanged to the
// output directory. Zero dependencies, Node 22.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 139;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Every gate rule in one place, each with its own message, so a
// failure names the rule that rejected the entry.
function validate(text: string): number {
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry.txt must contain exactly one line (no CR or LF)");
  }
  // Count Unicode code points, so astral characters count once.
  const charCount = [...text].length;
  if (charCount < 1) {
    fail("entry is empty; gate requires 1 to 139 characters");
  }
  if (charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters; gate allows at most ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be blank or whitespace-only");
  }
  if (text !== text.trim()) {
    fail("entry must not have leading or trailing whitespace");
  }
  return charCount;
}

async function main(): Promise<void> {
  // Resolve entry.txt next to this file, never relative to the CWD.
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, "entry.txt");

  const raw = await readFile(sourcePath).catch((err: NodeJS.ErrnoException) => {
    fail(`cannot read ${sourcePath}: ${err.message}`);
  });

  // Strict UTF-8: invalid bytes fail loudly instead of being replaced.
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    fail("entry.txt is not valid UTF-8");
  }

  const charCount = validate(text);

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
  await mkdir(outputDir, { recursive: true }).catch((err: NodeJS.ErrnoException) => {
    fail(`cannot create output dir ${outputDir}: ${err.message}`);
  });
  const outputPath = join(outputDir, "entry.txt");

  await writeFile(outputPath, raw).catch((err: NodeJS.ErrnoException) => {
    fail(`cannot write ${outputPath}: ${err.message}`);
  });
  // Read the output back and verify it is byte-identical to the source.
  const written = await readFile(outputPath).catch((err: NodeJS.ErrnoException) => {
    fail(`cannot read back ${outputPath}: ${err.message}`);
  });
  if (!written.equals(raw)) {
    fail("output file differs from entry.txt after writing");
  }

  report(sourcePath, outputPath, charCount, raw.length, text);
}

// One reporting helper keeps the success output in a single place.
function report(
  sourcePath: string,
  outputPath: string,
  charCount: number,
  byteCount: number,
  text: string,
): void {
  console.log(`source: ${sourcePath}`);
  console.log(`output: ${outputPath}`);
  console.log(`characters: ${charCount} (gate: 1-${MAX_CHARS})`);
  console.log(`bytes: ${byteCount}`);
  console.log(`entry: ${text}`);
  console.log("ok: entry written unchanged and verified byte-identical");
}

await main();
