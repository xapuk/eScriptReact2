import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const StyledEditor = styled.textarea`
  width: 100%;
`;

export default function Editor(props) {
  console.log("Editor renderer", props);

  const snippet = props.snippet;
  const setNewSnippet = props.setNewSnippet;
  const setChanged = props.setChanged;

  const element = useRef();

  useEffect(() => {
    console.log("element", element);
    console.log("snippet", snippet);
    if (!element.current) return;

    const view = window.CodeMirror.fromTextArea(element.current, {
      value: snippet,
      mode: "javascript",
      theme: "twilight"
    });
    view.on("change", () => {
      setNewSnippet(view.getValue());
      setChanged(true);
    });

    element.current.CodeMirrorInstance = view;

    return () => {
      console.log("destroy editor", view);
      view.toTextArea();
    };
  }, [element]);

  useEffect(() => {
    console.log("new snippet", snippet);
    if (!element) return;
    console.log("change value", element.current.CodeMirrorInstance);
    element.current.CodeMirrorInstance.setValue(snippet);
  }, [element, snippet]);

  return (
    <>
      <StyledEditor
        ref={element}
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
