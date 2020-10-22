import React, { Suspense } from "react";
import Plane from "./Container/Plane.js";
import "./App.css";

function App() {
  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Plane />
      </Suspense>
    </>
  );
}

export default App;
