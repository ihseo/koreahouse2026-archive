"use strict";

/* 
  퍼블팀 js 파일입니다. 
  
  ※ 퍼블팀 외에 수정금지
  개발에서 필요한 부분은 dev.js 파일에 작업 부탁드리며, 
  common.js에서 삭제 필요한 부분은 퍼블팀에 따로 전달 부탁드립니다.
  
*/

/* 모달팝업 */
var startPop = function () {
  var winW = $(window).width();
  if (winW > 1024) {
    $(".start_pop").draggable({
      handle: ".modal-header",
      containment: "html",
    });
    $(".start_pop__slider").draggable({
      handle: ".modal-header",
      containment: "html",
    });
  }
};

/* loading image */
$(window).on("load", function () {
  $(".loading-image").fadeOut(300);
});

/* GNB */
/*
var gnbdrop = {
  init: function () {
    // this.gnbdrop_all(); //모든 2depth+배경 노출
    // this.gnbdrop_box(); //호버한 1depth>link의 2depth 박스형태로 노출
    // this.gnbdrop_line(); //호버한 1depth>link의 2depth + 배경이 노출
  },
  gnbdrop_all: function () {
    //모든 2depth+배경 노출
    var $nav_bg = $('.nav__bg'),
    // $header = $('.header'),
      $nav_link = $('.header .nav .depth-1').children('.link'),
      $nav_drop = $('.header .nav .nav-list--depth2');

      $('.header .nav').each(function () {
        var maxHeight = 0;

        $(this)
        .find('.nav-list--depth2')
        .each(function () {
          if ($(this).outerHeight() > maxHeight) {
            maxHeight = $(this).outerHeight();
          }
        });

        $nav_bg.height(maxHeight);

        $(this)
        .find($nav_link)
        .each(function (index) {
          $(this).on('mouseover focus', function () {
            // $header.addClass('hover');
            $nav_bg.stop(false,true).fadeIn(200,"linear"); //slideDown(200);
            $nav_drop.stop(false,true).fadeIn(200,"linear"); //slideDown(200);
          });
        });

      $('.header').on('mouseleave', function () {
        // $header.removeClass('hover');
        $nav_drop.stop(false,true).fadeOut(200,"linear"); //slideUp(200);
        $nav_bg.stop(false,true).fadeOut(200,"linear"); //slideUp(200);
        });
      });
  },

  gnbdrop_box: function () {
    //호버한 1depth>link의 2depth 박스형태로 노출
    var $nav_link = $('.header .nav .depth-1').children('.link'),
      $nav_drop = $('.header .nav .nav-list--depth2');
    $('.header .nav').each(function () {
      $(this)
        .find($nav_link)
        .each(function (index) {
          $(this).on('mouseover focus', function () {
            if ($(this).next().length > 0) {
              $nav_drop.stop(false, true).fadeOut(100);//slideUp();
              $(this).next().stop(false, true).fadeIn(100);//slideDown();
            } else {
              $nav_drop.stop(false, true).fadeOut(100);//slideUp();
            }
          });
        });
      $(this).on('mouseleave', function () {
        $nav_drop.stop(false, true).fadeOut(100);//slideUp();
      });
    });
  },

  gnbdrop_line: function () {
    //호버한 1depth>link의 2depth + 배경이 노출
    var $nav_bg = $('.nav__bg'),
      $nav_link = $('.depth-1').children('.link'),
      $nav_drop = $('.nav-list--depth2');
    $('.header .nav').each(function () {
      var $nav_bg_height = $nav_drop.innerHeight();
      $nav_bg.height($nav_bg_height);
      $(this)
        .find($nav_link)
        .each(function (index) {
          $(this).on('mouseover focus', function () {
            if ($(this).next().length > 0) {
              $nav_drop.stop(false, true).hide();
              $nav_bg.stop(false, true).show();
              $(this).next().stop(false, true).css('display','flex');//show();
            } else {
              $nav_drop.stop(false, true).hide();
              $nav_bg.stop(false, true).hide();
            }
          });
        });
      $(this).on('mouseleave', function () {
        $nav_drop.stop(false, true).hide();
        $nav_bg.stop(false, true).hide();
      });
    });
  },
};
*/

