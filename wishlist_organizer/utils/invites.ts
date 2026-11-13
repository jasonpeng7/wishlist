// Only invitation paths may override the normal post-authentication destination.
export function inviteReturnPath(value: unknown): string | null {
  return typeof value === "string" && /^\/join\/[A-Za-z0-9_-]+\/?$/.test(value) ? value.replace(/\/$/, "") : null;
}

export function withInviteReturn(path: string, value: unknown): string {
  const destination = inviteReturnPath(value);
  return destination ? `${path}${path.includes("?") ? "&" : "?"}next=${encodeURIComponent(destination)}` : path;
}
