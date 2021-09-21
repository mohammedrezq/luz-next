import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { FaSearch, FaChevronDown } from "react-icons/fa";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/material/Icon';

import { LIST_MENU_ITEM_PRIMARY } from "../../lib/api/getMenus";
import { initializeApollo } from "../../services/apollo";

import styles from "./DropdownMobile.module.scss";

const useStyles = styled((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expanded: {
      "&$expanded": {
        margin: 0,
        borderRadius: 0,
      }
    },
    backgroundColorAccordion: {
      backgroundColor: '#00627b',
    },
    backgroundColorAccordionDetails: {
      backgroundColor: '#f8f8f8',
    },
    hrefColor: {
      color: "#fff"
    },
    childHrefColor: {
      color: "#000"
    },
  }));


const DropdownMobile = (props) => {

    const classes = useStyles();

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
          : null;
        return (
          <Accordion
            key={index}
            className={`${classes.expanded} ${classes.backgroundColorAccordion}  ${classes.accordionBorderRadius}`}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className={classes.heading}>
                <Link href={`/blog/${newPath}`}>
                  <a className={classes.hrefColor} title={menu.title}>
                    {menu.label}
                  </a>
                </Link>

                <a
                  className={classes.hrefColor}
                  href={`/blog/${newPath}`}
                  title={menu.title}
                //   target={target}
                >
                  {menu.label}
                </a>
              </div>
            </AccordionSummary>
            <AccordionDetails
              className={`${classes.backgroundColorAccordionDetails}`}
            >
              <div>
                {props.menus.children?.length > 0 &&
                  props.menus.children.map(({ id, path, label, title, target }) => {
                    // const newPath = path.split('/');
                    // const articleType = newPath.includes('articles');
                    // const thePath = articleType ? `/${newPath[2]}/${newPath[3]}` : `/${newPath[2]}`;
                    return (
                      <div key={id}>
                        <Link href={`/blog/${newPath}`}>
                          <a className={classes.childHrefColor} title={menu.title}>
                            {menu.label}
                          </a>
                        </Link>

                        <a
                          className={classes.childHrefColor}
                          href={`/blog/${newPath}`}
                          title={menu.title}
                        //   target={target}
                        >
                          {menu.label}
                        </a>
                      </div>
                    );
                  })}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </ul>
  );
};

export default DropdownMobile;
