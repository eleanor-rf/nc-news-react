import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ArticleList from "./ArticleList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
