import React from 'react';
import useGlobal from '../api/store';
import { createKey } from '../api/generate.js';
import { addItem, updateItem } from '../api/database.js';

const WidgetControls = () => {

   const [user] = useGlobal('user');
   const [{site, email, secret}] = useGlobal('inputs');
   const [settings] = useGlobal('settings');
   const [siteList] = useGlobal('siteList');
   const [, setKey] = useGlobal('generatedKey');
   const [show, setShow] = useGlobal('visibility.settings');


   const findSite = (value) => {
      return siteList.find((item) => {
         return item.site.toLowerCase() === value.toLowerCase()
      });
   }

   const recordMetaData = () => {
      if (!user) return;
      const existingSite = findSite(site);
      if (existingSite) {
         updateItem(user.uid, existingSite.id, {site, email, settings});
      } else {
         addItem(user.uid, {site, email, settings});
      }
   }

   const generate = () => {
      if (!site || !email|| !secret) return;
      const key = createKey(site, email, secret, settings);
      setKey(key);
      recordMetaData();
   }

   const toggleSettings = () => {
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
};

export default WidgetControls;