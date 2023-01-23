import { Register } from "./components/Register";
import { Admin } from "./components/Admin";
import { Editor } from "./components/Editor";
import { Layout } from "./components/Layout";
import { Lounge } from "./components/Lounge";
import { Missing } from "./components/Missing";
import { Unauthorized } from "./components/Unauthorized";
import { LinkPage } from "./components/LinkPage";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { RequiredAuth } from "./components/RequiredAuth";
import { Routes, Route } from "react-router-dom";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};
