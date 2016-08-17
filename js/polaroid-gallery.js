var polaroidGallery = (function () {
    var dataSize = {};
    var dataLength = 0;
    var currentData = null;
    var navbarHeight = 60;
    var resizeTimeout = null;
    var xmlhttp = new XMLHttpRequest();

    function polaroidGallery(url) {
        observe();
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
            out += '<figure id="' + i + '">' +
                '<img src="' + arr[i].name + '" alt="' + arr[i].name + '"/>' +
                '<figcaption>' + arr[i].caption + '</figcaption>' +
                '</figure>';
        }
        document.getElementById("gallery").innerHTML = out;
    }

    function observe() {
        var observeDOM = (function () {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
                eventListenerSupported = window.addEventListener;

            return function (obj, callback) {
                if (MutationObserver) {
                    var obs = new MutationObserver(function (mutations, observer) {
                        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                        callback(mutations);
                    });

                    obs.observe(obj, { childList: true, subtree: false });
                }
                else if (eventListenerSupported) {
                    obj.addEventListener('DOMNodeInserted', callback, false);
                }
            }
        })();

        observeDOM(document.getElementById('gallery'), function (mutations) {
            var gallery = [].slice.call(mutations[0].addedNodes);
            gallery.forEach(function (item) {
                var img = item.getElementsByTagName('img')[0];
                var first = true;
                img.addEventListener('load', function () {              
                    dataSize[item.id] = {item: item, width: item.offsetWidth, height: item.offsetHeight};

                    if (first) {
                        currentData = dataSize[item.id];
                        first = false;
                    }

                    dataLength++;

                    item.addEventListener('click', function () {
                        select(dataSize[item.id]);
                        shuffleAll();
                    });

                    shuffle(dataSize[item.id]);
                })
            });
        });
    }

    function init() {
        navbarHeight = document.getElementById("nav").offsetHeight;
        navigation();

        window.addEventListener('resize', function () {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(function () {
                shuffleAll();
                if (currentData) {
                    select(currentData);
                }
            }, 100);
        });
    }

    function select(data) {
        var scale = 1.8;
        var rotRandomD = 0;

        var initWidth = data.width;
        var initHeight = data.height;

        var newWidth = (initWidth * scale);
        var newHeight = initHeight * (newWidth / initWidth);

        var x = (window.innerWidth - newWidth) / 2;
        var y = (window.innerHeight - navbarHeight - newHeight) / 2;

        data.item.style.transformOrigin = '0 0';
        data.item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        data.item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        data.item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
        data.item.style.zIndex = 999;

        currentData = data;
    }

    function shuffle(data) {
        var randomX = Math.random();
        var randomY = Math.random();
        var maxR = 45;
        var minR = -45;
        var rotRandomD = Math.random() * (maxR - minR) + minR;
        var rotRandomR = rotRandomD * Math.PI / 180;

        var rotatedW = Math.abs(data.width * Math.cos(rotRandomR)) + Math.abs(data.height * Math.sin(rotRandomR));
        var rotatedH = Math.abs(data.width * Math.sin(rotRandomR)) + Math.abs(data.height * Math.cos(rotRandomR));

        var x = Math.floor((window.innerWidth - rotatedW) * randomX);
        var y = Math.floor((window.innerHeight - rotatedH - navbarHeight) * randomY);

        data.item.style.transformOrigin = '50% 50%';
        data.item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
        data.item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
        data.item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
        data.item.style.zIndex = 1;
    }

    function shuffleAll() {
        var zIndex = 0;
        for (var id in dataSize) {
            if (id != currentData.item.id) {
                shuffle(dataSize[id], zIndex++);
            }
        }
    }

    function navigation() {
        var next = document.getElementById('next');
        var preview = document.getElementById('preview');

        next.addEventListener('click', function () {
            var currentIndex = Number(currentData.item.id) + 1;
            if (currentIndex >= dataLength) {
                currentIndex = 0
            }
            select(dataSize[currentIndex]);
            shuffleAll();
        });

        preview.addEventListener('click', function () {
            var currentIndex = Number(currentData.item.id) - 1;
            if (currentIndex < 0) {
                currentIndex = dataLength - 1
            }
            select(dataSize[currentIndex]);
            shuffleAll();
        })
    }

    return polaroidGallery;
})();