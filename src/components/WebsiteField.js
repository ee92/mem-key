import React from 'react';
import { withStatebase } from 'react-statebase';
import { createKey } from '../api/generate';
import { addItem, updateItem, removeItem } from '../api/database.js';
import { noHover } from '../styles/Mui.module.css';
import Dropdown from '../ui/Dropdown.js';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';

let WebsiteField = props => {

   const sb = props.statebase;
   const siteRef = sb.ref('inputs').ref('site');
   const emailRef = sb.ref('inputs').ref('email');
   const settingsRef = sb.ref('settings');

   const user = sb.ref('user').val();
   const settings = settingsRef.val();
   const siteList = sb.ref('siteList').val();
   const { site, email, secret } = sb.ref('inputs').val();

   const setSite = (value) => siteRef.set(value);
   const setEmail = (value) => emailRef.set(value);
   const setSettings = (value) => settingsRef.set(value);
   const setKey = (value) => sb.ref('generatedKey').set(value);

   const findSite = (value) => {
      return siteList.find((item) => {
         return item.site.toLowerCase() === value.toLowerCase()
      });
   }

   const selectSite = site => {
      setSite(site.site);
      setEmail(site.email);
      setSettings(site.settings);
      secret && generate();
   }

   const recordMetaData = () => {
      if (!user) return;
      const existingSite = findSite(site);
      existingSite
         ? updateItem(user.uid, existingSite.id, {site, email, settings})
         : addItem(user.uid, {site, email, settings});
   }

   const generate = () => {
      if (!site || !email|| !secret) return;
      const key = createKey(site, email, secret, settings);
      setKey(key);
      recordMetaData();
   }

   const handleInput = e => {
      const value = e.target.value;
      setSite(value);
      const existingSite = findSite(value);
      existingSite ? selectSite(site) : setKey("");
   }

   const DeleteItem = () => {
      const existingSite = findSite(site);
      if (!existingSite) return null;
      return (
         <span
            onClick={() => {
               user && removeItem(user.uid, existingSite.id)
               setSite("")
               setEmail("")
            }}
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
            list={
               siteList.filter(item => item.site.includes(site))
            }
         />
         <DeleteItem/>
      </div>
   );
}

export default withStatebase(WebsiteField);