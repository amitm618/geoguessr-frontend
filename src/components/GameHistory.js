import React, { useEffect, useState } from "react";
import useFetchHistory from "./history_components/useFetchHistory";
import ResetHistoryButton from "./history_components/ResetHistoryButton";
import HistoryRow from "./history_components/HistoryRow";
import { fetchWithAuth } from "../utils/fetchWithAuth"; // adjust path if needed

const GameHistory = ({ refreshTrigger, onUnauthorized }) => {
  const [history, setHistory] = useState([]);
  const fetchHistory = useFetchHistory(setHistory, onUnauthorized);

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger, fetchHistory]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📜 Game History</h2>

      {history.length > 0 && <ResetHistoryButton onReset={fetchHistory} />}

      {history.length === 0 ? (
        <p>No games yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Guess → Actual</th>
              <th>Distance (km)</th>
              <th>Points</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <HistoryRow
                key={entry.id}
                entry={entry}
                onDelete={fetchHistory}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameHistory;
