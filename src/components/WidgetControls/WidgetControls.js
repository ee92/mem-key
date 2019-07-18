import React from 'react';
import useGlobal from '../../api/store';
import { createKey } from '../../api/generate';
import { addItem, updateItem } from '../../api/database';
import styles from './WidgetControls.module.css'

import Settings from '@material-ui/icons/Settings';

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
      <div className={styles.root}>
         <button
            disabled={!site || !email|| !secret}
            onClick={generate}
            className={styles.generate}
         >
            Generate
         </button>
         <button
            onClick={toggleSettings}
            className={styles.settings}
         >
            <Settings/>
         </button>
      </div>
   );
};

export default WidgetControls;