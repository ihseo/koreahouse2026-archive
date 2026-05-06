// 복사버튼
function copyToClipboard(className) {
  var copyElement = document.getElementsByClassName(className),
      tempElement = document.createElement('textarea');
  
  tempElement.value = copyElement[0].tagName === "STYLE" ? copyElement[0].innerHTML : copyElement[0].outerHTML;
  document.body.appendChild(tempElement);
  
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
}


// 복사버튼
function copyToCode(className) {
  var copyElement = document.getElementsByClassName(className),
    tempElement = document.createElement('textarea');
  
  tempElement.value = copyElement[0].tagName === "CODE" ? copyElement[0].innerHTML : copyElement[0].outerHTML;
  tempElement.value = String(tempElement.value).replaceAll('&lt;','<');
  tempElement.value = String(tempElement.value).replaceAll('&gt;','>');
  tempElement.value = String(tempElement.value).replaceAll('&emsp;','');
  tempElement.value = String(tempElement.value).replaceAll('<br>','');
  
  document.body.appendChild(tempElement);
  
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
  
  alert('복사되었습니다.\nCTRL + V 로 붙여넣기 해주세요.');
}
