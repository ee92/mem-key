import React, { useEffect } from 'react';
import useGlobal from '../api/store'
import { removeItem } from '../api/database';
import { noMargin } from '../styles/Mui.module.css';
import Dropdown from '../ui/Dropdown';
import IconButton from '../ui/IconButton';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import { Dialog } from '@material-ui/core';


const WidgetInputsUrl = () => {
   const [user] = useGlobal('user');
   const [site, setSite] = useGlobal('inputs.site');
   const [, setEmail] = useGlobal('inputs.email');
   const [siteList] = useGlobal('siteList');
   const [, setSettings] = useGlobal('settings');
   const [, setKey] = useGlobal('generatedKey');
   const [showDelete, setShowDelete] = useGlobal('visibility.confirmDelete');

   const existingSite = siteList.find((item) => {
      return item.site.toLowerCase() === site.toLowerCase()
   });

   const filteredList = siteList.filter((item) => {
      return item.site.toLowerCase().includes(site.toLowerCase())
   })

   useEffect(() => {
      if (existingSite) {
         setEmail(existingSite.email);
         setSettings(existingSite.settings);
      } else {
         setKey("")
      }
   // eslint-disable-next-line
   }, [existingSite])

   const selectSite = site => {
      setSite(site.site);
      setEmail(site.email);
      setSettings(site.settings);
   }

   const handleInput = e => {
      const value = e.target.value;
      setSite(value);
   }

   const deleteItem = () => {
      removeItem(user.uid, existingSite.id);
      setSite("");
      setEmail("");
      setShowDelete(false);
   }

   const DeleteItem = () => {
      if (!existingSite || !user) return null;
      return (
         <IconButton
            onClick={() => setShowDelete(true)}
            className={noMargin}
         >
            <Delete/>
         </IconButton>
      );
   }

   const ClearInput = () => {
      if (!site) return null;
      return (
         <IconButton
            onClick={() => {
               setSite("");
               setEmail("");
            }}
         >
            <Clear/>
         </IconButton>
      );
   }

   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Dropdown
            value={site}
            onChange={handleInput}
            label="Website"
            renderItem={(item) => item.site}
            onSelect={selectSite}
            attach={<ClearInput/>}
            list={filteredList}
            fullWidth
         />
         <DeleteItem/>
         <Dialog
            open={showDelete}
            onClose={() => setShowDelete(false)}
            maxWidth="xl"
         >
            <h1>are you sure?</h1>
            <button onClick={deleteItem}>delete</button>
            <button onClick={() => setShowDelete(false)}>cancel</button>
         </Dialog>
      </div>
   );
}

export default WidgetInputsUrl;