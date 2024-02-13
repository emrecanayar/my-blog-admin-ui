import styles from "./sidebar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const SideBar = () => {

    const context = useContext(DarkModeContext);
    if (!context) {
      throw new Error('useContext(DarkModeContext) must be inside a DarkModeProvider with a value');
    }
    const { dispatch } = context;
return(
    <div className={styles.sidebar}>
    <div className={styles.top}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className={styles.logo}>emrecanayar</span>
      </Link>
    </div>
    <hr />
    <div className={styles.center}>
      <ul>
        <p className={styles.title}>MAIN</p>
        <li>
          <DashboardIcon className={styles.icon} />
          <span>Dashboard</span>
        </li>
        <p className={styles.title}>LISTS</p>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <li>
            <PersonOutlineIcon className={styles.icon} />
            <span>Users</span>
          </li>
        </Link>
        <Link to="/categories" style={{ textDecoration: "none" }}>
          <li>
            <StoreIcon className={styles.icon} />
            <span>Kategoriler</span>
          </li>
        </Link>
        <li>
          <CreditCardIcon className={styles.icon} />
          <span>Orders</span>
        </li>
        <li>
          <LocalShippingIcon className={styles.icon} />
          <span>Delivery</span>
        </li>
        <p className={styles.title}>USEFUL</p>
        <li>
          <InsertChartIcon className={styles.icon}/>
          <span>Stats</span>
        </li>
        <li>
          <NotificationsNoneIcon className={styles.icon} />
          <span>Notifications</span>
        </li>
        <p className={styles.title}>SERVICE</p>
        <li>
          <SettingsSystemDaydreamOutlinedIcon className={styles.icon} />
          <span>System Health</span>
        </li>
        <li>
          <PsychologyOutlinedIcon className={styles.icon} />
          <span>Logs</span>
        </li>
        <li>
          <SettingsApplicationsIcon className={styles.icon} />
          <span>Settings</span>
        </li>
        <p className={styles.title}>USER</p>
        <li>
          <AccountCircleOutlinedIcon className={styles.icon} />
          <span>Profile</span>
        </li>
        <li>
          <ExitToAppIcon className={styles.icon} />
          <span>Logout</span>
        </li>
      </ul>
    </div>
    <div className={styles.bottom}>
      <div
        className={styles.colorOption}
        onClick={() => dispatch({ type: "LIGHT" })}
      ></div>
      <div
        className={styles.colorOption}
        onClick={() => dispatch({ type: "DARK" })}
      ></div>
    </div>
  </div>
)

};
export default SideBar;
