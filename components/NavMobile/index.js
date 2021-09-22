import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

import styles from './NavMobile.module.scss';
import DropdownMobile from '../DropdownMobile';

const NavMobile = (props) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileMenuClose, setMobileMenuClose] = useState(false);

  const mobileMenuActivateHandler = () => {
    // setMobileMenuActive((prevState) =>  !prevState)
    setMobileMenuActive((prevState) => !prevState);
  };

  const mobileMenuCloseHandler = () => {
    setMobileMenuActive((prevState) => !prevState);
  };

  return (
    <div className={styles.NavMenuMobile}>
      {!mobileMenuActive && <GiHamburgerMenu className={styles.HamburgerMenu} onClick={mobileMenuActivateHandler} />}
      {mobileMenuActive && (
        <div className={styles.mobileMenu}>
          {mobileMenuActive && <div className={styles.closeMobileMenu} ><GrClose size={24} className={styles.closeMenu} onClick={mobileMenuCloseHandler}/></div>}
          <DropdownMobile menus={props.menus} className={`${styles.MobileNavMenu}`} />
        </div>
      )}
    </div>
  );
};

export default NavMobile;
