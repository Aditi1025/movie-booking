import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewMovie from "./pages/newMovie/NewMovie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { movieInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { userColumns, movieColumns, theaterColumns } from "./datatablesource";
import NewTheater from "./pages/newTheater/NewTheater";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route index element={<ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute> <New inputs={userInputs} title="Add New User" /> </ProtectedRoute>}
              />
            </Route>
            <Route path="movies">
              <Route index element={<ProtectedRoute>
                  <List columns={movieColumns}/>
                </ProtectedRoute>} />
              <Route path=":moviedId" element={<ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute> <NewMovie /> </ProtectedRoute>}
              />
            </Route>
            <Route path="theater">
              <Route index element={<ProtectedRoute>
                  <List columns={theaterColumns}/>
                </ProtectedRoute>} />
              <Route path=":theaterId" element={<ProtectedRoute>
                  <Single />
                </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute> <NewTheater /> </ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
