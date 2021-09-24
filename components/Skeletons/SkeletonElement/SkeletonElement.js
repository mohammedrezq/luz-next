import React from 'react'
import styles from './SkeletonElement.module.scss';

const SkeletonElement = ({type}) => {
    const classes = `${styles.skeleton} ${type}`
    return (
        <div className={classes}>
            
        </div>
    )
}

export default SkeletonElement
