import React, { useState } from 'react';
import { hover } from '../styles/Mui.module.css';

import Input from './Input';

const styles = {
   root: {
      width: '100%',
      position: 'relative'
   },
   dropdown: {
      width: '100%',
      zIndex: 1,
      position: 'absolute',
      backgroundColor: 'white',
      boxShadow: 'rgba(0,0,0,0.15) 0px 1px 2px'
  },
  item: {
     padding: 10,
  }
}

const Selector = (props) => {
   if (!props.open) return null
   return (
      <div
         style={styles.dropdown}
         onMouseEnter={() => props.setHover(true)}
         onMouseLeave={() => props.setHover(false)}
      >
         {props.list.map((item) => 
            <div
               key={props.itemId(item)}
               style={styles.item}
               className={hover}
               onClick={() => {
                  props.onSelect(item)
                  props.setOpen(false)
               }}
            >
               {props.itemText(item)}
            </div>
         )}
      </div>
   )
}

const Dropdown = (props) => {
   const {
      list,
      itemText,
      itemId,
      onSelect,
      InputProps, ...rest} = props


   const [open, setOpen] = useState(false)
   const [hover, setHover] = useState(false)
   const handleEnter = (e) => {
      switch(e.key) {
         case "Enter":
            setOpen(false);
            break;
         case "Escape":
            setOpen(false);
            break;
         default:
            setOpen(true);
      }
   }

   return (
      <div style={styles.root}>
         <Input
            InputProps={{
               onKeyDown: handleEnter,
               onFocus: () => setOpen(true),
               onBlur: () => !hover && setOpen(false),
               ...InputProps
            }}
            {...rest}
         />
         <Selector
            list={list}
            itemText={itemText}
            itemId={itemId}
            onSelect={onSelect}
            open={open}
            setOpen={setOpen}
            setHover={setHover}
         />
      </div>
   )
}

export default Dropdown;