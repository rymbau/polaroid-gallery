# polaroid-gallery

Javascript/CSS Polaroid Gallery - no dependencies

## Demo

http://polaroid.glicer.com/

## Usage

Add the JavaScript to the end of your document:

```javascript
<script type="text/javascript" src="js/polaroid-gallery.js"></script>
<script>
    window.onload = function () {
        new polaroidGallery();
    }
</script>
```

### Configuration

Configure images to display in data/data.json file.

Example:

```json
[
{
"name": "img01.jpg", 
"caption": "En voiture"
},
{
"name": "img02.jpg",
"caption": "Amis"
}
]
```

## License 

MIT

## Contact

Authors : Rym BOUCHAGOUR & Emmanuel ROECKER

Web Development Blog - http://dev.glicer.com