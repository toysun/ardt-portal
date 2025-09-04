 
           var modal = document.getElementById("myModal");
           var Save = document.getElementById("save");
           var Capture = document.getElementById("capture");
      
           var W;
           var H;

           window.onload = function() {
             
             document
               .querySelector(".capturebtn")
               .addEventListener("click", function() {
                 let aScene = document
                   .querySelector("a-scene")
                   .components.screenshot.getCanvas("perspective");
         
               
                 let frame = captureVideoFrame("video", "png");
                 aScene = resizeCanvas(aScene, frame.width, frame.height); 
               
                 W = frame.width;
                 H = frame.height;
               
                 frame = frame.dataUri;
 
                 mergeImages([frame, aScene]).then(b64 => {
                   var modalImg = document.getElementById("img01");
                   var captionText = document.getElementById("caption");

                   modalImg.width = W;
                   modalImg.height = H;
                   
                   modal.style.display = "block";
                   modalImg.src = b64;

                   var span = document.getElementsByClassName("closebtn")[0];

                   span.onclick = function() {
                     modal.style.display = "none";
                     Save.style.display = "none";
                     Capture.style.display = "inline-block";
                   };

                   var DownBtn = document.getElementsByClassName("savebtn")[0];

                   DownBtn.onclick = function() {
                     var link = document.createElement("a");

         document.body.appendChild(link); // for Firefox

         link.setAttribute("href", modalImg.src);            
         link.setAttribute("download", "wonder-ticket");
         link.setAttribute("method", "get");
         link.click();
         };


                 });

                 var capture = document.getElementById("capture");
                 var save = document.getElementById("save");

                 capture.style.display = "none";
                 save.style.display = "inline-block";
               });
           };

           function resizeCanvas(origCanvas, width, height) {
             let resizedCanvas = document.createElement("canvas");
             let resizedContext = resizedCanvas.getContext("2d");
             
            
            resizedCanvas.height = height;
            resizedCanvas.width = width; 
            var TempHeight = height;
               
            resizedContext.drawImage(origCanvas, 0, 0, resizedCanvas.width, TempHeight); 
            return resizedCanvas.toDataURL();
       }      


           function captureVideoFrame(video, format, width, height) {
             if (typeof video === "string") {
               video = document.querySelector(video);
             }

             format = format || "jpeg";

             if (!video || (format !== "png" && format !== "jpeg")) {
               return false;
             }

             var canvas = document.createElement("CANVAS");

             canvas.width = width || video.videoWidth;
             canvas.height = height || video.videoHeight;
             canvas.getContext("2d").drawImage(video, 0, 0);
             
         
             var dataUri = canvas.toDataURL("image/" + format);
             var data = dataUri.split(",")[1];
             var mimeType = dataUri.split(";")[0].slice(5);

             var bytes = window.atob(data);
             var buf = new ArrayBuffer(bytes.length);
             var arr = new Uint8Array(buf);

             for (var i = 0; i < bytes.length; i++) {
               arr[i] = bytes.charCodeAt(i);
             }

             var blob = new Blob([arr], { type: mimeType });
          
             return {
               blob: blob,
               dataUri: dataUri,
               format: format,
               width: canvas.width,
               height: canvas.height
             };
           }
  