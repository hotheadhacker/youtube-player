import ReactDOM from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./LanguageProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
