!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var i={},n={},t=function(e,i){return{}.hasOwnProperty.call(e,i)},s=function(e,i){var n,t,s=[];n=/^\.\.?(\/|$)/.test(i)?[e,i].join("/").split("/"):i.split("/");for(var a=0,o=n.length;o>a;a++)t=n[a],".."===t?s.pop():"."!==t&&""!==t&&s.push(t);return s.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},o=function(i){return function(n){var t=a(i),o=s(t,n);return e.require(o,i)}},r=function(e,i){var t={id:e,exports:{}};return n[e]=t,i(t.exports,o(e),t),t.exports},g=function(e,a){var o=s(e,".");if(null==a&&(a="/"),t(n,o))return n[o].exports;if(t(i,o))return r(o,i[o]);var g=s(o,"./index");if(t(n,g))return n[g].exports;if(t(i,g))return r(g,i[g]);throw new Error('Cannot find module "'+e+'" from "'+a+'"')},d=function(e,n){if("object"==typeof e)for(var s in e)t(e,s)&&(i[s]=e[s]);else i[e]=n},m=function(){var e=[];for(var n in i)t(i,n)&&e.push(n);return e};e.require=g,e.require.define=d,e.require.register=d,e.require.list=m,e.require.brunch=!0}}(),require.register("application",function(e,i,n){var t=!1,s=5,a=0,o=0,r=0,g=3,d=["main","ingredients","tossing","share"],m=encodeURIComponent("http://bitly.com/1z99Dhc"),u="Happy Chinese New year, I wish you prosperity, wealth and success! Let’s share a Lou Hei together, click on the link to lou "+m,p=function(){$(".app-stage").click(),$(".stage").addClass("hide"),$(".in").removeClass("in"),$(".bounce").removeClass("bounce"),a=0,o=0,tossIdx=0,$(".app-stage").removeClass("hide"),$(document).trigger("disable_shaker")},l=function(){function e(i,n){$(".js-plate-"+i).addClass("hide"),$(".js-plate-"+(i+1)).removeClass("hide"),n>i?setTimeout(function(){window.requestAnimFrame(function(){e(i+1,n)})},1e3/6):setTimeout(function(){t=!1,v(),c()},500)}t||(t=!0,window.requestAnimFrame(function(){e(0,5)}))},c=function(){t||(t=!0,$(".in").removeClass("in"),$(".bounce").removeClass("bounce"),$(".js-ingredient-"+a).removeClass("hide").addClass("in"),setTimeout(function(){t=!1},1200))},f=function(){t||(t=!0,$(".in").removeClass("in"),$(".bounce").removeClass("bounce"),$(".js-ingredient-"+a).addClass("hide").addClass("in"),$(".js-desc-"+a).addClass("bounce"),$(".js-main-"+a).addClass("hide"),$(".js-main-"+(a+1)).removeClass("hide"),a++,setTimeout(function(){t=!1,_()?v():c()},3700))},h=function(){var e=function(i,n){$(".js-chunk-"+i).addClass("hide"),n-1>i?setTimeout(function(){window.requestAnimFrame(function(){e(i+1,n)})},1e3/3):($(".js-message-0").addClass("hide"),$(".js-message-1").removeClass("hide").addClass("bounce"),$(".chunks-container").addClass("hide"),$(".share-container").addClass("in"),$(".credits-container").addClass("in"))};window.requestAnimFrame(function(){e(0,6)})},_=function(){return a===s},v=function(){$("."+d[o]+"-stage").addClass("hide"),o++,$("."+d[o]+"-stage").removeClass("hide"),"tossing"===d[o]&&$(document).trigger("enable_shaker")},w=function(){m="whatsapp://send?text="+u,location.href=m},C=function(){$(document).trigger("disable_shaker"),$(".toss-banner").addClass("opaque"),$(".toss-base").addClass("hide"),$(".js-tossbase").removeClass("hide");var e=function(e){function i(t,s){return $(".js-toss-"+t).removeClass("hide"),$(".js-toss-"+(t-1)).addClass("hide"),t>s?e():void setTimeout(function(){i(t+1,s)},1e3/n)}var n=8,t=17;i(0,t)},i=function(){r+=1,$(".js-tossmessage-"+(r-1)).addClass("hide"),$(".js-tossmessage-"+r).removeClass("opaque hide"),$(".js-tossbase-"+r).removeClass("hide"),g>r?($(".js-tossmessage-"+r).removeClass("hide"),$(document).trigger("enable_shaker")):setTimeout(function(){v()},125)};e(i)};n.exports={initialize:p,plateClickHandler:l,showIngredient:c,showIngredientDesc:f,isLastIngredient:_,nextStage:v,toss:C,showShareButtons:h,shareLink:w}}),require.register("initialize",function(e,i){var n=(i("reqAnimFramePolyfill"),i("shaker")),t=i("application");$(function(){$(document).ready(function(){$(".loading-overlay").addClass("hide")}),t.initialize(),$(".main-stage .js-plate-0").click(function(){$(".audio-player")[0].play(),t.plateClickHandler()}),$(".ingredients-stage .small-plate").click(function(){t.showIngredientDesc()}),$(".share-stage .chunks-container").click(function(){t.showShareButtons()}),$(".js-share-whatsapp").click(function(){$(".audio-player")[0].pause(),setTimeout(function(){t.shareLink()},100)}),$(".share-link").click(function(){$(".audio-player")[0].pause(),this.setSelectionRange(0,25)}),$(document).on("enable_shaker",function(){n.enable()}),$(document).on("disable_shaker",function(){n.disable()}),$(document).on("protoss",function(){t.toss()});var e,i,s;"undefined"!=typeof document.hidden?(e="hidden",s="visibilitychange",i="visibilityState"):"undefined"!=typeof document.mozHidden?(e="mozHidden",s="mozvisibilitychange",i="mozVisibilityState"):"undefined"!=typeof document.msHidden?(e="msHidden",s="msvisibilitychange",i="msVisibilityState"):"undefined"!=typeof document.webkitHidden&&(e="webkitHidden",s="webkitvisibilitychange",i="webkitVisibilityState"),document.addEventListener(s,function(){document[e]?$(".audio-player")[0].pause():$(".audio-player")[0].play()},!1)})}),require.register("preload",function(e,i,n){n.exports=function(e,i){var n=new PxLoader;n.addCompletionListener(i);for(var t=0;t<e.length;t++){var s=new PxLoaderImage(e[t]);n.addImage(s)}return this.start=function(){n.start()},this}}),require.register("preloader",function(e,i,n){n.exports=function(e){var n=i("preload"),t=new n(["images/rotate_device.png","images/firstpage/logo.png","images/firstpage/firstpage_welcome_text.png","images/firstpage/loadingplates_01.png","images/firstpage/loadingplates_02.png","images/firstpage/loadingplates_03.png","images/firstpage/loadingplates_04.png","images/firstpage/loadingplates_05.png","images/firstpage/loadingplates_06.png","images/firstpage/loadingplates_07.png","images/ingredients/add_fish_text.png","images/ingredients/add_lime_text.png","images/ingredients/add_peppercinnamon_text.png","images/ingredients/add_sauce_text.png","images/ingredients/add_crackers_text.png","images/ingredients/fish_text.png","images/ingredients/lime_text.png","images/ingredients/peppercinnamon_text.png","images/ingredients/sauce_text.png","images/ingredients/crackers_text.png","images/ingredients/mainplate_ingredients_0.png","images/ingredients/mainplate_ingredients_1.png","images/ingredients/mainplate_ingredients_2.png","images/ingredients/mainplate_ingredients_3.png","images/ingredients/mainplate_ingredients_4.png","images/ingredients/mainplate_ingredients_5.png","images/ingredients/miniplate_0.png","images/ingredients/miniplate_1.png","images/ingredients/miniplate_2.png","images/ingredients/miniplate_3.png","images/ingredients/miniplate_4.png","images/tossing/tossing_start_text.png","images/tossing/tossing_halfway_text.png","images/tossing/tossing_final_text.png","images/tossing/mainplate_tossed_base.png","images/tossing/mainplate_tossed_start.png","images/tossing/mainplate_tossed_halfway.png","images/tossing/mainplate_tossed_completely.png","images/tossing/tossing_0.png","images/tossing/tossing_1.png","images/tossing/tossing_2.png","images/tossing/tossing_3.png","images/tossing/tossing_4.png","images/tossing/tossing_5.png","images/tossing/tossing_6.png","images/tossing/tossing_7.png","images/tossing/tossing_8.png","images/sharing/share_start_text.png","images/sharing/share_end_text.png","images/sharing/mainplate_eaten.png","images/mainplate_eatenpiece_0.png","images/mainplate_eatenpiece_1.png","images/mainplate_eatenpiece_2.png","images/mainplate_eatenpiece_3.png","images/mainplate_eatenpiece_4.png","images/mainplate_eatenpiece_5.png","images/sharing/icon_wa.png","images/sharing/icon_sms.png","images/sharing/logo.png"],e);t.start()}}),require.register("reqAnimFramePolyfill",function(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()}),require.register("shaker",function(e,i,n){function t(e){d&&(s===a?l(e):(s===o||s===r)&&c(e))}var s,a=0,o=1,r=2,g=-1;s=/Android/i.test(navigator.userAgent)?a:/iPhone|iPad|iPod/i.test(navigator.userAgent)?o:/Windows/i.test(navigator.userAgent)?r:g;var d=!1,m=!1,u=function(){d=!0,window.DeviceMotionEvent?window.addEventListener("devicemotion",t):console.error("DeviceMotionEvent undefined")},p=function(){d=!1,window.DeviceMotionEvent?window.removeEventListener("devicemotion",t):console.error("DeviceMotionEvent undefined")},l=function(e){var i=Math.round(e.accelerationIncludingGravity.z);return i>0?void(m||(m=!0)):void(10>i&&m&&(m=!1,p(),$(document).trigger("protoss")))},c=function(e){var i=Math.round(e.accelerationIncludingGravity.z);return i>=2?void(m||(m=!0)):void(-12>=i&&m&&(m=!1,p(),$(document).trigger("protoss")))},f=function(){return window.DeviceOrientationEvent&&"undefined"!=typeof window.orientation};n.exports={supportsTilt:f,enable:u,disable:p}});