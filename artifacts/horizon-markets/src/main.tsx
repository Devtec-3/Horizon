import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

setBaseUrl("https://horizon-yk21.onrender.com");

createRoot(document.getElementById("root")!).render(<App />);
