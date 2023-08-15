import React, { useEffect, useState } from "react";
import { formatDate } from "./utils";
import styled from "styled-components";
import $ from "jquery"; // remove in prod version

const StyledEditor = styled.textarea`
  color: white;
  background-color: black;
  width: 100%;
`;

export default function Logs(props) {
  const [logs] = props.store.useState("logs");

  return (
    <>
      <label>Logs({logs.length}):</label>
      <ul>
        {logs.map(({ timestamp, log }, index) => (
          <li key={index}>
            <span>{formatDate(new Date(timestamp))}</span>
            <span> </span>
            <span>{log}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
