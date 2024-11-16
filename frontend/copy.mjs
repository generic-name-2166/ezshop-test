import fs from "node:fs";

const src = "out/";
const dest = "../backend/out";
fs.cpSync(src, dest, { recursive: true });
