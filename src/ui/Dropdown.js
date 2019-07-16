import React, { useState, useEffect, useRef } from 'react';
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
      boxShadow: 'rgba(0,0,0,0.15) 0px 1px 2px',
      maxHeight: 150,
      overflow: 'auto'
   },
   item: {
      padding: 10,
   },
   gray: {
      backgroundColor: 'rgba(0,0,0,0.08)'
   }
}

function usePrevious(value) {
   const ref = useRef();
   useEffect(() => {
     ref.current = value;
   });
   return ref.current;
}

const Selector = ({list, itemText, itemId, onSelect, selected, setHover}) => {
   const refs = []
   const lastSelected = usePrevious(selected);
   useEffect(() => {
      const option = refs[selected]
      option && option.scrollIntoView && option.scrollIntoView({behavior: "smooth"})
   }, [refs, selected, lastSelected])
   return (
      <div
         style={styles.dropdown}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
      >
         {list.map((item, i) => {
            const key = itemId(item)
            const itemStyle = (i === selected)
               ? {...styles.item, ...styles.gray}
               : styles.item
            return (
               <div
                  ref={node => refs[i] = node}
                  key={key}
                  style={itemStyle}
                  className={hover}
                  onClick={() => onSelect(item)}
               >
                  {itemText(item)}
               </div>
            )
         })}
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
   const [selected, setSelected] = useState(-1)

   useEffect(() => {
      setSelected(-1)
   }, [open, setSelected])

   const select = (item) => {
      onSelect(item);
      setOpen(false);
   }
   const handleKeys = (e) => {
      switch(e.key) {
         case "Enter":
            selected >= 0 && select(list[selected])
            setOpen(false);
            break;
         case "Escape":
            setOpen(false);
            break;
         case "ArrowUp":
            selected > 0 && setSelected(selected - 1)
            break;
         case "ArrowDown":
            selected < list.length - 1 && setSelected(selected + 1)
            break;
         default:
            setOpen(true);
      }
   }

   return (
      <div style={styles.root}>
         <Input
            InputProps={{
               onKeyDown: handleKeys,
               onFocus: () => setOpen(true),
               onBlur: () => !hover && setOpen(false),
               ...InputProps
            }}
            {...rest}
         />
         {open && <Selector
            list={list}
            itemText={itemText}
            itemId={itemId}
            onSelect={select}
            setHover={setHover}
            selected={selected}
         />}
      </div>
   )
}

export default Dropdown;