import React, { useEffect } from 'react';
import { withStatebase, useStatebase } from 'react-statebase';
import { removeItem } from '../api/database.js';
import { noHover, gray, red } from '../styles/Mui.module.css';
import Dropdown from '../ui/Dropdown.js';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';

const WidgetInputsUrl = props => {
   const sb = props.statebase;
   const userRef = sb.ref('user');
   const siteRef = sb.ref('inputs').ref('site');
   const emailRef = sb.ref('inputs').ref('email');
   const siteListRef = sb.ref('siteList');
   const settingsRef = sb.ref('settings');
   const keyRef = sb.ref('generatedKey');

   const [user] = useStatebase(userRef);
   const [site, setSite] = useStatebase(siteRef);
   const [, setEmail] = useStatebase(emailRef);
   const [siteList] = useStatebase(siteListRef);
   const [, setSettings] = useStatebase(settingsRef);
   const [, setKey] = useStatebase(keyRef);

   const existingSite = siteList.find((item) => {
      return item.site.toLowerCase() === site.toLowerCase()
   });

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
            list={
               siteList.filter(item => item.site.includes(site))
            }
         />
         <DeleteItem/>
      </div>
   );
}

export default withStatebase(WidgetInputsUrl);