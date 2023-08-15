export const API = {
  runSnippet: async (snippet: string, { setLogs, history, setHistory }) => {
    // call
    const newLogs = snippet.split("\n").map((o: string) => {
      return { timestamp: new Date(), log: o };
    });
    const allHistory = [
      ...history,
      { timestamp: new Date(), snippet, logs: newLogs }
    ];
    // set logs
    setLogs(newLogs);
    // push to history
    setHistory(allHistory);
  },
  loadSnippets: async ({ setServerList }) => {
    const list = [
      { id: 1, name: "snippet 1", snippet: "test1" },
      { id: 2, name: "snippet 2", snippet: "test1\ntest2" }
    ];
    setServerList(list);
  },
  loadCloud: async (URL, { setCloudList }) => {
    fetch(URL, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
      .catch((response) => console.warn(response))
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const list = Object.values(data?.files).map((f) => {
            return { ...f, name: f.filename.split(".")[0], snippet: f.content };
          });
          setCloudList(list);
        }
      });
  },
  saveSnippet: async (snippet: string, { setChanged }) => {
    setChanged(false);
  },
  newSnippet: async (name, { serverList, setServerList, setSnippet }) => {
    console.log(name);
    console.log([...serverList, name]);
    setServerList([...serverList, { id: 3, name: name, snippet: "" }]);
    setSnippet("");
  }
};
