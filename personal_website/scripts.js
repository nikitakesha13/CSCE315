var element = document.documentElement;
var num = 0;

var theme = localStorage.getItem('theme');
var check = document.getElementById('darkSwitch');
console.log(theme);
if (theme == null){
    localStorage.setItem('theme', 'light');
    theme = 'light';
    console.log(theme);
}
if (theme == 'dark'){
    console.log('change theme');
    if (check){
        check.checked = true;
    }
    element.classList.toggle("dark-mode");
    document.querySelectorAll('.inverted').forEach((result) => {
        result.classList.toggle('invert');
    })
}

function darkSwitch() {
    if (theme == 'light'){
        localStorage.setItem('theme', 'dark');
        theme = 'dark';
        console.log(theme);
        console.log("this is the line");
    }
    else {
        localStorage.setItem('theme', 'light');
        theme = 'light';
        console.log(theme);
        console.log("no no no");
    }
    element.classList.toggle("dark-mode");
    document.querySelectorAll('.inverted').forEach((result) => {
        result.classList.toggle('invert');
    })
}

var pagesize;
var size = localStorage.getItem('pageSize');
console.log(size);
if (size == null){
    size = '1.0';
    console.log(size);
}
else {
    console.log("Resizing is called");
    element.style.transform = "scale("+size+")";
    element.style.transformOrigin = "0 0";
}

function zoomIn(){
    console.log("zoomIn is called");
    pagesize = parseFloat(size) + 0.05;
    console.log(pagesize)
    size = pagesize.toString();
    console.log(size);
    localStorage.setItem('pageSize', size);
    element.style.transform = "scale("+pagesize+")";
    element.style.transformOrigin = "0 0";
}

function zoomOut(){
    console.log("zoomOut is called");
    pagesize = parseFloat(size) - 0.05;
    console.log(pagesize)
    size = pagesize.toString();
    console.log(size);
    localStorage.setItem('pageSize', size);
    element.style.transform = "scale("+pagesize+")";
    element.style.transformOrigin = "0 0";
}

var color = localStorage.getItem('color');
console.log(color);
if (color != 'info' && color != null){
    color_change(color);
}
function color_change(x){
    document.getElementById("NavColor").className = "navbar navbar-expand-lg navbar-light bg-" + x;
    if (document.getElementById("color_change6")){
        document.getElementById("color_change6").className = "container p-3 text-uppercase text-center border-right border-left border-" + x;
    }
    if (document.getElementById("color_change7")){
        document.getElementById("color_change7").className = "container pt-5 border-right border-left border-" + x;
    }
    if (document.getElementById("footer")){
        console.log("Footer color is", x);
        document.getElementById("footer").className = "bg-" + x;
    }
    localStorage.setItem('color', x);
}
