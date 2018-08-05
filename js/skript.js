function keyEventLisnter() {
  var container = document.getElementById("whiteContainer");
  var searchInput = document.getElementById("myInput");
  if (searchInput.value == "" || searchInput.value == null) {
      container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }
}


function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}


var words = ["apple","avant","absent","arrangement","activate","angle","attract","acceptable","account","afford","bullet","bless","bench","bear","blind","banana","blade","biscuit","butterfly","broccoli","center","charm","cry","comedy","chimney","corruption","comprehensive","colony","communist","captain","depression","dominant","default","definition","decide","drama","destruction","danger","distinct","despair","experienced","environment","emphasis","election","edition","exceed","encourage","evening","earthquake","excess","favourite","flexible","fortune","finished","file","family","final","foreigner","familiar","follow","green","gear","governor","gold","gain","gradient","glory","glance","glow","grass","harbor","hang","headquarters","hide","horn","haircut","hostile","harmony","have","hypothesis","incident","interactive","inject","innovation","issue","install","ivory","impact","inflate","ignite","job","jacket","jet","jungle","joystick","joke","jewel","jaw","judge","judicial","keep","knife","killer","knot","kettle","knit","kid","knee","kneel","kidney","lounge","learn","lodge","line","linear","leg","liver","lot","limited","level","mess","manufacturer","message","monkey","mention","museum","miss","mechanical","misery","mug","navy","nomination","nose","novel","negligence","nursery","need","necklace","nonsense","nail","outer","outside","operation","outlook","original","ostracize","overcharge","obstacle","overlook","outfit","poetry","piano","paradox","please","persist","prisoner","position","perfect","poor","proof","quarrel","quarter","quest","qualification","queue","question","quit","queen","qualify","quantity","rumor","reinforce","revive","regular","resource","rebel","relief","road","record","ranch","scatter","strain","spin","seminar","studio","stool","stunning","season","scandal","soar","tablet","thrust","thesis","turkey","toss","thin","transform","trouser","trustee","tile","urgency","understanding","unaware","unlikely","undertake","utter","uncle","uniform","unique","unfair","violation","vote","vision","venture","vain","victory","vacuum","vessel","veteran","vehicle","withdrawal","wind","waste","wardrobe","wreck","wheat","wagon","wall","wear","watch","xerox","xenon","xylograph","xylophone","xenogamy","xyster","xebec","xylanthrax","xenia","xiaomi","young","yard","year","youth","yearn","yahoo","yandex","yards","yarrow","yeah","zip","zigzag","zone","zero","zoom","zoological","zealous ","zeal","zebra","zenit"];


autocomplete(document.getElementById("myInput"), words);
