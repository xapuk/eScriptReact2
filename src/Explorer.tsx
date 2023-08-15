import React, { useEffect, useState } from "react";
import { formatDate } from "./utils";
import styled from "styled-components";
import $ from "jquery"; // remove in prod version

const StyledSelect = styled.select`
  width: 100%;
`;

export default function Explorer(props) {
  const [snippet, setSnippet] = props.store.useState("snippet");
  const [substitution, setSubstitution] = props.store.useState("substitution");
  const [changed, setChanged] = props.store.useState("changed");
  const list = props.list;
  const [snippetId, setSnippetId] = props.store.useState("snippetId");

  //console.log("render explorer", props);

  const openSnippet = (event) => {
    if (event.detail === 2) {
      let index = list.length - event.target.index - 1;
      if ("number" === typeof index && index < list.length) {
        console.log("openSnippet", index);
        const s = list[index];
        if (s.id) {
          // server
          setSnippet(s.snippet);
          setChanged(false);
          setSnippetId(s.id);
        } else {
          // template
          //setSnippet(snippet + "\r" + s.snippet);
          setSubstitution(s.snippet);
          setChanged(true);
        }
      }
    }
  };

  return (
    <>
      <StyledSelect size="5" onClick={openSnippet}>
        {[...list]?.reverse().map((i, k) => (
          <option key={k}>{i.name}</option>
        ))}
      </StyledSelect>
    </>
  );
}
