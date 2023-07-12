function opentab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  document.getElementById("tab"+tabName).className+=" active";
}

function opensubtab(evt, subtabName, group) {
  // Declare all variables
  var i, subtabcontent, subtablinks;

  // Get all elements with class="subtabcontent" and hide them
  subtabcontent = document.getElementsByClassName("subtab"+group+"content");
  for (let i = 0; i < subtabcontent.length; i++) {
    subtabcontent[i].style.display = "none";
  }

  // Get all elements with class="subtablinks" and remove the class "active"
  subtablinks = document.getElementsByClassName("subtab"+group+"links");
  for (let i = 0; i < subtablinks.length; i++) {
    subtablinks[i].className = subtablinks[i].className.replace(" active", "");
  }

  // Show the current subtab, and add an "active" class to the button that opened the subtab
  document.getElementById(subtabName).style.display = "block";
  document.getElementById("subtab"+subtabName).className+=" active";
}


//initialise tabs/subtabs
function init(){
  opentab(event,'fusion');
  opensubtab(event,'essencetab',1);
  opensubtab(event,'researchupgrades',2);
}