export function detectDeviceMobile(): boolean {
    var mobile = {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },

        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },

        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },

        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },

        WindowsIE: function() {
          return navigator.userAgent.match(/IEMobile/i);
        },

        WindowsPhone: function() {
            return navigator.userAgent.match(/windows phone/i);
        },
  
        any: function() {
          return (mobile.Android() || mobile.BlackBerry() || mobile.iOS() || mobile.Opera() || mobile.WindowsIE() || mobile.WindowsPhone());
        }
    };
   
    return mobile.any() !== null ? true : false;
}
