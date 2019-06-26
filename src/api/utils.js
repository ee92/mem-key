export const copy = (value) => {
   let input = document.createElement('textarea');
   input.innerText = value;
   input.style.cssText = "position: absolute; left: -9999px; font-size: 16px;";
   document.body.appendChild(input);
   if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      var el = input;
      el.contentEditable = true;
      el.readOnly = true;
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      el.setSelectionRange(0, 999999);
   } else {
      input.select();
   }
   document.execCommand('copy');
   input.remove();
}