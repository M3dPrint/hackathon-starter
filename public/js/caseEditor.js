var canvas;
var tshirts = new Array(); //prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var line1;
var line2;
var line3;
var line4;
function applyFilter(index, filter) {
    // var obj = canvas.getActiveObject();
    // obj.filters[index] = filter;
    // var timeStart = +new Date();
    // obj.applyFilters();
    // var timeEnd = +new Date();
    // var dimString = canvas.getActiveObject().width + ' x ' +
    //     canvas.getActiveObject().height;
    // $('bench').innerHTML = dimString + 'px ' +
    //     parseFloat(timeEnd-timeStart) + 'ms';
    // canvas.renderAll();
}
 	$(document).ready(function() {



        $("form#data").submit(function(event){

            event.preventDefault();

            var url  = 'http://localhost:8080/upload';
            var image_file = $('#image_file').get(0).files[0];

            var formData = new FormData();
            formData.append("file", image_file);
            console.log(image_file)

            $.ajax(
                {
                    url: url,
                    type: 'POST',
                    data: formData,
//                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (status) {
                        console.log(arguments)
                        // do something on success
                    }
                }).done(function (){
                console.log(arguments)

                $("#imgid").after("<img class='imgclass'   class='new-image' src=/uploads/"+ arguments[0].file+">");
            } );
            return false;
        });

        //setup front side canvas
        canvas = new fabric.Canvas('tcanvas', {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue'
        });
        canvas.on({
            'object:moving': function (e) {
                e.target.opacity = 0.5;
            },
            'object:modified': function (e) {
                e.target.opacity = 1;
            },
            'object:selected': onObjectSelected,
            'selection:cleared': onSelectedCleared
        });
        // piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
        canvas.findTarget = (function (originalFn) {
            return function () {
                var target = originalFn.apply(this, arguments);
                if (target) {
                    if (this._hoveredTarget !== target) {
                        canvas.fire('object:over', {target: target});
                        if (this._hoveredTarget) {
                            canvas.fire('object:out', {target: this._hoveredTarget});
                        }
                        this._hoveredTarget = target;
                    }
                }
                else if (this._hoveredTarget) {
                    canvas.fire('object:out', {target: this._hoveredTarget});
                    this._hoveredTarget = null;
                }
                return target;
            };
        })(canvas.findTarget);

        canvas.on('object:over', function (e) {
            //e.target.setFill('red');
            //canvas.renderAll();
        });

        canvas.on('object:out', function (e) {
            //e.target.setFill('green');
            //canvas.renderAll();
        });

        document.getElementById('add-text').onclick = function () {
            var text = $("#text-string").val();
            var textSample = new fabric.Text(text, {
                left: fabric.util.getRandomInt(0, 200),
                top: fabric.util.getRandomInt(0, 400),
                fontFamily: 'helvetica',
                angle: 0,
                fill: '#000000',
                scaleX: 0.5,
                scaleY: 0.5,
                fontWeight: '',
                hasRotatingPoint: true
            });
            canvas.add(textSample);
            canvas.item(canvas.item.length - 1).hasRotatingPoint = true;
            $("#texteditor").css('display', 'block');
            $("#imageeditor").css('display', 'block');
        };
        $("#text-string").keyup(function () {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.text = this.value;
                canvas.renderAll();
            }
        });

        $("#phoneTypes").change(function (e) {
            debugger;
            if ($(this).val() == "1") {
                // $("#phoneDiv").css('height', '590');
                // $("#phone")[0].src = "/img/phones/iphone5A.png";
                //$("#borderMask")[0].src = "/img/phones/iphone5Mask.png";
                line1 = new fabric.Line([0, 0, 225, 0], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line2 = new fabric.Line([224, 0, 225, 450], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line3 = new fabric.Line([0, 0, 0, 450], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line4 = new fabric.Line([0, 450, 225, 449], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
            }
            else if ($(this).val() == "2") {
                $("#phoneDiv").css('height', '540');
                $("#phone")[0].src = "/img/phones/iPhone4A.png";
                //$("#borderMask")[0].src = "/img/phones/iphone4Mask.png";
                line1 = new fabric.Line([0, 20, 220, 20], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line2 = new fabric.Line([220, 20, 220, 420], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line3 = new fabric.Line([0, 20, 0, 420], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line4 = new fabric.Line([0, 420, 220, 420], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
            }
            else if ($(this).val() == "3") {
                $("#phoneDiv").css('height', '535');
                $("#phone")[0].src = "/img/phones/GalaxyS3A.png";
                //$("#borderMask")[0].src = "/img/phones/GalaxyS3Mask.png";
                line1 = new fabric.Line([0, 30, 225, 30], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line2 = new fabric.Line([224, 30, 225, 400], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line3 = new fabric.Line([0, 30, 0, 400], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
                line4 = new fabric.Line([0, 400, 225, 400], {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    hasBorders: false,
                    hasControls: false,
                    hasRotatingPoint: false,
                    selectable: false
                });
            }
        });

        line1 = new fabric.Line([0, 0, 225, 0], {
            "stroke": "#000000",
            "strokeWidth": 1,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            selectable: false
        });
        line2 = new fabric.Line([224, 0, 225, 450], {
            "stroke": "#000000",
            "strokeWidth": 1,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            selectable: false
        });
        line3 = new fabric.Line([0, 0, 0, 450], {
            "stroke": "#000000",
            "strokeWidth": 1,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            selectable: false
        });
        line4 = new fabric.Line([0, 450, 225, 449], {
            "stroke": "#000000",
            "strokeWidth": 1,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            selectable: false
        });

        $(".img-polaroid").click(function (e) {
            var el = e.target;
            var design = $(this).attr("src");
            $('#phoneDiv').css({
                'backgroundImage': 'url(' + design + ')',
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'top center',
                'background-size': '100% 100%'

            });
            //  document.getElementById("phoneDiv").style.backgroundImage="url("+ design +")";
        });

        // canvas.setBackgroundImage('/img/phones/iPhone5A.png', {
        //     backgroundImageOpacity: 0.5,
        //     backgroundImageStretch: false,
        //     backgroundRepeat: 'no-repeat',
        //     backgroundPosition: 'top center',
        //     backgroundsize: '100% 100%',
        //     setHeight:window.innerHeight,
        //     setWidth: window.innerWidth
        // });
        // canvas.renderAll();

        var t
        fabric.Image.fromURL('/img/phones/iPhone5A700x1470.png', function(img) {
            // img.set('left', 1024/2).set('top', 600/2).set('zindex', 10);
            img.set({
                left: canvas.getWidth() / 2, top: canvas.getHeight() / 2,
                // scaleX: canvas.getWidth() / img.width,
                // scaleY: canvas.getHeight() / img.height,
                zIndex:1,

                //backgroundColor : "#fff"

            })
            img.selectable = false;
            canvas.add(img).bringToFront(img);
            canvas.renderAll();
            t=img;


        });
        // canvas.lockMovementX = canvas.lockMovementY = true;






        // $("div.input-append").on('click','inputname="image_file[]"',function(e){
        $("#imgparent").on("click", "img.imgclass", function (e) {
            var el = e.target;
            var design = $(this).attr("src");
           console.log("working something");
           fabric.Image.fromURL(design, function (myImg) {
                // //i create an extra var for to change some image properties
                 var myImg = myImg.set({
                     left: canvas.getWidth() / 2, top: canvas.getHeight() / 2,
                     scaleX: canvas.getWidth() / myImg.width,
                     scaleY: canvas.getHeight() / myImg.height
                     //     // originX: 'left',
                     //     // foriginY: 'top'
                     //     width: canvas.getWidth(),
                     //     height: canvas.getHeight(),
                     //
                     //     scaleX : canvas.getWidth()/myImg.width, //new update
                     //     scaleY: canvas.getHeight()/myImg.height, //new update
                     //     originY: 'top'
                     });
                     // canvas.setBackgroundImage(myImg, canvas.renderAll.bind(canvas));
               canvas.add(myImg);

                       myImg.filters.push(new fabric.Image.filters.Grayscale());
                      // myImg.filters.push(new fabric.Image.filters.toBlackWhite());
                // // myImg.scaleToWidth(canvas.getWidth());
                // //myImg.setWidth(1000);
                // // myImg.setHeight(100);

                myImg.applyFilters();
                myImg.applyFilters(canvas.renderAll.bind(canvas));
                canvas.add(myImg)
                canvas.bringToFront(t);

                canvas.renderAll();
                // canvas.isDrawingMode = true;
                // canvas.freeDrawingCursor = 'crosshair';
                setTimeout(function() {
                //     // #2
                //     console.info('Look at the cursor and try to move mouse now.');
                //     canvas.freeDrawingCursor = 'default';
                //     canvas.setCursor(canvas.freeDrawingCursor)

                    // canvas.add(new fabric.Line([50, 100, 200, 200], {
                    //     left: 170,
                    //     top: 150,
                    //     stroke: 'red'
                    // }));
                canvas.renderAll()
                }, 3000)
                canvas.renderAll();
                });
            });

        $('#png').on('click', function (e) {
            canvas.renderAll();

            var cvas = document.getElementById('tcanvas');
               cvas.toBlob(function (blob) {
                var form = new FormData(),
                    request = new XMLHttpRequest();
                form.append("file", blob, "filename.png");
                request.open("POST", "/uploadFinal", true);
                request.send(form);
            }, "image/png");
    });


        // $('#prev').on('click', function (e) {
        //     canvas.renderAll();
        //
        //     // var cvas = document.getElementById('tcanvas');
        //     // cvas.toBlob(function (blob) {
        //     //     var form = new FormData(),
        //     //         request = new XMLHttpRequest();
        //     //     form.append("file", blob, "filename.png");
        //     //     request.open("POST", "/uploadFinal", true);
        //     //     request.send(form);
        //     // }, "image/png");
        // });




        document.getElementById('remove-selected').onclick = function () {
                var activeObject = canvas.getActiveObject(),
                    activeGroup = canvas.getActiveGroup();
                if (activeObject) {
                    canvas.remove(activeObject);
                    $("#text-string").val("");
                }
                else if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function (object) {
                        canvas.remove(object);
                    });
                }
            };
            document.getElementById('bring-to-front').onclick = function () {
                var activeObject = canvas.getActiveObject(),
                    activeGroup = canvas.getActiveGroup();
                if (activeObject) {
                    activeObject.bringToFront();
                }
                else if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function (object) {
                        object.bringToFront();
                    });
                }
            };
            document.getElementById('send-to-back').onclick = function () {
                var activeObject = canvas.getActiveObject(),
                    activeGroup = canvas.getActiveGroup();
                if (activeObject) {
                    activeObject.sendToBack();
                }
                else if (activeGroup) {
                    var objectsInGroup = activeGroup.getObjects();
                    canvas.discardActiveGroup();
                    objectsInGroup.forEach(function (object) {
                        object.sendToBack();
                    });
                }
            };


            $("#text-bold").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
                    canvas.renderAll();
                }
            });
            $("#text-italic").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
                    canvas.renderAll();
                }
            });
            $("#text-strike").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
                    canvas.renderAll();
                }
            });
            $("#text-underline").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
                    canvas.renderAll();
                }
            });
            $("#text-left").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.textAlign = 'left';
                    canvas.renderAll();
                }
            });
            $("#text-center").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.textAlign = 'center';
                    canvas.renderAll();
                }
            });
            $("#text-right").click(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.textAlign = 'right';
                    canvas.renderAll();
                }
            });
            $("#font-family").change(function () {
                var activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'text') {
                    activeObject.fontFamily = this.value;
                    canvas.renderAll();
                }
            });
            $('#text-bgcolor').miniColors({
                change: function (hex, rgb) {
                    var activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'text') {
                        activeObject.backgroundColor = this.value;
                        canvas.renderAll();
                    }
                },
                open: function (hex, rgb) {
                    //
                },
                close: function (hex, rgb) {
                    //
                }
            });
            $('#text-fontcolor').miniColors({
                change: function (hex, rgb) {
                    var activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'text') {
                        activeObject.fill = this.value;
                        canvas.renderAll();
                    }
                },
                open: function (hex, rgb) {
                    //
                },
                close: function (hex, rgb) {
                    //
                }
            });

            $('#text-strokecolor').miniColors({
                change: function (hex, rgb) {
                    var activeObject = canvas.getActiveObject();
                    if (activeObject && activeObject.type === 'text') {
                        activeObject.strokeStyle = this.value;
                        canvas.renderAll();
                    }
                },
                open: function (hex, rgb) {
                    //
                },
                close: function (hex, rgb) {
                    //
                }
            });

        // canvas.add(new fabric.fabric.Object({hasBorders:true,hasControls:false,hasRotatingPoint:false,selectable:false,type:'rect'}));

        $("#drawingArea").hover(
            function () {
                canvas.add(line1);
                canvas.add(line2);
                canvas.add(line3);
                canvas.add(line4);
                canvas.renderAll();
            },
            function () {
                canvas.remove(line1);
                canvas.remove(line2);
                canvas.remove(line3);
                canvas.remove(line4);
                canvas.renderAll();
            }
        );
            $('.color-preview').click(function () {
                var color = $(this).css("background-color");
                document.getElementById("phoneDiv").style.backgroundColor = color;
            });

            $(".clearfix button,a").tooltip();
        });//doc ready


        function getRandomNum(min, max) {
            return Math.random() * (max - min) + min;
        }

        function onObjectSelected(e) {
            var selectedObject = e.target;
            $("#text-string").val("");
            selectedObject.hasRotatingPoint = true
            if (selectedObject && selectedObject.type === 'text') {
                //display text editor
                $("#texteditor").css('display', 'block');
                $("#text-string").val(selectedObject.getText());
                $('#text-fontcolor').miniColors('value', selectedObject.fill);
                $('#text-strokecolor').miniColors('value', selectedObject.strokeStyle);
                $("#imageeditor").css('display', 'block');
            }
            else if (selectedObject && selectedObject.type === 'image') {
                //display image editor
                $("#texteditor").css('display', 'none');
                $("#imageeditor").css('display', 'block');
            }
        }

        function onSelectedCleared(e) {
            $("#texteditor").css('display', 'none');
            $("#text-string").val("");
            $("#imageeditor").css('display', 'none');
        }

        function setFont(font) {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.fontFamily = font;
                canvas.renderAll();
            }
        }

        function removeWhite() {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'image') {
                activeObject.filters[2] = new fabric.Image.filters.RemoveWhite({hreshold: 100, distance: 10});//0-255, 0-255
                activeObject.applyFilters(canvas.renderAll.bind(canvas));
            }
        }



