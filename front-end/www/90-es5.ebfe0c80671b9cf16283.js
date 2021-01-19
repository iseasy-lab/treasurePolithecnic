function _defineProperty(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function asyncGeneratorStep(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(l){return void r(l)}s.done?e(c):Promise.resolve(c).then(n,o)}function _asyncToGenerator(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){asyncGeneratorStep(a,n,o,i,s,"next",t)}function s(t){asyncGeneratorStep(a,n,o,i,s,"throw",t)}i(void 0)}))}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{XGfm:function(t,e,r){"use strict";r.r(e),r.d(e,"ion_toast",(function(){return p}));var n=r("dSyh"),o=(r("AfW+"),r("aiEM"),r("+4pY")),a=r("pori"),i=r("Dl6n"),s=r("YtD4"),c=function(t,e){var r=Object(o.a)(),n=Object(o.a)(),a=t.host||t,i=t.querySelector(".toast-wrapper");switch(n.addElement(i),e){case"top":n.fromTo("transform","translateY(-100%)","translateY(calc(10px + var(--ion-safe-area-top, 0px)))");break;case"middle":var s=Math.floor(a.clientHeight/2-i.clientHeight/2);i.style.top=s+"px",n.fromTo("opacity",.01,1);break;default:n.fromTo("transform","translateY(100%)","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))")}return r.addElement(a).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).addAnimation(n)},l=function(t,e){var r=Object(o.a)(),n=Object(o.a)(),a=t.host||t,i=t.querySelector(".toast-wrapper");switch(n.addElement(i),e){case"top":n.fromTo("transform","translateY(calc(10px + var(--ion-safe-area-top, 0px)))","translateY(-100%)");break;case"middle":n.fromTo("opacity",.99,0);break;default:n.fromTo("transform","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))","translateY(100%)")}return r.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(n)},d=function(t,e){var r=Object(o.a)(),n=Object(o.a)(),a=t.host||t,i=t.querySelector(".toast-wrapper");switch(n.addElement(i),e){case"top":i.style.top="calc(8px + var(--ion-safe-area-top, 0px))",n.fromTo("opacity",.01,1);break;case"middle":var s=Math.floor(a.clientHeight/2-i.clientHeight/2);i.style.top=s+"px",n.fromTo("opacity",.01,1);break;default:i.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",n.fromTo("opacity",.01,1)}return r.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation(n)},u=function(t){var e=Object(o.a)(),r=Object(o.a)(),n=t.host||t,a=t.querySelector(".toast-wrapper");return r.addElement(a).fromTo("opacity",.99,0),e.addElement(n).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(r)},p=function(){function t(e){_classCallCheck(this,t),Object(n.l)(this,e),this.presented=!1,this.mode=Object(n.e)(this),this.duration=0,this.keyboardClose=!1,this.position="bottom",this.showCloseButton=!1,this.translucent=!1,this.animated=!0,Object(a.e)(this.el),this.didPresent=Object(n.d)(this,"ionToastDidPresent",7),this.willPresent=Object(n.d)(this,"ionToastWillPresent",7),this.willDismiss=Object(n.d)(this,"ionToastWillDismiss",7),this.didDismiss=Object(n.d)(this,"ionToastDidDismiss",7)}var e,r,o;return _createClass(t,[{key:"present",value:(o=_asyncToGenerator(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(a.f)(this,"toastEnter",c,d,this.position);case 2:this.duration>0&&(this.durationTimeout=setTimeout((function(){return e.dismiss(void 0,"timeout")}),this.duration));case 3:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})},{key:"dismiss",value:function(t,e){return this.durationTimeout&&clearTimeout(this.durationTimeout),Object(a.g)(this,t,e,"toastLeave",l,u,this.position)}},{key:"onDidDismiss",value:function(){return Object(a.h)(this.el,"ionToastDidDismiss")}},{key:"onWillDismiss",value:function(){return Object(a.h)(this.el,"ionToastWillDismiss")}},{key:"getButtons",value:function(){var t=this,e=this.buttons?this.buttons.map((function(t){return"string"==typeof t?{text:t}:t})):[];return this.showCloseButton&&e.push({text:this.closeButtonText||"Close",handler:function(){return t.dismiss(void 0,"cancel")}}),e}},{key:"buttonClick",value:(r=_asyncToGenerator(regeneratorRuntime.mark((function t(e){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.role,!Object(a.j)(r)){t.next=5;break}t.t0=this.dismiss(void 0,r),t.next=13;break;case 5:return t.next=7,this.callButtonHandler(e);case 7:if(!t.sent){t.next=11;break}t.t1=this.dismiss(void 0,e.role),t.next=12;break;case 11:t.t1=Promise.resolve();case 12:t.t0=t.t1;case 13:return t.abrupt("return",t.t0);case 14:case"end":return t.stop()}}),t,this)}))),function(t){return r.apply(this,arguments)})},{key:"callButtonHandler",value:(e=_asyncToGenerator(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e||!e.handler){t.next=13;break}return t.prev=1,t.t0=!1,t.next=5,Object(a.p)(e.handler);case 5:if(t.t1=t.sent,t.t0!==t.t1){t.next=8;break}return t.abrupt("return",!1);case 8:t.next=13;break;case 10:t.prev=10,t.t2=t.catch(1),console.error(t.t2);case 13:return t.abrupt("return",!0);case 14:case"end":return t.stop()}}),t,null,[[1,10]])}))),function(t){return e.apply(this,arguments)})},{key:"renderButtons",value:function(t,e){var r=this;if(0!==t.length){var o=Object(n.e)(this),a=_defineProperty({"toast-button-group":!0},"toast-button-group-"+e,!0);return Object(n.i)("div",{class:a},t.map((function(t){return Object(n.i)("button",{type:"button",class:b(t),tabIndex:0,onClick:function(){return r.buttonClick(t)}},Object(n.i)("div",{class:"toast-button-inner"},t.icon&&Object(n.i)("ion-icon",{icon:t.icon,slot:void 0===t.text?"icon-only":void 0,class:"toast-icon"}),t.text),"md"===o&&Object(n.i)("ion-ripple-effect",{type:void 0!==t.icon&&void 0===t.text?"unbounded":"bounded"}))})))}}},{key:"render",value:function(){var t=this.getButtons(),e=t.filter((function(t){return"start"===t.side})),r=t.filter((function(t){return"start"!==t.side})),o=Object(n.e)(this),a=_defineProperty({"toast-wrapper":!0},"toast-"+this.position,!0);return Object(n.i)(n.a,{style:{zIndex:""+(6e4+this.overlayIndex)},class:Object.assign(Object.assign(Object.assign(_defineProperty({},o,!0),Object(i.a)(this.color)),Object(i.b)(this.cssClass)),{"toast-translucent":this.translucent})},Object(n.i)("div",{class:a},Object(n.i)("div",{class:"toast-container"},this.renderButtons(e,"start"),Object(n.i)("div",{class:"toast-content"},void 0!==this.header&&Object(n.i)("div",{class:"toast-header"},this.header),void 0!==this.message&&Object(n.i)("div",{class:"toast-message",innerHTML:Object(s.a)(this.message)})),this.renderButtons(r,"end"))))}},{key:"el",get:function(){return Object(n.f)(this)}}],[{key:"style",get:function(){return":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}:host-context([dir=rtl]) .toast-wrapper,[dir=rtl] .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-container,.toast-content{display:-ms-flexbox;display:flex}.toast-content{-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover:hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50,#f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary,#3880ff);--color:var(--ion-color-step-850,#262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);top:0}.toast-wrapper.toast-middle{opacity:.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color,opacity .1s linear;transition:background-color,opacity .1s linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.activated{opacity:.4}@media (any-hover:hover){.toast-button:hover{opacity:.6}}"}}]),t}(),b=function(t){var e;return Object.assign((_defineProperty(e={"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text},"toast-button-"+t.role,void 0!==t.role),_defineProperty(e,"ion-focusable",!0),_defineProperty(e,"ion-activatable",!0),e),Object(i.b)(t.cssClass))}}}]);