$(document).ready(function () {
  const iePop = {
    body: $("body"),
    popup: "",
    form: "",
    isPopShow: false,
    cookies: "",
    isMobile: window.innerWidth <= 768,

    template: function () {
      // $(document.head).append(
      //   '<link rel="stylesheet" href="https://shariqansari88.github.io/exit-intent-popup/assets/css/app-vwo.css" />'
      // );

      let template = `<section class="exit-intent-popup flex justify-content-center align-items-center" > <div class="e-i-opac-layer"></div><div class="e-i-pop-content flex"> <div class="e-i-close-cta flex justify-content-center align-items-center" ></div><div class="e-i-form-box"> <div class="e-i-title"> <h3> Get %10 off when you sign up for <span>savings, news, updates and more</span> </h3> </div><div class="e-i-form mt-3"> <form id="eiForm"> <div class="e-i-form-field"> <input type="text" class="e-i-form-text-field px-2" placeholder="Your name" id="eIName" name="eIName"/> </div><div class="e-i-form-field"> <input type="text" class="e-i-form-text-field ie-form-element px-2" placeholder="Email address" id="eIEmail" name="eIEmail"/> </div><div class="e-i-form-field flex flex-flow-row align-items-center"> <input type="checkbox" class="e-i-form-checkbox" id="eICheckBox" name="eICheckBox"/> <label>Check this box to recieve monthly newsletter.</label> </div><div class="e-i-form-footer flex flex-flow-column align-items-center" > <input id="eISubmit" type="submit" value="Sign Up" class="button"/> <a href="#" class="eiLink">Privacy Policy</a> </div></form> </div></div><div class="e-i-banner-img p-3 align-items-center"> <img src="https://shariqansari88.github.io/exit-intent-popup/assets/img/christmas-sale-banner.jpg" alt="Christmas Sale 50% Off"/> </div></div></section>`;

      if ($(".exit-intent-popup").length < 1) {
        iePop.body.append(template);
      }

      iePop.popup = $(".exit-intent-popup");
      iePop.form = $("#eiForm");
    },

    handleMouseMove: function () {
      $(document).on("mousemove", function (e) {
        getMouseDirection(e);
      });

      let yDirection = "";
      let oldY = 0;

      function getMouseDirection(e) {
        let isCookies = JSON.parse(iePop.cookies.iePop);

        oldY < e.clientY ? (yDirection = "down") : (yDirection = "up");
        oldY = e.clientY;

        if (
          e.clientY < 50 &&
          yDirection === "up" &&
          isCookies !== true &&
          iePop.isPopShow !== true
        ) {
          iePop.isPopShow = true;
          iePop.handlePopupShow();
        }
      }
    },

    handlePopupShow: function () {
      if (iePop.isPopShow === true) {
        iePop.popup.addClass("show");
        iePop.body.css({ "overflow-y": "hidden" });
      }
    },

    handleMobilePopupShow: function () {
      setTimeout(function () {
        let isCookies = JSON.parse(iePop.cookies.iePop);

        if (iePop.isMobile && isCookies !== true) {
          iePop.popup.addClass("show");
          iePop.body.css({ "overflow-y": "hidden" });
        }
      }, 5000);
    },

    handlePopupClose: function () {
      $(".e-i-close-cta").on("click", function () {
        iePop.body.css({ "overflow-y": "visible" });

        setTimeout(function () {
          $(".e-i-opac-layer").addClass("iePopFadeOutOpacLayer");
          $(".e-i-pop-content").addClass("iePopTranslateYReverse");
          $(document).on(
            "animationend",
            ".iePopTranslateYReverse",
            function () {
              iePop.popup.removeClass("show");
            }
          );
        }, 300);

        iePop.setCookie("iePop", true, 1);
      });
    },

    setCookie: function (cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    handleCookies: function () {
      iePop.cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
          (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
          }),
          {}
        );

      if (iePop.cookies.iePop === undefined) {
        iePop.cookies.iePop = false;
      }

      console.log(
        iePop.cookies.iePop === false
          ? 'Cookie "iePop" does not exist - Exit-Intent Popup will appear when you try to close your tab'
          : 'Cookie "iePop" exists - You have to delete cookie to appear popup again'
      );
    },

    handleFormValidation: function () {
      let check = true;

      iePop.form.submit(function (e) {
        //email  value check
        if ($(".ie-form-element").val() == "") {
          $(".ie-form-element").addClass("error");
        } else {
          $(".ie-form-element").removeClass("error");
        }

        //checkbox value check
        if (
          $(".exit-intent-popup input[type='checkbox']").is(":not(:checked)")
        ) {
          $(".exit-intent-popup input[type='checkbox']").addClass("error");
        } else {
          $(".exit-intent-popup input[type='checkbox']").removeClass("error");
        }

        //email regex
        let emailinput = $(".ie-form-element").val();
        let regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (regex.test(emailinput) == false) {
          $(".ie-form-element").addClass("error");
          $("label.error").remove();
          $(".ie-form-element").after(
            "<label class='error' style='color:red; display:block; margin:0.5rem 0;font-size:12px;'>Please provide a valid Emaill Address</label>"
          );
        } else {
          $("label.error").remove();
        }

        //Return form based on error class
        if ($("form .error").length >= 1) {
          check = false;
        } else {
          e.preventDefault();
          iePop.body.css({ "overflow-y": "visible" });
          $("#eiForm")[0].reset();
          $(".ie-form-element").removeClass("error");
          $(".exit-intent-popup input[type='checkbox']").removeClass("error");
          $(".ie-form-element").after(
            "<label class='error' style='color:green; display:block; margin:0.5rem 0;font-size:12px;'>Form submitted successfully!</label>"
          );
          setTimeout(function () {
            $(".e-i-opac-layer").addClass("iePopFadeOutOpacLayer");
            $(".e-i-pop-content").addClass("iePopTranslateYReverse");
            $(document).on(
              "animationend",
              ".iePopTranslateYReverse",
              function () {
                iePop.popup.removeClass("show");
              }
            );
          }, 1000);
          iePop.setCookie("iePop", true, 1);
        }

        return check;
      });
    },

    init: function () {
      iePop.template();
      if (iePop.isMobile) {
        iePop.handleMobilePopupShow();
      } else {
        iePop.handleMouseMove();
      }
      iePop.handlePopupClose();
      iePop.handleCookies();
      iePop.handleFormValidation();
    },
  };

  iePop.init();
});
