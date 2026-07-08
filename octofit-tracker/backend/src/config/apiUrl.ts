const port = process.env.PORT || '8000';
const codespaceName = process.env.CODESPACE_NAME;

export const apiPort = port;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;