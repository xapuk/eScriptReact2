import React, { useEffect, useState } from "react";
import { formatDate } from "./utils";
import styled from "styled-components";
import $ from "jquery"; // remove in prod version

const StyledSelect = styled.select`
  width: 100%;
`;

export default function History(props) {
  const [history, setHistory] = props.store.useState("history");
  const [logs, setLogs] = props.store.useState("logs");
  const [snippet, setSnippet] = props.store.useState("snippet");
  const [changed, setChanged] = props.store.useState("changed");

  const restoreHistory = (event) => {
    if (event.detail === 2) {
      let index = event.target.index;
      if ("number" === typeof index && index < history.length) {
        index = history.length - index - 1;
        console.log("restoreHistory", index);
        const h = history[index];
        setLogs(h.logs);
        setSnippet(h.snippet);
        setChanged(false);
      }
    }
  };

  return (
    <>
      <label>History({history.length}):</label>
      <StyledSelect size="5" onClick={restoreHistory}>
        {[...history]?.reverse().map((i, index) => (
          <option key={index}>{formatDate(new Date(i.timestamp))}</option>
        ))}
      </StyledSelect>
    </>
  );
}
