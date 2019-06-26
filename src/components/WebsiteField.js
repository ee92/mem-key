import React from 'react';
import { withStatebase } from 'react-statebase';
import { createKey } from '../api/generate';
import { removeItem } from '../api/database.js';
import Autocomplete from 'react-autocomplete';

let WebsiteField = props => {
   const siteList = props.statebase.ref('siteList').val()
   const siteInput = props.statebase.ref('inputs').ref('site')
   const emailInput = props.statebase.ref('inputs').ref('email')

   const setSite = e => {
      const value = e.target.value
      siteInput.set(value)
      const site = siteList.find((item) => {
         return item.site.toLowerCase() === value.toLowerCase()
      })
      site
         ? selectSite(site)
         : props.statebase.ref('generatedKey').set("")
   }

   const selectSite = site => {
      siteInput.set(site.site)
      emailInput.set(site.email)
      if (props.statebase.ref('inputs').ref('secret').val()) {
         generate()
      }
   }

   const generate = () => {
      const {site, email, secret} = props.statebase.ref('inputs').val()
      const settings = props.statebase.ref('settings').val()
      const key = createKey(site, email, secret, settings)
      props.statebase.ref('generatedKey').set(key)
   }

   const TrashIcon = () => {
      const textInput = siteInput.val().toLowerCase()
      const user = props.statebase.ref('user').val()
      for (let i=0; i<siteList.length; i++) {
         const siteName = siteList[i].site.toLowerCase()
         if (siteName === textInput) {
            return (
               <i
                  className="fas fa-trash-alt"
                  onClick={() => {
                     removeItem(user.uid, siteList[i].id)
                     siteInput.set("")
                     emailInput.set("")
                  }}
               />
            )
         }
      }
      return null
   }

   return (
      <div>
         <input
            value={siteInput.val()}
            onChange={setSite}
            placeholder="app name/url"
         />
         <TrashIcon/>
         <div>
            {siteList
            .filter(item => item.site.includes(siteInput.val()))
            .map(item => 
               <div key={item.site} onClick={() => selectSite(item)}>
                  {item.site}
               </div>
            )}
         </div>
      </div>
   );
}

export default withStatebase(WebsiteField);