/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    this.nav_mobile_active(); //활성화된 메뉴 열어두기
    this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $(".nav-mobile__btn"),
      $navBg = $(".nav-mobile__bg"),
      $nav = $(".nav-mobile");
    var toggleNav = function () {
      $navBg.fadeToggle(200, "linear");
      $nav.toggleClass("active");
    };
    $navBtn.on("click", function () {
      toggleNav();
    });
    $navBg.on("click", function () {
      toggleNav();
    });
  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $(".nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on")
      .addClass("active")
      .next()
      .show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $(".nav-mobile .depth-1, .nav-mobile .depth-2").each(function () {
      if ($(this).children("").next().length > 0) {
        $(this).addClass("_down");
      } else {
        $(this).removeClass("_down");
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $(".nav-mobile .depth-1"),
      $depth2 = $(".nav-mobile .depth-2"),
      $depth2_list = $(".nav-mobile .nav-list--depth2"),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $(".nav-mobile .nav-list--depth3");

    $depth1.children(".link").click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css("display") === "none") {
          $depth2.find(".link").removeClass("active");
          $depth1.children(".link").removeClass("active");
          $(this).addClass("active");
          $depth3_list.hide();
          $depth2.find(".link").removeClass("active");
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find(".link").removeClass("active");
          $(this).next().slideUp(200);
          $depth1.children(".link").removeClass("active");
        }
        return false;
      } else {
      }
    });

    $depth2.children(".link").click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css("display") === "none") {
          $depth3_list.find(".link").removeClass("active");
          $depth3_list.stop(false, true).slideUp(300);
          $(this).addClass("active");
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth3_list.find(".link").removeClass("active");
          $(this).removeClass("active");
          $(this).next().stop(false, true).slideUp(300);
        }
        return false;
      } else {
      }
    });
  },
};

/* 서브 네비게이션 */
var subNav = {
  init: function () {
    this.depth_clone();
    this.drop_down();
  },
  depth_clone: function () {
    var $depth1Active = $(".nav").find(".depth-1 > .link"); // 1dp 가져오기
    var $depth2Active = $(".nav")
      .find(".depth-1 > .link.on")
      .next()
      .find(".depth-2 > .link"); //활성화된 2depth
    var $depth3Active = $(".nav")
      .find(".depth-2 > .link.on")
      .next()
      .find(".depth-3 > .link"); //활성화된 3depth

    // console.log(depth2Active);
    var $depth1List = $(".sub-nav-clone--depth1"); //depth1Active를 복사해 넣을 컨테이너
    var $depth2List = $(".sub-nav-clone--depth2"); //depth2Active를 복사해 넣을 컨테이너
    var $depth3List = $(".sub-nav-clone--depth3"); //depth3Active를 복사해 넣을 컨테이너

    //1뎁스 클론
    var $depth1Clone = $depth1Active.clone();
    //1뎁스 클론에 루프 하여 li생성후 넣기
    $.each($depth1Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth1List);
      $(ele).appendTo(li);
    });

    //2뎁스 클론
    var $depth2Clone = $depth2Active.clone();
    //2뎁스 내용 넣기
    $.each($depth2Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth2List);
      $(ele).appendTo(li);
    });

    //3뎁스 클론
    var $depth3Clone = $depth3Active.clone();
    //3뎁스 내용 넣기
    $.each($depth3Clone, function (index, ele) {
      var $li = $('<li class="item"></li>');
      var li = $li.appendTo($depth3List);
      $(ele).appendTo(li);
    });
  },

  drop_down: function () {
    var $dropDown = $(".sub-nav--dropdown .sub-nav__item"),
      $dropDownBtn = $(".sub-nav__button"),
      $dropDownList = $(".sub-nav__drawer");

    $dropDown.each(function () {
      $(this)
        .find($dropDownBtn)
        .click(function () {
          if ($(this).hasClass("on") == true) {
            $(this).removeClass("on");
            $(this).next().stop(false, true).slideUp(200);
          } else {
            $dropDownList.stop(false, true).hide();
            $dropDownBtn.removeClass("on");
            $(this).next().stop(false, true).slideDown(100);
            $(this).addClass("on");
          }
          return false;
        });
    });
  },
};

