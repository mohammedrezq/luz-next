import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { FaSearch, FaChevronDown } from "react-icons/fa";

import { LIST_MENU_ITEM_PRIMARY } from "../../lib/api/getMenus";
import { initializeApollo } from "../../services/apollo";

import styles from "./Header.module.scss";
import Nav from "../Nav";
import NavMobile from "../NavMobile";

const Header = (props) => {
  // const [subMenu, setSubMenu] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(null);
  // const subMenuRef = useRef(null);

  // const openSubMenuHandler = (index) => {
  //   setActiveIndex(index);
  //   setSubMenu((prevState) => !prevState);
  // };

  // useEffect(() => {
  //   const pageClickEvent = (e) => {
  //     if (
  //       subMenuRef.current !== null &&
  //       !subMenuRef.current.contains(e.target)
  //     ) {
  //       setSubMenu(!subMenu);
  //     }
  //   };

  //   // If the item is active (ie open) then listen for clicks
  //   if (subMenu) {
  //     window.addEventListener("click", pageClickEvent);
  //   }

  //   return () => {
  //     window.removeEventListener("click", pageClickEvent);
  //   };
  // }, [subMenu]);

  return (
    <div className={styles.header}>
      <NavMobile menus={props.menus} />
      <div className={styles.headerTitle}>
        <h1>موقع لوز</h1>
      </div>
      <Nav menus={props.menus} />
      {/* <ul className={styles.navMenu}>
        {props.menus.map((menu, index) => {
          const siteSubFolder = "newsite";
          const newPath = menu?.path
            .toLowerCase()
            .includes(siteSubFolder.toLowerCase())
            ? menu?.path.replace("/newsite/", "")
            : null;
          return (
            <li key={menu.id}>
              <div className={styles.menuItemHasChildren}>
                {menu.children.length > 0 && (
                  <>
                      <button
                        key={index}
                        onClick={() => openSubMenuHandler(index)}
                        key={index}
                        className={styles.menuItemHasChildrenClosed}
                      >
                        <FaChevronDown />
                      </button>
                  </>
                )}
                    <Link href={`/blog/${newPath}`}>
                      <a title={menu.title}>{menu.label}</a>
                    </Link>
              </div>

              {menu.children.length > 0 && (
                <ul  ref={subMenuRef} key={index} className={(subMenu && activeIndex === index) ? styles.navSubMenu : styles.navSubMenuClosed}>
                  {menu.children.map(({id, path, label, title}) => {
                  return (
                    <li key={id}>
                        <Link href={`/blog/${newPath}`}>
                        <a title={menu.title}>{menu.label}</a>
                        </Link>
                    </li>
                  );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Header;
