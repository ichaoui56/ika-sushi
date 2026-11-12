export async function uploadAdminImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.set("file", file);
  const response = await fetch("/api/files", { method: "POST", body: formData });
  const result: unknown = await response.json();
  if (!response.ok || typeof result !== "string") {
    const message = result && typeof result === "object" && "error" in result && typeof result.error === "string"
      ? result.error
      : "Image upload failed.";
    throw new Error(message);
  }
  return result;
}
