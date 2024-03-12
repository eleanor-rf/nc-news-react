import { useContext } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router-dom";
import ViewArticle from "./components/ViewArticle";

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
