import styles from "./ResultCard.module.css";

type Props = {
  city: string;
  days: number;
  averageTemperature: number;
  unit?: string;
  cached?: boolean;
};

export function ResultCard(p: Props) {
  return (
    <div className={styles.resultBox}>
      <div className={styles.resultHeader}>
        <div className={styles.cityName}>{p.city}</div>
      </div>

      <div className={styles.temperature}>
        {p.averageTemperature}
        {p.unit ? ` ${p.unit}` : ""}
      </div>

      <div className={styles.resultRow}>
         <div className={styles.daysBadge}>
          {p.days} day{p.days > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
