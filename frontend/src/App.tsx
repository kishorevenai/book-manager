import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Components/Layouts/MainLayout";
import AllBooks from "./Pages/Books/AllBooks";
import YourBook from "./Pages/Books/YourBook";
import PrefetchBooks from "./Pages/Books/PrefetchBooks";
import PersistLogin from "./Pages/Auth/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<PrefetchBooks />}>
          <Route index element={<AllBooks />} />
          <Route element={<PersistLogin />}>
            <Route path="/your-book" element={<YourBook />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