/* 서브네비게이션 스크롤 형태 */
var subNavScroll = {
  init: function () {
    this.sticky_nav();
  },

  sticky_nav: function () {
    var $subNav = $(".sub-nav--sticky"),
      $subNavWrap = $(".sub-nav--sticky .sub-nav__wrap");
    if ($subNav.length > 0) {
      var subNavOffset = $subNav.offset(),
        // subNavTop = subNavOffset.top;
        subNavTop = subNavOffset.top - $(".header").outerHeight(); // #헤더 고정형일때

      if ($(window).outerWidth() > 768) {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass("fix");
          $subNavWrap.css("top", $(".header").outerHeight()); //#헤더 고정형일때
        } else {
          $subNav.removeClass("fix");
          $subNavWrap.css("top", 0); //#헤더 고정형일때
        }
      } else {
        if ($(window).scrollTop() > subNavTop) {
          $subNav.addClass("fix");
        } else {
          $subNav.removeClass("fix");
        }
      }
    }
  },
};

/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $(".popup-link").magnificPopup(
      {
        type: "ajax",
        closeOnBgClick: false,
        mainClass: "mfp-fade",
        callbacks: {
          ajaxContentAdded: function () {
            var $content = $(this.content[0]);
            var $pop = $content.find(".popup-in-popup");
            var aURL = "";

            if ($pop.length > 0) {
              aURL = $pop.attr("href");

              $pop.on("click", function (e) {
                e.preventDefault();

                $.ajax({
                  url: aURL,
                  dataType: "html",
                  success: function (data) {
                    var item = '<div class="pop-in-pop">';
                    item += data;
                    item += "</div>";

                    /* HTML append */
                    $content.append(item);

                    /* 닫기 버튼 append */
                    $(".pop-in-pop")
                      .children()
                      .append(
                        '<div class="pop-in-close"><i class="xi-close"></i></div>'
                      );

                    /* 닫기 버튼 */
                    $(".pop-in-close").on("click", function () {
                      $(".pop-in-pop").remove();
                    });
                  },
                });
              });
            }
          },
        },
      },
      500
    );
  },
};

function closePopup() {
  $.magnificPopup.close();
}

$(window).on("scroll", function () {
  subNavScroll.init();
});

$(window).on("resize", function () {
  subNavScroll.init();
});

$(document).on("mouseover", function () {
  magnificPop.init();
});

