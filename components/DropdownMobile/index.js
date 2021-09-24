import { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { FaSearch, FaChevronDown } from "react-icons/fa"
;
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { LIST_MENU_ITEM_PRIMARY } from "../../lib/api/getMenus";
import { initializeApollo } from "../../services/apollo";

import styles from "./DropdownMobile.module.scss";

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: '#fce658',
    },
    backgroundColorAccordionDetails: {
      backgroundColor: '#fbeb86',
    },
    hrefColor: {
      color: "#19191a",
      fontWeight: "600"
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
    <div>
      {props.menus.map((menu, index) => {
          console.log(menu);
        const siteSubFolder = "newsite";
        const newPath = menu?.path
          .toLowerCase()
          .includes(siteSubFolder.toLowerCase())
          ? menu?.path.replace("/newsite/", "")
          : menu.path;
        return (
            
            <Accordion key={index} className={`${classes.expanded} ${classes.backgroundColorAccordion}  ${classes.accordionBorderRadius}`}>
             <AccordionSummary expandIcon={menu.children?.length > 0 ? <ExpandMoreIcon /> : null} aria-controls="panel1a-content" id="panel1a-header">
              <div className={classes.heading}>
                <Link href={`/blog/${newPath}`}>
                  <a className={classes.hrefColor} title={menu.title}>
                    {menu.label}
                  </a>
                </Link>

                {/* <a
                  className={classes.hrefColor}
                  href={`/blog/${newPath}`}
                  title={menu.title}
                //   target={target}
                >
                  {menu.label}
                </a> */}
              </div>
            </AccordionSummary>
            {menu.children?.length > 0 &&
            <AccordionDetails className={`${classes.backgroundColorAccordionDetails}`}>
              {menu.children.map((menu, index) => {
                const siteSubFolder = "newsite";
                const newPath = menu?.path
                  .toLowerCase()
                  .includes(siteSubFolder.toLowerCase())
                  ? menu?.path.replace("/newsite/", "")
                  : menu.path;
                    // console.log(menu.title);
                     return( <div key={menu.id}>
                        <Link href={`/blog/${newPath}`}>
                          <a className={classes.childHrefColor} title={menu.title}>
                            {menu.label}
                          </a>
                        </Link>

                        {/* <a
                          className={classes.childHrefColor}
                          href={`/blog/${newPath}`}
                          title={menu.title}
                        //   target={target}
                        >
                          {menu.label}
                        </a> */}
                      </div>)
                    {/* ); */}
              
                })}
            </AccordionDetails>
            }
          </Accordion>
        );
      })}
    </div>
  );
};

export default DropdownMobile;
