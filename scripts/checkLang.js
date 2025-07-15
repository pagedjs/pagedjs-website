import fs from "fs/promises";
import * as core from "@actions/core";
import { getOctokit, context } from "@actions/github";

// Configuration
const FILE = "./missing-i18n.json"; // Adjust path if needed
const REPO_URL = `https://github.com/${context.repo.owner}/${context.repo.repo}/blob/main`; // Update 'main' if your branch is different

const token = process.env.GITHUB_TOKEN;
const octokit = getOctokit(token);

// Load and parse the JSON
const raw = await fs.readFile(FILE, "utf-8");
const data = JSON.parse(raw);

const REQUIRED_LANGS = data["existing languages"];
const entries = data.entries ?? data.filter((entry) => entry?.src);

// Loop through each content entry
for (const entry of entries) {
  const langsPresent = entry.langs.map((obj) => Object.keys(obj)[0]);
  const missingLangs = REQUIRED_LANGS.filter(
    (lang) => !langsPresent.includes(lang),
  );

  if (missingLangs.length === 0) continue;

  for (const missingLang of missingLangs) {
    const issueTitle = `[translation] missing ${missingLang} for ${entry.unit || entry.src}`;

    // Check for duplicate issues
    const issues = await octokit.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "open",
      per_page: 100,
    });

    const alreadyExists = issues.data.some(
      (issue) => issue.title === issueTitle,
    );

    if (alreadyExists) {
      console.log(`Issue already exists: ${issueTitle}`);
      continue;
    }

    const body = `
**Missing language:** \`${missingLang}\`

- 📄 **Source File:** [${entry.src}](${REPO_URL}/${entry.src.replace(/^\.\//, "")})
- 🌐 **Rendered Page:** [${entry.link}](https://pagedjs.org${entry.link})


you can create it by adding "/src/content/${missingLang}/${entry.src}"

Please add the **${missingLang}** translation for **"${entry.unit || entry.src}"**.
`;

    await octokit.rest.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: issueTitle,
      body,
      labels: ["missing-language"],
    });

    console.log(`Created issue: ${issueTitle}`);
  }
}
