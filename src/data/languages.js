import { readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust path to target the content folder
const contentDir = join(__dirname, "..", "content");

export default function () {
  const entries = readdirSync(contentDir);

  return entries.filter((entry) => {
    const fullPath = join(contentDir, entry);
    return statSync(fullPath).isDirectory();
  });
}
