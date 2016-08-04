var polaroidGallery = (function () {
    var dataSize = [];
    var currentIndex = -1;
    var navbarHeight = 60;
    var resizeTimeout = null;
    var xmlhttp = new XMLHttpRequest();
    var url = "data/data.json";

    function polaroidGallery() {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                setGallery(myArr);

                init();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }

    function setGallery(arr) {
        var out = "";
        var i;
        for (i = 0; i < arr.length; i++) {

            out += '<figure id="fig' + i + '">' +
                '<img src="img/' + arr[i].name + '" alt="' + arr[i].name + '"/>' +
                '<figcaption>' + arr[i].caption + '</figcaption>' +
                '</figure>';
        }
        document.getElementById("gallery").innerHTML = out;
    }

    function init() {
        navbarHeight = document.getElementById("nav").offsetHeight;
        var elements = [].slice.call(document.getElementsByTagName('figure'));
        elements.forEach(function (item) {
            dataSize.push({width: item.offsetWidth, height: item.offsetHeight});

            item.addEventListener('click', function () {
                shuffle(elements);

                var index = Number((item.id).replace('fig', ''));
                select(index);
            })
        });

        shuffle(elements);
        navigation(elements);

        window.addEventListener('resize', function () {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function () {
                shuffle(elements);
                if (currentIndex > 0) {
                    select(currentIndex);
                }
            }, 100);
        })
    }

    function select(index) {
        var item = document.getElementById('fig' + index);
        var scale = 1.8;
        var rotRandomD = 0;

        var newWidth = (dataSize[index].width * scale);
        var newHeight = dataSize[index].height * (newWidth / dataSize[index].width);

        var x = (window.innerWidth - newWidth) / 2;
        var y = (window.innerHeight - navbarHeight - newHeight) / 2;

        item.style.transformOrigin = '0 0';
        item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        item.style.zIndex = 999;

        currentIndex = index;
    }

    function shuffle(elements) {
        var zIndex = 1;
        elements.forEach(function (item) {
            var randomX = Math.random();
            var randomY = Math.random();
            var maxR = 45;
            var minR = -45;
            var rotRandomD = Math.random() * (maxR - minR) + minR;
            var rotRandomR = rotRandomD * Math.PI / 180;

            var rotatedW = Math.abs(item.offsetWidth * Math.cos(rotRandomR)) + Math.abs(item.offsetHeight * Math.sin(rotRandomR));
            var rotatedH = Math.abs(item.offsetWidth * Math.sin(rotRandomR)) + Math.abs(item.offsetHeight * Math.cos(rotRandomR));

            var x = Math.floor((window.innerWidth - rotatedW) * randomX);
            var y = Math.floor((window.innerHeight - rotatedH) * randomY);

            item.style.zIndex = zIndex++;
            item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
        })
    }

    function navigation(elements) {
        var lastIndex = dataSize.length - 1;

        var next = document.getElementById('next');
        var preview = document.getElementById('preview');

        next.addEventListener('click', function () {
            shuffle(elements);
            select((currentIndex >= lastIndex) ? 0 : currentIndex + 1);
        });

        preview.addEventListener('click', function () {
            shuffle(elements);
            select((currentIndex <= 0) ? lastIndex : currentIndex - 1);
        })
    }

    return polaroidGallery;
})();