import React from 'react';
import { withStatebase, useStatebase } from '../Test';
import { createKey } from '../api/generate.js';
import { addItem, updateItem } from '../api/database.js';

let WidgetControls = (props) => {
   
   const sb = props.statebase;
   const userRef = sb.ref('user');
   const siteRef = sb.ref('inputs').ref('site');
   const emailRef = sb.ref('inputs').ref('email');
   const secretRef = sb.ref('inputs').ref('secret');
   const showSettingsRef = sb.ref('visibility').ref('settings');
   const settingsRef = sb.ref('settings');
   const siteListRef = sb.ref('siteList');
   const keyRef = sb.ref('generatedKey');

   const [user] = useStatebase(userRef);
   const [site] = useStatebase(siteRef);
   const [email] = useStatebase(emailRef);
   const [secret] = useStatebase(secretRef);
   const [settings] = useStatebase(settingsRef);
   const [siteList] = useStatebase(siteListRef);
   const [, setKey] = useStatebase(keyRef);
   const [show, setShow] = useStatebase(showSettingsRef);

   const findSite = (value) => {
      return siteList.find((item) => {
         return item.site.toLowerCase() === value.toLowerCase()
      });
   }

   const generate = () => {
      if (!site || !email|| !secret) return;
      const key = createKey(site, email, secret, settings);
      setKey(key);
      recordMetaData();
   }
   
   const recordMetaData = () => {
      if (!user) return;
      const existingSite = findSite(site);
      existingSite
         ? updateItem(user.uid, existingSite.id, {site, email, settings})
         : addItem(user.uid, {site, email, settings});
   }

   const toggleSettings = () => {
      console.log(show)
      show && generate();
      setShow(!show);
   }

   return (
      <div style={{display: 'flex'}}>
         <button
            disabled={!site || !email|| !secret}
            onClick={generate}
            style={{margin: 10, padding: 10, fontSize: 16, width: '100%'}}
         >
            Generate
         </button>
         <button
            onClick={toggleSettings}
            style={{margin: 10, padding: 10, fontSize: 16, width: '100%'}}
         >
            settings
         </button>
      </div>
   );
}

export default withStatebase(WidgetControls);