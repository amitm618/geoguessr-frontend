import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { useCallback } from "react";

const useFetchHistory = (setHistory, onUnauthorized) => {
  return useCallback(() => {
    fetchWithAuth("http://127.0.0.1:8000/me/history", {}, onUnauthorized)
      .then((res) => res.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load history:", err));
  }, [setHistory, onUnauthorized]);
};

export default useFetchHistory;