$(document).ready(function () {
  /* Navigation Active */
  $(".nav, .nav-mobile").navActive({
    depth1: ".depth-1",
    depth2: ".depth-2",
    depth3: ".depth-3",
    activeClass: "on",
    callback: function () {
      // console.log('callback function');
    },
  });

  /* HEADER GNB Drop */
  $(".header").navDrop({
    type: "line", // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
    background: true, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
    backgroundClass: ".nav__bg", // 기본값 .nav__bg
    backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
    effect: "fade", // 기본값 fade, 옵션값은 fade, slide
    delay: 200, // 출력시 delay
    callback: function () {}, // 콜백 함수
  });

  /* 
    이미지맵 제작 추천 : https://www.image-map.net/
    이미지맵 반응형 작업 시 선언
    $('img[usemap]').rwdImageMaps();
  */

  /* 
  $('[data-track]').scrollTrack({
    threshold: 0, // // 임계치 ( * 상단 고정영역 높이 )
    activeClass: 'active', // 활성 클래스 네이밍 (기본값 : active)
  });
  */

  /**
   * qna
   * 아코디언
   */
  var qnaFun = {
    init: function () {
      this.q();
    },
    q: function () {
      var qna = $(".qna"),
        header = qna.find(".qna-header"),
        header_a = qna.find(".qna-header a"),
        body = qna.find(".qna-body"),
        faq_chk = "";
      body.hide();

      $(document).on("click", ".qna-header", function (event) {
        event.preventDefault();

        if ($(this).hasClass("select") == true) {
          $(this).removeClass("select");
          $(this).next().stop().hide();
        } else {
          $(body).stop().hide();
          $(header).removeClass("select");
          $(this).next().stop().show();
          $(this).addClass("select");
        }
      });
    },
  };

  $(window).scrollTrack({
    threshold: 0,
    activeClass: "active",
  });

  //gnbdrop.init();
  navMobile.init();
  subNav.init();
  subNavScroll.init();
  startPop();
  qnaFun.init(); //qna

  var wowJS = new WOW().init();

  //wowrap
  var wowrap = $(".wowrap");
  $(wowrap).each(function () {
    $(this)
      .find(".wow")
      .each(function (index) {
        var eq = index / 8 + "s";
        $(this).attr("data-wow-delay", eq);
      });
    $(this)
      .find(".animated")
      .each(function (index) {
        var eq = index * 250;
        $(this).attr("data-id", "delay-" + eq);
      });
  });

  /* Bullet List */
  $(".bullet-list").each(function () {
    if ($(this).hasClass("bullet-list--decimal")) {
      $(this)
        .children(".item")
        .each(function (index) {
          $(this).prepend(
            '<span class="decimal-number">' + (index + 1) + "</span>"
          );
        });
    }

    $(this).addClass("bullet-type--js");
  });

  /*
  min-width지정 rowscroll
  */
  $(".row-scrollwrap").each(function () {
    var $rowScrollTxtWidth = $(this).data("show"),
      $rowScrollTxt = $(this).find(".row-scrollwrap__txt");
    $(this)
      .find(".row-scrollwrap__content")
      .css("min-width", $rowScrollTxtWidth);
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) {
      $rowScrollTxt.show();
      // 지정된 rowScrollTxtWidth + (gutter) 해상도에서 안내문구 노출
    }
  });

  /* scrollbar js */
  $(".scrollbar-inner").scrollbar();
  // $('.scrollbar-outer').scrollbar();
  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  var resizing = resizingCheck({
    breakpoints: {
      414: function () {
        // console.log('414 < width < 768');
      },
      768: function () {
        // console.log('768 < width < 1024');
      },
      1024: function () {
        // console.log('1024 < width < 1200');
      },
      1200: function () {
        // console.log('1200 < width');
      },
    },
  });
});

/* File Upload */
$(document).on("change", '.file-box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).parents(".file-box").find(".file-box__text").text(tmp);
  $(this).parents(".file-box").find(".file-box__text").addClass("on");
});

/* File Upload - 구버전 */
$(document).on("change", '.file_box input[type="file"]', function () {
  var tmp = $(this).val().replace(/^.*\\/, "");
  $(this).siblings("p").text(tmp);
});

//suv-nav 스크롤
function subNavScroll_front() {
  var $subNav = $(".sub-nav__wrap");
  var subNavLinkLeft = $(".sub-nav__wrap .link.on").offset().left;
  var subNavWidth = $(".sub-nav__wrap");
  var totalWidth = 0;

  for (var i = 0; i < subNavWidth.length; i++) {
    totalWidth += subNavWidth[i].offsetWidth;
  }

  $subNav.animate({ scrollLeft: subNavLinkLeft - 100 }, 1);
}

$(document).ready(function () {
  if ($(".sub-nav__wrap").length > 0) {
    if ($(window).innerWidth() < 1201) {
      subNavScroll_front();
    }
  }
});
$(window).resize(function () {
  if ($(".sub-nav__wrap").length > 0) {
    if ($(window).innerWidth() < 1201) {
      subNavScroll_front();
    }
  }
});

/* 본인인증 팝업 내 이용약관 보기 open/hide */
$(".terms-chk__head .icon").on("click", function () {
  $(this)
    .parents(".terms-chk")
    .find(".terms-chk__body")
    .stop()
    .slideToggle(200);
  $(this).toggleClass("active");
});

$(".terms-text-open").on("click", function () {
  if (
    $(this).parents(".terms-tr").find(".terms-text").css("display") == "none"
  ) {
    $(this).text("닫기");
    $(this).parents(".terms-tr").find(".terms-text").stop().slideDown(200);
  } else {
    $(this).text("전문보기");
    $(this).parents(".terms-tr").find(".terms-text").stop().slideUp(200);
  }
});

