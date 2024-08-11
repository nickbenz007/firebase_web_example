import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Navbar } from "./components/Navbar";
import { SignIn } from "./pages/SignIn";
import CreatePost from "./pages/post/CreatePost";

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/CreatePost" element={<CreatePost />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
