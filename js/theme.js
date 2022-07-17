function setTheme(themeName) {
  console.log(themeName);
  localStorage.setItem("theme", themeName);
  document.querySelector("body").className = themeName;
}

function toogleTheme() {
  if (localStorage.getItem("theme") === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

(function () {
  if (localStorage.getItem("theme") === "dark") {
    setTheme("dark");
    document.getElementById("slider").checked = true;
  } else {
    setTheme("light");
    document.getElementById("slider").checked = false;
  }
})();
