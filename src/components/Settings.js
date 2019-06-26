import React from 'react';
import { withStatebase } from 'react-statebase';

let Settings = (props) => {
   const showSettings = props.statebase.ref('showSettings').val()
   const settings = props.statebase.ref('settings')
   const isMemorable = settings.ref('isMemorable')
   const numLetters = settings.ref('length')
   const numWords = settings.ref('numWords')
   const includeSymbol = settings.ref('includeSymbol')
   const symbols = settings.ref('symbols')
   const useSalt = settings.ref('useSalt')
   const salt = settings.ref('salt')
   if (!showSettings) return null
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
                     <input value={numWords.val()} readOnly/>
                  </div>
               ) : (
                  <div>
                     letters:
                     <input value={numLetters.val()} readOnly/>
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
                     <input value={symbols.val()} readOnly/>
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
                     <input value={salt.val()} readOnly/>
                  </div>
               ) 
            }
         </div>
      </div>
   )
}

export default withStatebase(Settings);