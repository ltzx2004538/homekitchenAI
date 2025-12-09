"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import Selector from "@/components/Selector/Selector";
import { LANGUAGES, LanguageCode, getLanguage } from "@utilities/language";
import styles from "@styles/Pages/Setting.module.scss";

export default function SettingsPage() {
  const router = useRouter();

  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("language");
      return (stored as LanguageCode) || "EN";
    }
    return "EN";
  });

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("language", code);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("kitchen");
    }
    router.push("/auth");
  };

  useEffect(() => {
    // Optionally, redirect if not logged in
    if (typeof window !== "undefined" && !localStorage.getItem("authToken")) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className={styles["settings-page"]}>
      <span className={styles["settings-page__title"]}>Settings</span>
      <div className={styles["settings-page__top"]}>
        <Selector
          label={"language:"}
          value={language}
          items={LANGUAGES}
          getLabel={getLanguage}
          onChange={handleLanguageChange}
        />
      </div>
      <div className={styles["settings-page__bot"]}>
        <Button
          label="Logout"
          variant="red"
          size="medium"
          onClick={handleLogout}
          style={{ marginTop: 24 }}
        />
      </div>
    </div>
  );
}