$(document).ready(function () {
  // 아이디 유효성 체크 및 중복 검사

  $(document).on("click", "#all_agree", function () {
    if ($(this).is(":checked")) $(".agree_forms").prop("checked", true);
    else $(".agree_forms").prop("checked", false);
  });

  $(document).on("click", ".agree_forms", function () {
    if ($(this).is(":checked")) {
      var total = $(".terms-chk input[type=checkbox]").not("#all_agree").length;
      var checked = $(".terms-chk input[type=checkbox]:checked").not(
        "#all_agree"
      ).length;
      if (total == checked) $("#all_agree").prop("checked", true);
    } else $("#all_agree").prop("checked", false);
  });
});

//input 폼 검증 실패일때 invalid
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("invalid", () => {
    // 검증 후 폼 요소에 was-validated 클래스로 표시해 둔다
    document.forms[0].classList.add("was-validated");
  });
});

//aos
AOS.init({
  duration: 1200,
  once: true,
});

// 전화번호 하이픈 자동생성
$(document).on("input", ".AutoHyphen", function () {
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        "$1-$2-$3"
      )
      .replace("--", "-")
  );
});

// input 숫자만 입력가능
$(document).ready(function () {
  $(".utel").on("keyup", function () {
    var inputVal = $(this).val();
    if (!$.isNumeric(inputVal)) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "") //입력된 문자열이 숫자가 아니면 공백처리
      );

      alert("숫자만 입력가능합니다.");
    }
  });
});

// 주소
function DaumPostcode(uzip = "", uaddr1 = "", uaddr2 = "") {
  if (uzip == "") uzip = "uzip";
  if (uaddr1 == "") uaddr1 = "uaddr1";
  if (uaddr2 == "") uaddr2 = "uaddr2";

  daum.postcode.load(function () {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ""; // 최종 주소 변수
        var extraAddr = ""; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          fullAddr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if (data.userSelectedType === "R") {
          //법정동명이 있을 경우 추가한다.
          if (data.bname !== "") {
            extraAddr += data.bname;
          }
          // 건물명이 있을 경우 추가한다.
          if (data.buildingName !== "") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
          fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        //document.getElementById("uzip1").value = data.postcode1; //6자리 우편번호 사용
        //document.getElementById("uzip2").value = data.postcode2; //6자리 우편번호 사용
        document.getElementById(uzip).value = data.zonecode; //5자리 기초구역번호 사용
        document.getElementById(uaddr1).value = fullAddr;

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById(uaddr2).focus();
      },
    }).open();
  });
}

//하단영역 팝업설정
$(document).ready(function () {
  $(".popup-link").on("click", function () {
    $("body").addClass("body-fixed");
  });
  $(document).on("click", ".mfp-close", function () {
    $("body").removeClass("body-fixed");
  });
  // ESC 키 눌렀을 때 팝업이 열려있는 경우
  $(document).keyup(function (e) {
    if (e.key === "Escape" && $.magnificPopup.instance.isOpen) {
      $.magnificPopup.close();
      $("body").removeClass("body-fixed"); // ESC 키 눌렀을 때 body-fixed 클래스 제거
    }
  });
});

//input 숫자/특수문자 입력X
document.querySelectorAll(".name-input").forEach(function (input) {
  input.addEventListener("input", function (e) {
    var value = e.target.value;
    var filteredValue = value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    e.target.value = filteredValue;
  });
});

//input 이메일 형식에 사용가능한 문자만 허용
document.querySelectorAll(".email-input").forEach(function (input) {
  input.addEventListener("input", function (e) {
    var value = e.target.value;
    var filteredValue = value.replace(/[^a-zA-Z0-9!@^.\s]/g, "");
    e.target.value = filteredValue;
  });
});

//숫자만 입력가능
document.querySelectorAll(".number-input").forEach(function (input) {
  input.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    // 숫자와 '-'만 남기고 나머지는 자동으로 제거
    e.target.value = inputValue.replace(/[^0-9\-]/g, "");
  });
});

//언어 버튼
document.querySelectorAll(".lang-bx .front").forEach((front) => {
  front.addEventListener("click", (e) => {
    e.stopPropagation(); // 버블링 방지(선택)
    front.closest(".lang-bx").classList.toggle("is-active");
  });
});

// 바깥 클릭 시 닫고 싶다면 (선택)
document.addEventListener("click", () => {
  document
    .querySelectorAll(".lang-bx.is-active")
    .forEach((bx) => bx.classList.remove("is-active"));
});
