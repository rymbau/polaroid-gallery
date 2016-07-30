var polaroidGallery = (function () {
    function polaroidGallery(elements) {
        elements = [].slice.call(elements);
        var dataSize = [];
        elements.forEach(function (item) {
            dataSize.push({width: item.offsetWidth, height: item.offsetHeight});

            item.addEventListener('click', function () {
                shuffle(elements);

                var idx = (item.id).replace('fig', '') - 1;
                var scale = 1.8;
                var rotRandomD = 0;

                var newWidth = (dataSize[idx].width * scale);
                var newHeight = dataSize[idx].height * (newWidth / dataSize[idx].width);
                
                var x = (window.innerWidth - newWidth) / 2;
                var y = (window.innerHeight - newHeight) / 2;

                item.style.transformOrigin  = '0 0';
                item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
                item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
                item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(' + scale + ',' + scale + ')';
                item.style.zIndex = 999;
            })

        });
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

            item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg) scale(1)';
            item.style.zIndex = zIndex++;
        })
    }

    return polaroidGallery;
})();