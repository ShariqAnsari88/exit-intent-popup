const iePop={body:$("body"),popup:"",form:"",isPopShow:!1,cookies:"",isMobile:window.innerWidth<=768,template:function(){$(document.head).append('<link rel="stylesheet" href="https://shariqansari88.github.io/exit-intent-popup/assets/css/app-vwo.css" />');$(".exit-intent-popup").length<1&&iePop.body.append('<section class="exit-intent-popup flex justify-content-center align-items-center" > <div class="e-i-opac-layer"></div><div class="e-i-pop-content flex"> <div class="e-i-close-cta flex justify-content-center align-items-center" ></div><div class="e-i-form-box"> <div class="e-i-title"> <h3> Get %10 off when you sign up for <span>savings, news, updates and more</span> </h3> </div><div class="e-i-form mt-3"> <form id="eiForm"> <div class="e-i-form-field"> <input type="text" class="e-i-form-text-field px-2" placeholder="Your name" id="eIName" name="eIName"/> </div><div class="e-i-form-field"> <input type="text" class="e-i-form-text-field ie-form-element px-2" placeholder="Email address" id="eIEmail" name="eIEmail"/> </div><div class="e-i-form-field flex flex-flow-row align-items-center"> <input type="checkbox" class="e-i-form-checkbox" id="eICheckBox" name="eICheckBox"/> <label>Check this box to recieve monthly newsletter.</label> </div><div class="e-i-form-footer flex flex-flow-column align-items-center" > <input id="eISubmit" type="submit" value="Sign Up" class="button"/> <a href="#" class="eiLink">Privacy Policy</a> </div></form> </div></div><div class="e-i-banner-img p-3 align-items-center"> <img src="https://shariqansari88.github.io/exit-intent-popup/assets/img/christmas-sale-banner.jpg" alt="Christmas Sale 50% Off"/> </div></div></section>'),iePop.popup=$(".exit-intent-popup"),iePop.form=$("#eiForm")},handleMouseMove:function(){$(document).on("mousemove",function(i){!function(i){let t=JSON.parse(iePop.cookies.iePop);e=o<i.clientY?"down":"up",o=i.clientY,i.clientY<50&&"up"===e&&!0!==t&&!0!==iePop.isPopShow&&(iePop.isPopShow=!0,iePop.handlePopupShow())}(i)});let e="",o=0},handlePopupShow:function(){!0===iePop.isPopShow&&(iePop.popup.addClass("show"),iePop.body.css({"overflow-y":"hidden"}))},handleMobilePopupShow:function(){setTimeout(function(){let e=JSON.parse(iePop.cookies.iePop);iePop.isMobile&&!0!==e&&(iePop.popup.addClass("show"),iePop.body.css({"overflow-y":"hidden"}))},5e3)},handlePopupClose:function(){$(".e-i-close-cta").on("click",function(){iePop.body.css({"overflow-y":"visible"}),setTimeout(function(){$(".e-i-opac-layer").addClass("iePopFadeOutOpacLayer"),$(".e-i-pop-content").addClass("iePopTranslateYReverse"),$(document).on("animationend",".iePopTranslateYReverse",function(){iePop.popup.removeClass("show")})},300),iePop.setCookie("iePop",!0,1)})},setCookie:function(e,o,i){let t=new Date;t.setTime(t.getTime()+24*i*60*60*1e3);let s="expires="+t.toUTCString();document.cookie=e+"="+o+";"+s+";path=/"},handleCookies:function(){iePop.cookies=document.cookie.split(";").map(e=>e.split("=")).reduce((e,[o,i])=>({...e,[o.trim()]:decodeURIComponent(i)}),{}),void 0===iePop.cookies.iePop&&(iePop.cookies.iePop=!1),console.log(!1===iePop.cookies.iePop?'Cookie "iePop" does not exist - Exit-Intent Popup will appear when you try to close your tab':'Cookie "iePop" exists - You have to delete cookie to appear popup again')},handleFormValidation:function(){let e=!0;iePop.form.submit(function(o){""==$(".ie-form-element").val()?$(".ie-form-element").addClass("error"):$(".ie-form-element").removeClass("error"),$(".exit-intent-popup input[type='checkbox']").is(":not(:checked)")?$(".exit-intent-popup input[type='checkbox']").addClass("error"):$(".exit-intent-popup input[type='checkbox']").removeClass("error");let i=$(".ie-form-element").val();return 0==/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(i)?($(".ie-form-element").addClass("error"),$("label.error").remove(),$(".ie-form-element").after("<label class='error' style='color:red; display:block; margin:0.5rem 0;font-size:12px;'>Please provide a valid Emaill Address</label>")):$("label.error").remove(),$("form .error").length>=1?e=!1:(o.preventDefault(),iePop.body.css({"overflow-y":"visible"}),$("#eiForm")[0].reset(),$(".ie-form-element").removeClass("error"),$(".exit-intent-popup input[type='checkbox']").removeClass("error"),$(".ie-form-element").after("<label class='error' style='color:green; display:block; margin:0.5rem 0;font-size:12px;'>Form submitted successfully!</label>"),setTimeout(function(){$(".e-i-opac-layer").addClass("iePopFadeOutOpacLayer"),$(".e-i-pop-content").addClass("iePopTranslateYReverse"),$(document).on("animationend",".iePopTranslateYReverse",function(){iePop.popup.removeClass("show")})},1e3),iePop.setCookie("iePop",!0,1)),e})},init:function(){iePop.template(),iePop.isMobile?iePop.handleMobilePopupShow():iePop.handleMouseMove(),iePop.handlePopupClose(),iePop.handleCookies(),iePop.handleFormValidation()}};iePop.init();