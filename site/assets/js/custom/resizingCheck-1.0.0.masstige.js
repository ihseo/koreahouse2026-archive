/*
*
* Resizing Check Plugin version 1.0.0
* Made By Masstige Publishing Team
*
* */

function resizingCheck(object){
  var resizeCheck = true,
      breakpoints = object;

  $(window).on('resize', function(){
    if ( resizeCheck === true ) {
      resizeCheck = false;

      setTimeout(function(){
        for ( var i in breakpoints ) {
          var keyValues = Object.keys(breakpoints[i]), /* Object key값 배열로 저장 */
              windowWidth = $(window).outerWidth(); /* 윈도우 너비 */

          for ( var j=0; j<keyValues.length; j++ ) {
            if ( keyValues[j+1] !== undefined ) { /* 키배열에서 다음 배열값 유무여부 체크 */
              if ( windowWidth > keyValues[j] && windowWidth < keyValues[j+1] ) { /* 다음 배열값이 있는 경우 */
                var values = Object.values(breakpoints); /* 밸류값 배열로 저장 */

                values[0][keyValues[j]](); /* 해당 인덱스의 함수호출 */
              }
            } else { /* 다음 배열값이 없는 경우 */
              if ( windowWidth > keyValues[j] ) {
                var values = Object.values(breakpoints);

                values[0][keyValues[j]](); /* 해당 인덱스의 함수호출 : 마지막 함수 호출과 동일함 */
              }
            }
          }
        }

        resizeCheck = true;
      },500);
    }
  });
}

