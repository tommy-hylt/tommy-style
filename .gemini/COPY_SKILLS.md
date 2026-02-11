# Skill Hydration Protocol

This repository uses a "dehydrated" skill structure to avoid maintaining duplicate files. Skills in `.gemini/skills/` contain `-replace.txt` files which point to the "Source of Truth" in the root directory.

## How to Sync/Hydrate Skills

### Option A: Manual/AI Procedure

When asked to "sync skills," "hydrate skills," or "copy skills," follow this procedure:

1. **Scan**: Look for all files ending in `-replace.txt` within the `.gemini/skills/` directory.
2. **Read**: For each `-replace.txt` file:
   - Read its content (which is a relative path to the source file, e.g., `../../GENERAL.md`).
   - Identify the target filename by removing the `-replace.txt` suffix and adding the appropriate extension (usually `.md`).
3. **Copy**: 
   - Read the content of the source file from the root.
   - Write that content into the skill folder using the target filename.
4. **Verification**: Ensure the skill folder now contains the full `.md` file alongside the `SKILL.md` file.
5. **Cleanup**: Do not keep the `-replace.txt` files.

### Option B: Automated Script

Alternatively, you can run the provided Node.js script from the `skills` directory:

```bash
cd .gemini/skills
node hydrate.js
```
