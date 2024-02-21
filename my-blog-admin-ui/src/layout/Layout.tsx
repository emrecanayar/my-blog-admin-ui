import Sidebar from "../components/sideBar/SideBar";
import Navbar from "../components/navbar/Navbar";
import styles from "./layout.module.css";
import { useState } from "react";

const Layout = ({ children }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={styles.layout}>
      <div
        className={isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}
      >
        <Sidebar />
      </div>
      <div className={styles.layoutContent}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
