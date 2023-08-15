import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledEditor = styled.textarea`
  width: 100%;
`;

export default function Editor(props) {
  console.log("Editor renderer", props);

  // const [snippet, setSnippet] = props.store.useState("snippet");
  // const [changed, setChanged] = props.store.useState("changed");
  // const [substitution, setSubstitution] = props.store.useState("substitution");

  // const {snippet, setSnippet, substitution, setSubstitution, setChanged} = props.params;

  const snippet = props.snippet;
  const setNewSnippet = props.setNewSnippet;
  const setChanged = props.setChanged;

  const editor = useRef();
  const CMInstance = useRef();
  console.log("CMInstanceInit", CMInstance);

  useEffect(() => {
    const CM = CMInstance.current;
    console.log("Editor useEffect CMInstance", CMInstance.current);
    console.log("Editor useEffect snippet", snippet);
    if (CM) {
      if (CM.getValue() !== snippet) {
        console.log("Editor setCM snippet", snippet);
        CM.setValue(snippet);
      }
    } else {
      // create CM instance
      CMInstance.current = window.CodeMirror.fromTextArea(editor.current, {
        value: snippet,
        mode: "javascript",
        theme: "twilight"
      });
      CMInstance.current.on("change", () => {
        setNewSnippet(CMInstance.current.getValue());
        setChanged(true);
      });
    }
  }, [snippet, setNewSnippet, setChanged]);

  return (
    <>
      <StyledEditor
        ref={editor}
        rows={5}
        value={snippet}
        readOnly
      ></StyledEditor>
      <div style={{ display: snippet.length > 0 ? "block" : "none" }}>
        <label>Characters: </label>
        <span>{snippet.length}</span>
      </div>
    </>
  );
}
