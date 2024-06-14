"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  differenceInMilliseconds,
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import styles from "../../styles/Home.module.css";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("0:0:0:0");
  const [isRunning, setIsRunning] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const updateCountdown = () => {
      if (selectedDate) {
        const now = new Date();
        const diff = intervalToDuration({ start: now, end: selectedDate });
        let days = diff.days || 0;
        const { months = 0 } = diff;
        console.log("debug", diff);
        days %= 30;
        const hours = diff.hours || 0;
        const minutes = diff.minutes || 0;
        const seconds = diff.seconds || 0;

        const timeParts = [];
        if (months > 0) {
          timeParts.push(`${months} ${isEnglish ? "Months" : "Mois"}`);
        }
        timeParts.push(
          `${days} days ${hours.toString().padStart(2, "0")}h${minutes
            .toString()
            .padStart(2, "0")}m${seconds.toString().padStart(2, "0")}s`
        );

        setTimeLeft(timeParts.join(" - "));
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleLanguageToggle = () => {
    setIsEnglish((prevState) => !prevState);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen gap-8 ${styles.container}`}
    >
      <h1 className="text-8xl mb-4 font-bold">
        {isEnglish ? "Day Countdown" : "Day Countdown"}
      </h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
        className={styles.customDatepicker}
      />
      <div className="text-4xl font-bold">{timeLeft}</div>
      <div className="text-gray-500 dark:text-gray-400 text-center">
        <span>{isEnglish ? "Days" : "Jours"}</span> -{" "}
        <span>{isEnglish ? "Hours" : "Heures"}</span> -{" "}
        <span>{isEnglish ? "Minutes" : "Minutes"}</span> -{" "}
        <span>{isEnglish ? "Seconds" : "Secondes"}</span>
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={handleLanguageToggle}>
          {isEnglish ? "Français" : "English"}
        </Button>
      </div>
    </div>
  );
};

export default Home;
