import React from 'react';
import { withStatebase } from '../Test';
import { noHover } from '../styles/Mui.module.css';

import Input from '../ui/Input';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

let Settings = (props) => {

   const sb = props.statebase
   const showSettings = sb.ref('visibility').ref('settings').val()
   if (!showSettings) return null

   const settings = sb.ref('settings')

   const includeSymbol = settings.ref('includeSymbol')
   const symbols = settings.ref('symbols')
   const useSalt = settings.ref('useSalt')
   const salt = settings.ref('salt')

   const LengthSettings = () => {
      const memRef = settings.ref('isMemorable')
      const lettersRef = settings.ref('length')
      const wordsRef = settings.ref('numWords')

      const memorable = memRef.val()
      const letters = lettersRef.val()
      const words = wordsRef.val()

      const setMemorable = (e) => memRef.set(e.target.checked)

      const Increment = () => {
         const ref = memorable ? wordsRef : lettersRef;
         const incUp = () => ref.set(ref.val() + 1);
         const incDown = () => ref.set(ref.val() - 1);
         return (
            <React.Fragment>
               <IconButton className={noHover} onClick={incUp}>
                  <ExpandLess/>
               </IconButton>
               <IconButton className={noHover} onClick={incDown}>
                  <ExpandMore/>
               </IconButton>
            </React.Fragment>
         )
      }

      return (
         <div>
            <input
               type="checkbox"
               checked={memorable}
               onChange={setMemorable}
            />
            <label>is memorable</label>
            <Input
               value={memorable ? `${words} words` : `${letters} letters`}
               readOnly
               fullWidth
               attach={<Increment/>}
            />
         </div>
      )
   }

   return (
      <div>
         <LengthSettings/>
         <div>
            <input
               type="checkbox"
               checked={includeSymbol.val()}
               onChange={(e) => includeSymbol.set(e.target.checked)}
            />
            include symbol
            {includeSymbol.val()
               && (
                  <div>
                     <Input
                        value={symbols.val()}
                        onChange={(e) => symbols.set(e.target.value)}
                        fullWidth
                     />
                  </div>
               ) 
            }
         </div>
         <div>
            <input
               type="checkbox"
               checked={useSalt.val()}
               onChange={(e) => useSalt.set(e.target.checked)}
            />
            use salt:
            {useSalt.val()
               && (
                  <div>
                     <Input
                        value={salt.val()} 
                        onChange={(e) => salt.set(e.target.value)}
                        fullWidth
                     />
                  </div>
               ) 
            }
         </div>
      </div>
   )
}

export default withStatebase(Settings);