var numbersArray = [1, 2, 3, 4];

//metoda Fisher-Yates
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

jQuery('.mosaic').mouseenter(
    function () {
        shuffleArray(numbersArray);
        jQuery('.box-1').css('background', 'url(../img/' + numbersArray[0] + 'kw.jpg)')
            .css ('background-size', 'cover');
        jQuery('.box-2').css('background', 'url(../img/' + numbersArray[1] + 'kw.jpg)')
            .css ('background-size', 'cover');
        jQuery('.box-3').css('background', 'url(../img/' + numbersArray[2] + 'kw.jpg)')
            .css ('background-size', 'cover');
        jQuery('.box-4').css('background', 'url(../img/' + numbersArray[3] + 'kw.jpg)')
            .css ('background-size', 'cover');
    }
);

//-------------  CSS DO TEGO

// MOSAIC WITH ANIMATION

.content {
  position: relative;
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
}

.png-box {
  position: relative;
  z-index: 100;
  display: block;
}

.clear {
  clear: both;
}

.col-1, .col-2, .col-3 {
  height: 100%;
  float: left;
}

.mosaic {
  z-index: 30;
  position: relative;
}

.box-1, .box-2, .box-3, .box-4 {
  position: relative;
  height: 37%;
  width: fit-content;
  transition: 500ms;
  -webkit-transition: 500ms
}

.box-1 {
  background: url("../../img/2kw.jpg");
  background-size: cover;
  top: 9%;
}

.box-2 {
  top: 18%;
  height: 40%;
  background: url("../../img/3kw.jpg");
  background-size: cover;
  margin: 0 15px;
}

.png-box {
  height: 100%;
}

.box-3 {
  background: url("../../img/4kw.jpg");
  background-size: cover;
  height: 30%;
  top: 9%;
}

.box-4 {
  height: 40%;
  background: url("../../img/1kw.jpg");
  background-size: cover;
  margin-top: 15px;
  top: 9%;
}

// ---------- HTML 

            <div class="content">
                <div class="col-1">
                    <div class="box-1 mosaic">
                        <img src="<?php echo $variables['img'] ?>png-box.png" class="png-box">
                    </div>
                </div>

                <div class="col-2">
                    <div class="box-2 mosaic">
                        <img src="<?php echo $variables['img'] ?>png-box.png" class="png-box">
                    </div>
                </div>

                <div class="col-3">
                    <div class="box-3 mosaic">
                        <img src="<?php echo $variables['img'] ?>png-box.png" class="png-box">
                    </div>

                    <div class="box-4 mosaic">
                        <img src="<?php echo $variables['img'] ?>png-box.png" class="png-box">
                    </div>
                </div>
                <div class="clear"></div>
            </div>
