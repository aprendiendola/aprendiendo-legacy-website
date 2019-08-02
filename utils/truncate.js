const truncate = (string, char) => (
  string.length >= char
    ? `${string.substr(0, char)}\u2026`
    : string
);

export default truncate;
