import React, { useState } from 'react';
import { withStatebase } from 'react-statebase';

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
               style={styles.item}
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

const Dropdown = ({list, itemText, onSelect, ...rest}) => {
   const [open, setOpen] = useState(false)
   const [hover, setHover] = useState(false)
   return (
      <div style={styles.root}>
         <Input
            InputProps={{
               onBlur: () => !hover && setOpen(false),
               onFocus: () => setOpen(true),
               ...rest.InputProps
            }}
            {...rest}
         />
         <Selector
            list={list}
            itemText={itemText}
            onSelect={onSelect}
            open={open}
            setOpen={setOpen}
            setHover={setHover}
         />
      </div>
   )
}

export default withStatebase(Dropdown);