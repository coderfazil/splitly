import Header from "./components/Header";
import './App.css';
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        
        <Outlet />
        
        </div>
    </div>
  );
}

export default App;
