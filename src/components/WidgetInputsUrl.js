import React, { useEffect } from 'react';
import useGlobal from '../api/store'
import { removeItem } from '../api/database.js';
import { noHover, gray, red } from '../styles/Mui.module.css';
import Dropdown from '../ui/Dropdown.js';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';

const WidgetInputsUrl = () => {
   const [user] = useGlobal('user');
   const [site, setSite] = useGlobal('inputs.site');
   const [, setEmail] = useGlobal('inputs.email');
   const [siteList] = useGlobal('siteList');
   const [, setSettings] = useGlobal('settings');
   const [, setKey] = useGlobal('generatedKey');

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

   const DeleteItem = () => {
      if (!existingSite || !user) return null;
      return (
         <span
            onClick={() => {
               removeItem(user.uid, existingSite.id)
               setSite("")
               setEmail("")
            }}
            className={`${gray} ${red}`}
         >
            <Delete/>
         </span>
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
            className={noHover}
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
            label="app name/url"
            fullWidth
            itemText={(item) => item.site}
            itemId={(item) => item.id}
            onSelect={selectSite}
            attach={<ClearInput/>}
            list={filteredList}
         />
         <DeleteItem/>
      </div>
   );
}

export default WidgetInputsUrl;