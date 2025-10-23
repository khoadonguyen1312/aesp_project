import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import "antd/dist/reset.css";

const { Sider, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible>
          <div style={{ color: "white", textAlign: "center", padding: "16px" }}>AESP</div>
          <Sidebar />
        </Sider>
        <Layout>
          <HeaderBar />
          <Content style={{ margin: "16px", background: "#fff", padding: "16px", borderRadius: "8px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

