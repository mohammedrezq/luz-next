import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { LIST_MENU_ITEM_PRIMARY } from "../../lib/api/getMenus";
import { initializeApollo } from "../../services/apollo";

import styles from "./Header.module.scss";
import Nav from "../Nav";
import NavMobile from "../NavMobile";
import { SearchREST, SearchGraphQL } from "../Search";

const Header = (props) => {
  const [search, setSearch] = useState(false);

  const searchRef = useRef(null);

  const useOutsideElem = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // console.log("Outside Div Element");
          setSearch(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideElem(searchRef);

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

  const showSearch = (e) => {
    e.preventDefault();
    setSearch(!search);
  };

  return (
    <div style={{marginBottom: search && '80px', transition: 'all 200ms ease-out' }} className={styles.header}>
      <NavMobile menus={props.menus} />
      <div className={styles.headerTitle}>
        <h1><Link href={'/'}>موقع لوز</Link></h1>
      </div>
      <Nav menus={props.menus} />
      <div className={styles.searchContainer} ref={searchRef}>
        <div className={styles.searchIcon} onClick={showSearch}>
          {!search ? <BsSearch size={32} /> : <GrClose size={32} />}
        </div>
        {search && (
          <div className={styles.searchComponent}>
            <SearchGraphQL />
          </div>
        )}
      </div>
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
