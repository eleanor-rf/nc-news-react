import Footer from "./components/Footer";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router-dom";
import ViewArticle from "./components/ViewArticle";
import TopicList from "./components/TopicList";
import ErrorPage from "./components/ErrorPage";
import "./app.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ViewArticle />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:slug" element={<ArticleList />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
