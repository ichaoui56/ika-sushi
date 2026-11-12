import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ika Sushi & Seafood",
};

export default function Page() {
  redirect("/blog-standard");
}
