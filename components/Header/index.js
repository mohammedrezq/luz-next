import React from "react";
import Link from "next/link";

import { LIST_MENU_ITEM_PRIMARY } from "../../lib/api/getMenus";
import { initializeApollo } from "../../services/apollo";

import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <h1>Header</h1>
      {props.menus.map((menu, i) => {
        const siteSubFolder = "newsite";
        const newPath = menu?.path
          .toLowerCase()
          .includes(siteSubFolder.toLowerCase())
          ? menu?.path.replace("/newsite/", "")
          : null;
        return (
          <div key={menu.id}>
            <Link href={`/blog/${newPath}`}>{menu.label}</Link>
            {menu.children.length > 0 &&
              menu.children.map((submenu, index) => {
                // console.log(submenu);
                return (
                  <div style={{background: "#ccc"}} key={submenu.id}>
                    <Link href={`/blog/${newPath}`}>{submenu.label}</Link>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
