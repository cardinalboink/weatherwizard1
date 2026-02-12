"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { ResultCard } from "@/components/ResultCard/ResultCard";
import { ApiSuccess, ToastState } from "@/lib/types";
import { fetchAverageWeather } from "@/lib/api";


export default function Home() {

  const [city, setCity] = useState("");
  const [days, setDays] = useState(3);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiSuccess | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const cacheRef = useRef<Record<string, ApiSuccess>>({});

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function validateInput(city: string, days: number): string | null {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return "City is required.";
    }

    if (trimmedCity.length < 2) {
      return "City name is too short.";
    }

    if (!Number.isInteger(days)) {
      return "Days must be a whole number.";
    }

    if (days <= 0) {
      return "Days must be greater than 0.";
    }

    if (days > 30) {
      return "Days cannot exceed 30.";
    }

    return null;
  }

  async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const validationError = validateInput(city, days);

    if (validationError) {
      setToast({
        message: validationError,
        type: "error",
      });
      return;
    }

    // const cacheKey = `${city.trim().toLowerCase()}-${days}`;

    // if (cacheRef.current[cacheKey]) {
    //   setData(cacheRef.current[cacheKey]);
    //   setToast({ message: "Loaded from frontend cache", type: "success" });
    //   return;
    // }

    setLoading(true);
    setData(null);

    try {
      
      const body = await fetchAverageWeather(city.trim(), days);

      setData(body);
      // cacheRef.current[cacheKey] = body;

      setToast({
        message: body.cached ? "Loaded from backend cache" : "Fresh data fetched",
        type: "success",
      });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Unknown error",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      {toast && <div className={`${styles.toast} ${toast.type === "error" ? styles.toastError : styles.toastSuccess}`}>{toast.message}</div>}

      <div className={styles.card}>
        <div className={styles.title}>Weather Average Temperature</div>

        <form onSubmit={onSubmit} style={{ justifyContent: "center" }} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label>City</label>
              <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Kuala Lumpur" />
            </div>

            <div className={styles.field}>
              <label>Days</label>
              <input className={styles.input} type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} />
            </div>

            <button className={styles.button} disabled={loading}>
              {loading ? "Loading..." : "Get average"}
            </button>
          </div>
        </form>
        {data && <ResultCard city={data.city} days={data.days} averageTemperature={data.averageTemperature} unit={data.unit} cached={data.cached} />}
      </div>
    </main>
  );
}
