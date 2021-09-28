import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

import styles from './Dropdown.module.scss'

const Dropdown = (props) => {
    const [subMenu, setSubMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const subMenuRef = useRef(null);
  
    const openSubMenuHandler = (index) => {
      setActiveIndex(index);
      setSubMenu((prevState) => !prevState);
    };
  
    useEffect(() => {
      const pageClickEvent = (e) => {
        if (
          subMenuRef.current !== null &&
          !subMenuRef.current.contains(e.target)
        ) {
          setSubMenu(!subMenu);
        }
      };
  
      // If the item is active (ie open) then listen for clicks
      if (subMenu) {
        window.addEventListener("click", pageClickEvent);
      }
  
      return () => {
        window.removeEventListener("click", pageClickEvent);
      };
    }, [subMenu]);
    return (
        <ul className={styles.navMenu}>
        {props.menus.map((menu, index) => {
          const siteSubFolder = "newsite";
          const newPath = menu?.path
            .toLowerCase()
            .includes(siteSubFolder.toLowerCase())
            ? menu?.path.replace("/newsite/", "")
            : menu.path;
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
                        title="افتح القائمة - Open menu"
                      >
                        <span aria-label="افتح القائمة - Open Menu" className={styles['sr-only']}>Open Menu - افتح القائمة</span>
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
                  {menu.children.map((menu, index) => {
                      const siteSubFolder = "newsite";
                      const newPath = menu?.path
                        .toLowerCase()
                        .includes(siteSubFolder.toLowerCase())
                        ? menu?.path.replace("/newsite/", "")
                        : menu.path;
                  return (
                    <li key={menu.id}>
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
      </ul>
    )
}

export default Dropdown
