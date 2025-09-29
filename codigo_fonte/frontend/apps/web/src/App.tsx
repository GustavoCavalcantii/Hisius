import { useState } from "react";
import { Button } from "@hisius/ui";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ padding: 20 }}>
        <Button title="Clique aqui (Web)" onPress={() => alert("Hello Web!")} />
      </div>
    </>
  );
}

export default App;
