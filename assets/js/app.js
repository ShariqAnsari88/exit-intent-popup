$(document).ready(function () {
  const iePop = {
    body: $("body"),
    popup: $(".exit-intent-popup"),
    form: $("#eiForm"),
    isPopShow: false,
    cookies: "",
    isMobile: window.innerWidth <= 768,

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
      }
    },

    handleMobilePopupShow: function () {
      setTimeout(function () {
        let isCookies = JSON.parse(iePop.cookies.iePop);
        console.log("Mobile cookie is", isCookies);

        if (iePop.isMobile && isCookies !== true) {
          iePop.popup.addClass("show");
        }
      }, 5000);
    },

    handlePopupClose: function () {
      $(".e-i-close-cta").on("click", function () {
        iePop.popup.removeClass("show");
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

      console.log("Cookie is", JSON.parse(iePop.cookies.iePop));
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
        if ($("input[type='checkbox']").is(":not(:checked)")) {
          $("input[type='checkbox']").addClass("error");
        } else {
          $("input[type='checkbox']").removeClass("error");
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
          iePop.popup.removeClass("show");
          iePop.setCookie("iePop", true, 1);
        }

        return check;
      });
    },

    init: function () {
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
