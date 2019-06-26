import React from 'react';
import { withStatebase } from 'react-statebase';
import { createKey } from '../api/generate.js';
import { addItem, updateItem } from '../api/database.js';

let WidgetControls = (props) => {

   const { site, email, secret } = props.statebase.ref('inputs').val()
   
   const generate = () => {
      const settings = props.statebase.ref('settings').val()
      const siteList = props.statebase.ref('siteList').val()
      let key = createKey(site, email, secret, settings)
      props.statebase.ref('generatedKey').set(key)
      const user = props.statebase.ref('user').val()
      if (!user) return
      let siteId
      for (let i=0; i<siteList.length; i++) {
         let siteName = siteList[i].site.toLowerCase()
         let textInput = site.toLowerCase()
         if (textInput === siteName) {
            siteId = siteList[i].id
            break
         }
      }
      siteId
         ? updateItem(user.uid, siteId, {site, email, settings})
         : addItem(user.uid, {site, email, settings})
   }

   const toggleSettings = () => {
      let ref = props.statebase.ref('showSettings')
      ref.set(!ref.val())
   }

   return (
      <div>
         <button
            disabled={!site || !email|| !secret}
            onClick={generate}
         >
            Generate
         </button>
         <button onClick={toggleSettings}>
            settings
         </button>
      </div>
   );
}

export default withStatebase(WidgetControls);