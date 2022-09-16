import { FC, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import ExpenseIndex from "./components/ExpenseIndex";
import ExpenseEdit from "./components/ExpenseEdit";
import ExpenseInfo from "./components/ExpenseInfo";
import About from "./components/About";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const navigate = useNavigate();
  const auth: any = localStorage.getItem("user");

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={auth ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route path="/" element={<ExpenseIndex />} />
          <Route path="/expense/info/:id" element={<ExpenseInfo />} />
          <Route path="/expense/new" element={<ExpenseEdit isEdit={false} />} />
          <Route path="/expense/:id" element={<ExpenseEdit isEdit={true} />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route
          path="/login"
          element={!auth ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!auth ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="*" element={auth ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
};

export default App;
