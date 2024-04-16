import "./App.css";
import { Form } from "./components/form";
import { useData } from "./hooks/data";

function App() {
  const data = useData((state) => state.data);
  const clearData = useData((state) => state.clearData);

  return (
    <main>
      <div>
        <img src="/logo.png" className="logo" alt="logo" />
        <h1>Summarize</h1>
        <p>Your Web page summarizer with AI</p>
      </div>

      {data?.image && data?.text ? (
        <div className="page">
          <img src={data.image} alt="image" />
          <p>{data.text}</p>
          <button onClick={clearData}>Summarize another web</button>
        </div>
      ) : (
        <Form />
      )}
    </main>
  );
}

export default App;
