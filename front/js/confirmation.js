let targetInnerHtml = document.getElementById('orderId');
let orderId = window.location.search.split('?orderId=').join("");
targetInnerHtml.innerHTML = orderId