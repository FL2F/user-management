import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import GroupSelect from "./pages/GroupSelect";
import Header from "./components/Header";
import DashboardForGroup from "./pages/DashboardForGroup";
import Confirm from "./components/Confirm";
import CreateMember from "./pages/CreateMember";
import MemberEdit from "./pages/MemberEdit";

function App() {
  return (
    <div className="appContainer">
      <Router>
        <Header />
        <main className="body-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<GroupSelect />} />
            <Route path="/:groupID" element={<DashboardForGroup />} />
            <Route path="/create-member" element={<CreateMember />} />
            <Route path="/:groupID/create-member" element={<CreateMember />} />
            <Route
              path="/:groupID/member-profile/:id"
              element={<MemberEdit />}
            ></Route>
            <Route path="/:groupID/confirm/" element={<Confirm />}></Route>
            <Route path="/:groupID/confirm/:id/" element={<Confirm />}></Route>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
