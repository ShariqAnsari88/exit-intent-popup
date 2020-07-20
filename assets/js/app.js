$(document).ready(function () {
  const iePop = {
    body: $("body"),
    popup: $(".exit-intent-popup"),
    isPopVisible: false,

    handleMouseMove: function () {
      $(document).on("mousemove", function (e) {
        getMouseDirection(e);
      });

      let yDirection = "";
      let oldY = 0;

      function getMouseDirection(e) {
        oldY < e.clientY ? (yDirection = "down") : (yDirection = "up");
        oldY = e.clientY;
        if (
          e.clientY < 50 &&
          yDirection === "up" &&
          iePop.isPopVisible !== true
        ) {
          console.log(yDirection);
          iePop.isPopVisible = true;
          iePop.handlePopupShow();
        }
      }
    },

    handlePopupShow: function () {
      if (iePop.isPopVisible === true) {
        iePop.popup.addClass("show");
      }
    },

    handlePopupHide: function () {
      if (iePop.isPopVisible === true) {
        iePop.popup.addClass("show");
      }
    },

    handleFormValidation: function () {},

    init: function () {
      iePop.handleMouseMove();
    },
  };

  iePop.init();
});