//             function b64toBlob(b64Data, contentType, sliceSize) {
//                 contentType = contentType || '';
//                 sliceSize = sliceSize || 512;
//
//                 var byteCharacters = atob(b64Data);
//                 var byteArrays = [];
//
//                 for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//                     var slice = byteCharacters.slice(offset, offset + sliceSize);
//
//                     var byteNumbers = new Array(slice.length);
//                     for (var i = 0; i < slice.length; i++) {
//                         byteNumbers[i] = slice.charCodeAt(i);
//                     }
//
//                     var byteArray = new Uint8Array(byteNumbers);
//
//                     byteArrays.push(byteArray);
//                 }
//
//                 var blob = new Blob(byteArrays, {type: contentType});
//                 return blob;
//             }
//
//
//
//
//             // console.log(canvas.toDataURL());
//             var data = canvas.toDataURL();
//
//             var form = document.getElementById("wtf");
//
//
//             var block = data.split(";");
// // Get the content type of the image
//             var contentType = block[0].split(":")[1];// In this case "image/gif"
// // get the real base64 content of the file
//             var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
//
// // Convert it to a blob to upload
//             var blob = b64toBlob(realData, contentType);
//
// // Create a FormData and append the file with "image" as parameter name
//             var formDataToUpload = new FormData(form);
//             formDataToUpload.append("image", blob);
//
// console.log(formDataToUpload)
//             // var base64Data = req.body.replace(/^data:image\/png;base64,/, "");
//             //
//             // require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
//             //     console.log(err);
//             // });
//
//             // var blob = dataURItoBlob(data);
//             // // var fd = new FormData(blob);
//             // var form = document.getElementById("myAwesomeForm");
//             // var formDataToUpload = new FormData(form);
//             // formDataToUpload.append("image", blob);
//             $.ajax({
//                 url:"/uploadFinal",
//                 data: formDataToUpload,// Add as Data the Previously create formData
//                 type:"POST",
//                 // contentType:false,
//                 processData:false,
//                 // cache:false,
//                 // dataType:"json", // Change this according to your response from the server.
//                 error:function(err){
//                     console.error(err);
//                 },
//                 success:function(data){
//                     console.log(data);
//                 },
//                 complete:function(){
//                     console.log("Request finished.");
//                 }
//             });
