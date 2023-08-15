/*
TODO:
- add line number and some event on line number click (select the line or miltiple lines with shift or drag)
- don't pass storeto the children as it rerenders on every change
*/

import React from "react";
import { useState, useEffect } from "react";

import * as styles from "./Styles";
import createCustomStore from "./Store";

import Editor from "./Editor";
import Logs from "./Logs";
import History from "./History";
import Explorer from "./Explorer";
import { API } from "./API";

const AppId = "XapukEScript2";

const store = createCustomStore();

export default function App() {
  const [snippet, setSnippet] = store.useState("snippet", { default: "" });
  const [newSnippet, setNewSnippet] = store.useState("new");
  const [logs, setLogs] = store.useState("logs", { default: [] });
  const [history, setHistory] = store.useState("history", { default: [] });
  const [changed, setChanged] = store.useState("changed", { default: false });
  const [serverList, setServerList] = store.useState("serverList", {
    default: []
  });
  const [cloudList, setCloudList] = store.useState("cloudList", {
    default: []
  });
  const [toggleList, setToggleList] = store.useState("toggleList", {
    default: true
  });
  const [snippetId, setSnippetId] = store.useState("snippetId", {
    default: ""
  });
  const [toggleLeft, setToggleLeft] = store.useState("toggleLeft", {
    default: false
  });
  const [toggleBottom, setToggleBottom] = store.useState("toggleBottom", {
    default: false
  });
  const [gistId, setGistId] = store.useState("gistId", {
    default: "db115f65e45c71c48add26f9702dbd67"
  });
  const [snipetBS, setSnipetBS] = store.useState("snipetBS", {
    default: "FWK Runtime Scripts"
  });

  // run once to pull data from server and cloud
  useEffect(() => {
    API.loadSnippets({ setServerList });
  }, [snipetBS]);

  useEffect(() => {
    API.loadCloud(`https://api.github.com/gists/${gistId}`, { setCloudList });
  }, [gistId]);

  const curSnippet = serverList.filter((s) => s.id === snippetId);
  let snippetName = "New Snippet";
  if (curSnippet && curSnippet.length) {
    snippetName = curSnippet[0].name;
  }

  const cloudClick = (event) => {
    setToggleList(false);
    if (event.detail === 2) {
      const newGistId = window.prompt("GitHub gist id", gistId);
      if (newGistId) {
        setGistId(newGistId);
      }
    }
  };

  const serverClick = (event) => {
    setToggleList(true);
    if (event.detail === 2) {
      const newBS = window.prompt("Snippet Business Service Name", snipetBS);
      if (newBS) {
        setSnipetBS(newBS);
      }
    }
  };

  console.log("App render");

  return (
    <styles.StyledApp className="App">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js"></script>
      <styles.StyledRow>
        <styles.StyledTopLeft
          style={{ display: toggleLeft ? "initial" : "none" }}
        >
          <button
            className={toggleList ? "selected" : ""}
            onClick={serverClick}
          >
            My snippets({serverList.length})
          </button>
          {" / "}
          <button
            className={!toggleList ? "selected" : ""}
            onClick={cloudClick}
          >
            Templates({cloudList.length})
          </button>
          {" / "}
          <div style={{ display: toggleList ? "initial" : "none" }}>
            <button
              onClick={() =>
                API.newSnippet(prompt("New snippet name"), {
                  serverList,
                  setServerList,
                  setSnippet
                })
              }
            >
              +
            </button>
            <button onClick={() => API.saveSnippet(snippet, { setChanged })}>
              /
            </button>
            <button onClick={() => API.saveSnippet(snippet, { setChanged })}>
              -
            </button>
            <Explorer store={store} list={serverList} />
          </div>
          <div style={{ display: !toggleList ? "initial" : "none" }}>
            <Explorer store={store} list={cloudList} />
          </div>
        </styles.StyledTopLeft>
        <styles.StyledColumn>
          <button onClick={() => setToggleLeft(!toggleLeft)}>
            {toggleLeft ? "<" : ">"}
          </button>
          <button onClick={() => setToggleBottom(!toggleBottom)}>
            {toggleBottom ? "V" : "^"}
          </button>
          <span>{snippetName}</span>
          {changed ? <span>*</span> : ""}
          <button
            onClick={() =>
              API.runSnippet(snippet, { setLogs, history, setHistory })
            }
          >
            Run
          </button>
          <button onClick={() => API.saveSnippet(snippet, { setChanged })}>
            Save
          </button>
          <Editor
            snippet={snippet}
            setNewSnippet={setNewSnippet}
            setChanged={setChanged}
          />
        </styles.StyledColumn>
      </styles.StyledRow>
      <styles.StyledRow style={{ display: toggleBottom ? "inherit" : "none" }}>
        <styles.StyledBottomLeft>
          <History store={store} />
        </styles.StyledBottomLeft>
        <styles.StyledColumn>
          <Logs store={store} />
        </styles.StyledColumn>
      </styles.StyledRow>
    </styles.StyledApp>
  );
}
