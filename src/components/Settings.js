import React from 'react';
import { withStatebase } from 'react-statebase';

import Input from '@material-ui/core/Input';

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
            is memorable:
            <input
               type="checkbox"
               checked={isMemorable.val()}
               onChange={(e) => isMemorable.set(e.target.checked)}
            />
            {isMemorable.val()
               ? (
                  <div>
                     words:
                     <Input
                        value={numWords.val()}
                        onChange={(e) => numWords.set(e.target.value)}
                     />
                  </div>
               ) : (
                  <div>
                     letters:
                     <Input
                        value={numLetters.val()}
                        onChange={(e) => numLetters.set(e.target.value)}
                     />
                  </div>
               )
            }
         </div>
         <div>
            include symbol:
            <input
               type="checkbox"
               checked={includeSymbol.val()}
               onChange={(e) => includeSymbol.set(e.target.checked)}
            />
            {includeSymbol.val()
               && (
                  <div>
                     symbols:
                     <Input
                        value={symbols.val()}
                        onChange={(e) => symbols.set(e.target.value)}
                     />
                  </div>
               ) 
            }
         </div>
         <div>
            use salt:
            <input
               type="checkbox"
               checked={useSalt.val()}
               onChange={(e) => useSalt.set(e.target.checked)}
            />
            {useSalt.val()
               && (
                  <div>
                     salt:
                     <Input
                        value={salt.val()} 
                        onChange={(e) => salt.set(e.target.value)}
                     />
                  </div>
               ) 
            }
         </div>
      </div>
   )
}

export default withStatebase(Settings);