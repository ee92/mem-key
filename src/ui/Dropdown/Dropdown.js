import React, { useState, useEffect } from 'react';
import styles from './Dropdown.module.css';
import Input from '../Input';

const Selector = props => {
   const { list, renderItem, onSelect, current, setHover } = props;
   const refs = [];
   useEffect(() => {
     const ref = refs[current];
     if (!ref) return;
     if (!ref.scrollIntoView) return;
     ref.scrollIntoView({ behavior: "smooth" });
   }, [refs, current]);
   return (
     <div
       className={styles.dropdown}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
     >
       {list.map((item, i) => {
         const itemStyle = `${styles.item} ${i === current && styles.gray}`;
         return (
           <div
             ref={node => (refs[i] = node)}
             key={i}
             className={itemStyle}
             onClick={() => onSelect(item)}
           >
             {renderItem(item)}
           </div>
         );
       })}
     </div>
   );
 };
 
 export const Dropdown = props => {
   const { list, renderItem, onSelect, fullWidth, InputProps, ...rest } = props;
   const [open, setOpen] = useState(false);
   const [hover, setHover] = useState(false);
   const [current, setCurrent] = useState(-1);
 
   useEffect(() => setCurrent(-1), [open, setCurrent]);
 
   const select = item => {
     onSelect(item);
     setOpen(false);
   };
 
   const handleKeys = e => {
     switch (e.key) {
       case "Enter":
         if (current >= 0) {
           const item = list[current];
           select(item);
         }
         setOpen(false);
         break;
       case "Escape":
         setOpen(false);
         break;
       case "ArrowUp":
         e.preventDefault();
         current > 0 && setCurrent(current - 1);
         break;
       case "ArrowDown":
         e.preventDefault();
         if (current < list.length - 1) {
           setCurrent(current + 1);
         }
         !open && setOpen(true);
         break;
       default:
         setOpen(true);
         setCurrent(-1);
     }
   };
 
   return (
     <div className={styles.root} style={{width: fullWidth && '100%'}}>
       <Input
            InputProps={{
               onKeyDown: handleKeys,
               onFocus: () => setOpen(true),
               onBlur: () => !hover && setOpen(false),
               ...InputProps
            }}
            fullWidth={fullWidth}
            {...rest}
         />
       {open && (
         <Selector
           list={list}
           renderItem={renderItem}
           onSelect={select}
           setHover={setHover}
           current={current}
         />
       )}
     </div>
   );
 };

export default Dropdown;