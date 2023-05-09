import { Routes, Route } from "react-router-dom";
import React from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import NewPostPage from "./components/NewPostPage";
import PostPage from "./components/PostPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
