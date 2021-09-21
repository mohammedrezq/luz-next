import Dropdown from "../Dropdown";
import styles from './Nav.module.scss'

const Nav = (props) => {
  return (
    <div className={styles.NavMenu}>
      <Dropdown menus={props.menus} />
    </div>
  );
};

export default Nav;
