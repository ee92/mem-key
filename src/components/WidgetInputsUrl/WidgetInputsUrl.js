import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSite, setEmail } from '../../redux/modules/inputs';
import { setSettings } from '../../redux/modules/settings';
import { setPassword } from '../../redux/modules/password';
import { removeItem } from '../../api/database';
import styles from './WidgetInputsUrl.module.css';
import Dropdown from '../../ui/Dropdown';
import IconButton from '../../ui/IconButton';
import Delete from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import { Dialog } from '@material-ui/core';


const WidgetInputsUrl = () => {
   const [showDelete, setShowDelete] = useState(false);
   const dispatch = useDispatch();
   const {user, site, siteList} = useSelector(state => ({
      user: state.user,
      siteList: state.siteList,
      site: state.inputs.site
   }));

   const existingSite = siteList.find((item) => {
      return item.site.toLowerCase() === site.toLowerCase()
   });

   const filteredList = siteList.filter((item) => {
      return item.site.toLowerCase().includes(site.toLowerCase())
   })

   useEffect(() => {
      if (existingSite) {
         dispatch(setEmail(existingSite.email));
         dispatch(setSettings(existingSite.settings));
      } else {
         dispatch(setPassword(""))
      }
   // eslint-disable-next-line
   }, [existingSite])

   const selectSite = site => {
      dispatch(setSite(site.site));
      dispatch(setEmail(site.email));
      dispatch(setSettings(site.settings));
   }

   const handleInput = e => {
      const value = e.target.value;
      dispatch(setSite(value));
   }

   const deleteItem = () => {
      removeItem(user.uid, existingSite.id);
      dispatch(setSite(""));
      dispatch(setEmail(""));
      setShowDelete(false);
   }

   const DeleteItem = () => {
      if (!existingSite || !user) return null;
      return (
         <IconButton
            onClick={() => setShowDelete(true)}
            className={styles.noMargin}
            tabIndex="-1"
         >
            <Delete/>
         </IconButton>
      );
   }

   const ClearInput = () => {
      if (!site) return null;
      return (
         <IconButton
            onClick={() => {
               dispatch(setSite(""));
               dispatch(setEmail(""));
            }}
            tabIndex="-1"
         >
            <Clear/>
         </IconButton>
      );
   }

   return (
      <div className={styles.root}>
         <Dropdown
            value={site}
            onChange={handleInput}
            label="Website"
            renderItem={(item) => item.site}
            onSelect={selectSite}
            attach={<ClearInput/>}
            list={filteredList}
            fullWidth
         />
         <DeleteItem/>
         <Dialog
            open={showDelete}
            onClose={() => setShowDelete(false)}
            maxWidth="xl"
         >
            <h1>are you sure?</h1>
            <button onClick={deleteItem}>delete</button>
            <button onClick={() => setShowDelete(false)}>cancel</button>
         </Dialog>
      </div>
   );
}

export default WidgetInputsUrl;