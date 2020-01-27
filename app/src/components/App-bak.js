import React from "react";
import logo from "../images/logo.svg";
import { getProgressiveComponent } from "./ProgressiveComponent";
import TextSection from "./TextSection";
import "./App.css";

let ProgressiveComponentPCOne;
let ProgressiveComponentPCTwo;

function App({ store: defaultStore }) {
  const [text, setText] = React.useState("This is server rendered content");
  const [store, setStore] = React.useState(defaultStore);

  React.useEffect(() => {
    setText("Client-side hydration complete");
  }, []);

  React.useEffect(() => {
    // when chunked script updates window.GLOBAL_STORE
    setStore(store);
  }, [Object.keys(store)]);

  if (!ProgressiveComponentPCOne) {
    ProgressiveComponentPCOne = getProgressiveComponent({
      renderfrom: store.renderfrom,
      serverrenderid: "PCOne"
    });
  }

  if (!ProgressiveComponentPCTwo) {
    ProgressiveComponentPCTwo = getProgressiveComponent({
      renderfrom: store.renderfrom,
      serverrenderid: "PCTwo"
    });
  }

  return (
    <div className={"App"}>
      <header className={"App-header"}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>This React app is progressively rendered from the server.</p>
        <code>{text}</code>
      </header>
      <React.Suspense
        fallback={
          <div>
            <div id={"PCOne"}></div>
          </div>
        }
      >
        <ProgressiveComponentPCOne
          serverrenderid={"PCOne"}
          renderfrom={store.renderfrom}
        >
          <TextSection
            store={store}
            storeKey={"sectionOneText"}
            text={store.sectionOneText}
          />
        </ProgressiveComponentPCOne>
      </React.Suspense>

      <React.Suspense
        fallback={
          <div>
            <div id={"PCTwo"}></div>
          </div>
        }
      >
        <ProgressiveComponentPCTwo
          serverrenderid={"PCTwo"}
          renderfrom={store.renderfrom}
        >
          <TextSection
            store={store}
            storeKey={"sectionTwoText"}
            text={store.sectionTwoText}
          />
        </ProgressiveComponentPCTwo>
      </React.Suspense>
    </div>
  );
}

export default App;
