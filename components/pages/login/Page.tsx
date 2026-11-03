import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import LoginAreaSection from "./sections/LoginAreaSection";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <LoginAreaSection />
    </LegacyPage>
  );
}
