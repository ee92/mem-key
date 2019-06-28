import React from 'react';
import { withStatebase } from 'react-statebase';
import { createKey } from '../api/generate.js';
import { addItem, updateItem } from '../api/database.js';

let WidgetControls = (props) => {
   const sb = props.statebase;
   const { site, email, secret } = sb.ref('inputs').val();
   const settings = sb.ref('settings').val();
   
   const recordMetaData = () => {
      const user = sb.ref('user').val();
      if (!user) return;
      const siteList = sb.ref('siteList').val();
      let siteId;
      for (let i=0; i<siteList.length; i++) {
         let siteName = siteList[i].site.toLowerCase();
         let textInput = site.toLowerCase();
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
      if (!site || !email|| !secret) return;
      const key = createKey(site, email, secret, settings);
      sb.ref('generatedKey').set(key);
      recordMetaData();
   }

   const toggleSettings = () => {
      const ref = sb.ref('visibility').ref('settings');
      const visible = ref.val();
      visible && generate();
      ref.set(!visible);
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