function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function asyncGeneratorStep(t,e,n,i,a,o,r){try{var s=t[o](r),c=s.value}catch(l){return void n(l)}s.done?e(c):Promise.resolve(c).then(i,a)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var o=t.apply(e,n);function r(t){asyncGeneratorStep(o,i,a,r,s,"next",t)}function s(t){asyncGeneratorStep(o,i,a,r,s,"throw",t)}r(void 0)}))}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{utt2:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_action_sheet",(function(){return u}));var i=n("dSyh"),a=(n("AfW+"),n("aiEM"),n("+4pY")),o=n("pori"),r=n("Dl6n"),s=function(t){var e=Object(a.a)(),n=Object(a.a)(),i=Object(a.a)();return n.addElement(t.querySelector("ion-backdrop")).fromTo("opacity",.01,.4),i.addElement(t.querySelector(".action-sheet-wrapper")).fromTo("transform","translateY(100%)","translateY(0%)"),e.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([n,i])},c=function(t){var e=Object(a.a)(),n=Object(a.a)(),i=Object(a.a)();return n.addElement(t.querySelector("ion-backdrop")).fromTo("opacity",.4,0),i.addElement(t.querySelector(".action-sheet-wrapper")).fromTo("transform","translateY(0%)","translateY(100%)"),e.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(450).addAnimation([n,i])},l=function(t){var e=Object(a.a)(),n=Object(a.a)(),i=Object(a.a)();return n.addElement(t.querySelector("ion-backdrop")).fromTo("opacity",.01,.32),i.addElement(t.querySelector(".action-sheet-wrapper")).fromTo("transform","translateY(100%)","translateY(0%)"),e.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation([n,i])},d=function(t){var e=Object(a.a)(),n=Object(a.a)(),i=Object(a.a)();return n.addElement(t.querySelector("ion-backdrop")).fromTo("opacity",.32,0),i.addElement(t.querySelector(".action-sheet-wrapper")).fromTo("transform","translateY(0%)","translateY(100%)"),e.addElement(t).easing("cubic-bezier(.36,.66,.04,1)").duration(450).addAnimation([n,i])},u=function(){function t(e){var n=this;_classCallCheck(this,t),Object(i.l)(this,e),this.presented=!1,this.mode=Object(i.e)(this),this.keyboardClose=!0,this.buttons=[],this.backdropDismiss=!0,this.translucent=!1,this.animated=!0,this.onBackdropTap=function(){n.dismiss(void 0,o.a)},this.dispatchCancelHandler=function(t){var e=t.detail.role;if(Object(o.j)(e)){var i=n.getButtons().find((function(t){return"cancel"===t.role}));n.callButtonHandler(i)}},Object(o.e)(this.el),this.didPresent=Object(i.d)(this,"ionActionSheetDidPresent",7),this.willPresent=Object(i.d)(this,"ionActionSheetWillPresent",7),this.willDismiss=Object(i.d)(this,"ionActionSheetWillDismiss",7),this.didDismiss=Object(i.d)(this,"ionActionSheetDidDismiss",7)}var e,n;return _createClass(t,[{key:"present",value:function(){return Object(o.f)(this,"actionSheetEnter",s,l)}},{key:"dismiss",value:function(t,e){return Object(o.g)(this,t,e,"actionSheetLeave",c,d)}},{key:"onDidDismiss",value:function(){return Object(o.h)(this.el,"ionActionSheetDidDismiss")}},{key:"onWillDismiss",value:function(){return Object(o.h)(this.el,"ionActionSheetWillDismiss")}},{key:"buttonClick",value:(n=_asyncToGenerator(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.role,!Object(o.j)(n)){t.next=5;break}t.t0=this.dismiss(void 0,n),t.next=13;break;case 5:return t.next=7,this.callButtonHandler(e);case 7:if(!t.sent){t.next=11;break}t.t1=this.dismiss(void 0,e.role),t.next=12;break;case 11:t.t1=Promise.resolve();case 12:t.t0=t.t1;case 13:return t.abrupt("return",t.t0);case 14:case"end":return t.stop()}}),t,this)}))),function(t){return n.apply(this,arguments)})},{key:"callButtonHandler",value:(e=_asyncToGenerator(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.t0=!e,t.t0){t.next=7;break}return t.t1=!1,t.next=5,Object(o.p)(e.handler);case 5:t.t2=t.sent,t.t0=t.t1!==t.t2;case 7:return t.abrupt("return",t.t0);case 8:case"end":return t.stop()}}),t)}))),function(t){return e.apply(this,arguments)})},{key:"getButtons",value:function(){return this.buttons.map((function(t){return"string"==typeof t?{text:t}:t}))}},{key:"render",value:function(){var t=this,e=Object(i.e)(this),n=this.getButtons(),a=n.find((function(t){return"cancel"===t.role})),o=n.filter((function(t){return"cancel"!==t.role}));return Object(i.i)(i.a,{role:"dialog","aria-modal":"true",style:{zIndex:""+(2e4+this.overlayIndex)},class:Object.assign(Object.assign(_defineProperty({},e,!0),Object(r.b)(this.cssClass)),{"action-sheet-translucent":this.translucent}),onIonActionSheetWillDismiss:this.dispatchCancelHandler,onIonBackdropTap:this.onBackdropTap},Object(i.i)("ion-backdrop",{tappable:this.backdropDismiss}),Object(i.i)("div",{class:"action-sheet-wrapper",role:"dialog"},Object(i.i)("div",{class:"action-sheet-container"},Object(i.i)("div",{class:"action-sheet-group"},void 0!==this.header&&Object(i.i)("div",{class:"action-sheet-title"},this.header,this.subHeader&&Object(i.i)("div",{class:"action-sheet-sub-title"},this.subHeader)),o.map((function(n){return Object(i.i)("button",{type:"button","ion-activatable":!0,class:h(n),onClick:function(){return t.buttonClick(n)}},Object(i.i)("span",{class:"action-sheet-button-inner"},n.icon&&Object(i.i)("ion-icon",{icon:n.icon,lazy:!1,class:"action-sheet-icon"}),n.text),"md"===e&&Object(i.i)("ion-ripple-effect",null))}))),a&&Object(i.i)("div",{class:"action-sheet-group action-sheet-group-cancel"},Object(i.i)("button",{type:"button",class:h(a),onClick:function(){return t.buttonClick(a)}},Object(i.i)("span",{class:"action-sheet-button-inner"},a.icon&&Object(i.i)("ion-icon",{icon:a.icon,lazy:!1,class:"action-sheet-icon"}),a.text))))))}},{key:"el",get:function(){return Object(i.f)(this)}}],[{key:"style",get:function(){return".sc-ion-action-sheet-md-h{--color:initial;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--height:100%;--max-height:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:block;position:fixed;font-family:var(--ion-font-family,inherit);-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-action-sheet-md-h{display:none}.action-sheet-wrapper.sc-ion-action-sheet-md{left:0;right:0;bottom:0;margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);display:block;position:absolute;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);z-index:10;pointer-events:none}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.action-sheet-wrapper.sc-ion-action-sheet-md{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.action-sheet-button.sc-ion-action-sheet-md{display:block;width:100%;border:0;outline:none;font-family:inherit}.action-sheet-button.activated.sc-ion-action-sheet-md{background:var(--background-activated)}.action-sheet-button-inner.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.action-sheet-container.sc-ion-action-sheet-md{display:-ms-flexbox;display:flex;-ms-flex-flow:column;flex-flow:column;-ms-flex-pack:end;justify-content:flex-end;height:100%;max-height:100%}.action-sheet-group.sc-ion-action-sheet-md{-ms-flex-negative:2;flex-shrink:2;overscroll-behavior-y:contain;overflow-y:auto;-webkit-overflow-scrolling:touch;pointer-events:all;background:var(--background)}.action-sheet-group.sc-ion-action-sheet-md::-webkit-scrollbar{display:none}.action-sheet-group-cancel.sc-ion-action-sheet-md{-ms-flex-negative:0;flex-shrink:0;overflow:hidden}.action-sheet-selected.sc-ion-action-sheet-md{background:var(--background-selected)}.sc-ion-action-sheet-md-h{--background:var(--ion-overlay-background-color,var(--ion-background-color,#fff));--background-selected:var(--background,);--background-activated:var(--background)}.action-sheet-title.sc-ion-action-sheet-md{padding-left:16px;padding-right:16px;padding-top:20px;padding-bottom:17px;height:60px;color:var(--color,rgba(var(--ion-text-color-rgb,0,0,0),.54));font-size:16px;text-align:start}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.action-sheet-title.sc-ion-action-sheet-md{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.action-sheet-sub-title.sc-ion-action-sheet-md{padding-left:0;padding-right:0;padding-top:16px;padding-bottom:0;font-size:14px}.action-sheet-group.sc-ion-action-sheet-md:first-child{padding-top:0}.action-sheet-group.sc-ion-action-sheet-md:last-child{padding-bottom:0}.action-sheet-button.sc-ion-action-sheet-md{padding-left:16px;padding-right:16px;padding-top:0;padding-bottom:0;position:relative;height:52px;background:transparent;color:var(--color,var(--ion-color-step-850,#262626));font-size:16px;text-align:start;contain:strict;overflow:hidden}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.action-sheet-button.sc-ion-action-sheet-md{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.action-sheet-icon.sc-ion-action-sheet-md{padding-bottom:4px;margin-left:0;margin-right:32px;margin-top:0;margin-bottom:0;color:var(--color,rgba(var(--ion-text-color-rgb,0,0,0),.54));font-size:24px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.action-sheet-icon.sc-ion-action-sheet-md{margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:32px;margin-inline-end:32px}}.action-sheet-button-inner.sc-ion-action-sheet-md{-ms-flex-pack:start;justify-content:flex-start}.action-sheet-selected.sc-ion-action-sheet-md{font-weight:700}"}}]),t}(),h=function(t){return Object.assign(_defineProperty({"action-sheet-button":!0,"ion-activatable":!0},"action-sheet-"+t.role,void 0!==t.role),Object(r.b)(t.cssClass))}}}]);