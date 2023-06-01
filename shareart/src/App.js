import { Route, Routes } from "react-router-dom";
import "./App.css";

import ProfilePage from "./components/a parte/ProfilePage";
import AuthComponent from "./components/AuthComponent";
import InspirationPage from "./components/InspirationPage";
import CinemaPage from "./components/CinemaPage";
import ChatComponent from "./components/ChatComponent";
import MusicPage from "./components/MusicPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthComponent />} />
      <Route path="/inspiration" element={<ChatComponent />} />
      <Route path="/cinema" element={<CinemaPage />} />
      <Route path="/music" element={<MusicPage />} />
    </Routes>
  );
}

export default App;
