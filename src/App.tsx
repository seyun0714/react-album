import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@/pages/index/index";
import BookmarkPage from "@pages/bookmark/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage />}></Route>
        <Route path="/search/:id" element={<MainPage />}></Route>
        <Route path="/bookmark" element={<BookmarkPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
