// lint-staged.config.js
module.exports = async (files) => {
  const commands = [];

  const hasFrontendChanges = files.some((file) => file.startsWith("frontend/"));
  const hasBackendChanges = files.some((file) => file.startsWith("backend/"));

  if (hasFrontendChanges) {
    commands.push("cd frontend && npm run lint");
    commands.push("cd frontend && npm run build --if-present");
    commands.push("cd frontend && npm test --if-present");
  }

  if (hasBackendChanges) {
    commands.push("cd backend && eslint . --fix");
    commands.push("cd backend && npm run build --if-present");
    commands.push("cd backend && npm test --if-present");
  }

  return commands;
};
