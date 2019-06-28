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

   const sb = props.statebase
   const { site, email, secret } = sb.ref('inputs').val()
   const settings = sb.ref('settings').val()
   const siteList = sb.ref('siteList').val()
   const siteInput = sb.ref('inputs').ref('site')
   const emailInput = sb.ref('inputs').ref('email')

   const setSite = e => {
      const value = e.target.value
      siteInput.set(value)
      const site = siteList.find((item) => {
         return item.site.toLowerCase() === value.toLowerCase()
      })
      site
         ? selectSite(site)
         : sb.ref('generatedKey').set("")
   }

   const selectSite = site => {
      siteInput.set(site.site)
      emailInput.set(site.email)
      sb.ref('settings').set(site.settings)
      if (sb.ref('inputs').ref('secret').val()) {
         generate()
      }
   }

   const recordMetaData = () => {
      const user = sb.ref('user').val();
      if (!user) return;
      const siteList = sb.ref('siteList').val();
      let siteId;
      for (let i=0; i<siteList.length; i++) {
         const siteName = siteList[i].site.toLowerCase();
         const textInput = site.toLowerCase();
         if (textInput === siteName) {
            siteId = siteList[i].id;
            break;
         }
      }
      siteId
         ? updateItem(user.uid, siteId, {site, email, settings})
         : addItem(user.uid, {site, email, settings});
   }

   const generate = () => {
      const key = createKey(site, email, secret, settings)
      sb.ref('generatedKey').set(key)
      recordMetaData()
   }

   const DeleteItem = () => {
      const textInput = siteInput.val().toLowerCase()
      const user = sb.ref('user').val()
      for (let i=0; i<siteList.length; i++) {
         const siteName = siteList[i].site.toLowerCase()
         if (siteName === textInput) {
            return (
               <span
                  onClick={() => {
                     removeItem(user.uid, siteList[i].id)
                     siteInput.set("")
                     emailInput.set("")
                  }}
               >
                  <Delete/>
               </span>
            )
         }
      }
      return null
   }

   const ClearInput = () => {
      if (!siteInput.val()) return null
      return (
         <IconButton
            onClick={() => {
               siteInput.set("")
               emailInput.set("")
            }}
            className={noHover}
         >
            <Clear/>
         </IconButton>
      )
   }

   return (
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
         <Dropdown
            value={siteInput.val()}
            onChange={setSite}
            label="app name/url"
            fullWidth
            itemText={(item) => item.site}
            itemId={(item) => item.id}
            onSelect={(item) => selectSite(item)}
            attach={<ClearInput/>}
            list={
               siteList.filter(item => 
                  item.site.includes(siteInput.val())
               )
            }
         />
         <DeleteItem/>
      </div>
   );
}

export default withStatebase(WebsiteField);