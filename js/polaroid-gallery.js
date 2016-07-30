var polaroidGallery = (function () {
    function polaroidGallery(elements) {
        elements = [].slice.call(elements);
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

            item.style.WebkitTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg)';
            item.style.msTransform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg)';
            item.style.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + rotRandomD + 'deg)';

        });
    }

    return polaroidGallery;
})();