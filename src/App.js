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
import { PersistLogin } from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

const ROLES = { Admin: 5150, Editor: 1984, User: 2001 };

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth allowedRoles={[ ROLES.User ]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ ROLES.Editor ]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ ROLES.Admin ]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={
              <RequiredAuth allowedRoles={[ ROLES.Admin, ROLES.Editor ]} />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};
