import toast from "react-hot-toast";

function App() {
  const a = async () => {
    try {
      const response = await fetch("http://127.0.0.1/api/v1/ping");
      const data = await response.json();
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <h1>Hello World</h1>
      <button onClick={a}>Click Me</button>
      <button onClick={() => toast.success("Hello")} className="btn">
        Click Me
      </button>
    </>
  );
}

export default App;
