import React from 'react';
import { withStatebase } from 'react-statebase';
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
   const isMemorable = settings.ref('isMemorable')
   const numLetters = settings.ref('length')
   const numWords = settings.ref('numWords')
   const includeSymbol = settings.ref('includeSymbol')
   const symbols = settings.ref('symbols')
   const useSalt = settings.ref('useSalt')
   const salt = settings.ref('salt')
   return (
      <div>
         <div>
            <input
               type="checkbox"
               checked={isMemorable.val()}
               onChange={(e) => isMemorable.set(e.target.checked)}
            />
            is memorable
            {isMemorable.val()
               ? (
                  <Input
                     value={numWords.val() + ' words'}
                     readOnly
                     fullWidth
                     attach={
                        <React.Fragment>
                           <IconButton className={noHover}>
                              <ExpandLess/>
                           </IconButton>
                           <IconButton className={noHover}>
                              <ExpandMore/>
                           </IconButton>
                        </React.Fragment>
                     }
                  />
               ) : (
                  <div>
                     letters:
                     <Input
                        value={numLetters.val() + ' letters'}
                        fullWidth
                     />
                  </div>
               )
            }
         </div>
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
                     symbols:
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
                     salt:
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