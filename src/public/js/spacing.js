function myFunction() {
  var x = document.getElementsByClassName("description_article");
  // var x = document.getElementsByTagName("P");

  for (var i = 0; i < x.length; i++) {
    var str = x[i].innerHTML;
    var res = str.replace(/\n/g, "<br/>");

    x[i].innerHTML = res;
  }
}
