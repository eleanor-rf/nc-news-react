import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ArticleList from "./ArticleList";
import { Routes, Route } from "react-router-dom";
import ViewArticle from "./ViewArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ViewArticle />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
