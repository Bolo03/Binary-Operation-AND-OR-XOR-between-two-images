//images: https://dog.ceo/api/breeds/image/random/2
img1 = new Image();
img2 = new Image();

loadImg = document.getElementById("loadImg");
and_op = document.getElementById("and");
or_op = document.getElementById("or");
xor_op = document.getElementById("xor");
download = document.getElementById("download");

//function to load images from the api
loadImg.addEventListener("click", async function () {
  startTime = new Date().getTime(); //start time for the operation

  const response = await fetch("https://dog.ceo/api/breeds/image/random/2");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);

  //getting the canvas elements
  c1 = document.getElementById("canvas1");
  ctx1 = c1.getContext("2d");
  c2 = document.getElementById("canvas2");
  ctx2 = c2.getContext("2d");
  c3 = document.getElementById("canvas3");
  ctx3 = c3.getContext("2d");

  //clear the last canvas for reset
  ctx3.clearRect(0, 0, c3.width, c3.height);

  //setting the canvas size to 500x500px
  c1.width = 500;
  c1.height = 500;
  c2.width = 500;
  c2.height = 500;

  //show images on the canvas
  img1.src = data.message[0];
  img1.crossOrigin = "Anonymous";
  img2.src = data.message[1];
  img2.crossOrigin = "Anonymous";

  img1.onload = function () {
    ctx1.drawImage(
      img1,
      0,
      0,
      img1.width,
      img1.height,
      0,
      0,
      c1.width,
      c1.height
    );
  };
  img2.onload = function () {
    ctx2.drawImage(
      img2,
      0,
      0,
      img2.width,
      img2.height,
      0,
      0,
      c2.width,
      c2.height
    );
  };

  endTime = new Date().getTime(); //end time for the operation
  timeDiff = endTime - startTime;
  //show the time taken for the operation
  document.getElementById("time").innerHTML = timeDiff + " ms";
});

//function to perform bitwise AND operation
and_op.addEventListener("click", function () {
  setTimeout(function () {
    startTime = new Date().getTime(); //start time for the operation

    //getting the result canvas
    c = document.getElementById("canvas3");
    ctx = c.getContext("2d");
    c.width = 500;
    c.height = 500;

    //getting the images data from the canvas
    scannedImg1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    scannedImg2 = ctx2.getImageData(0, 0, c2.width, c2.height);
    img1Data = scannedImg1.data;
    img2Data = scannedImg2.data;

    //performing the bitwise AND operation
    for (let i = 0; i < img1Data.length; i++) {
      img1Data[i] = img1Data[i] & img2Data[i];
    }
    scannedImg1.data.set(img1Data);
    //putting the result on the canvas
    ctx.putImageData(scannedImg1, 0, 0);

    endTime = new Date().getTime(); //end time for the operation
    timeDiff = endTime - startTime;
    //show the time taken for the operation
    document.getElementById("time").innerHTML = timeDiff + " ms";
  }, 500);
});

or_op.addEventListener("click", function () {
  setTimeout(function () {
    startTime = new Date().getTime(); //start time for the operation

    //getting the result canvas
    c = document.getElementById("canvas3");
    ctx = c.getContext("2d");
    c.width = 500;
    c.height = 500;

    //getting the images data from the canvas
    scannedImg1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    scannedImg2 = ctx2.getImageData(0, 0, c2.width, c2.height);
    img1Data = scannedImg1.data;
    img2Data = scannedImg2.data;

    //performing the bitwise OR operation
    for (let i = 0; i < img1Data.length; i++) {
      img1Data[i] = img1Data[i] | img2Data[i];
    }
    scannedImg1.data.set(img1Data);
    //putting the result on the canvas
    ctx.putImageData(scannedImg1, 0, 0);

    endTime = new Date().getTime(); //end time for the operation
    timeDiff = endTime - startTime;
    //show the time taken for the operation
    document.getElementById("time").innerHTML = timeDiff + " ms";
  }, 500);
});

xor_op.addEventListener("click", function () {
  setTimeout(function () {
    startTime = new Date().getTime(); //start time for the operation

    //getting the result canvas
    c = document.getElementById("canvas3");
    ctx = c.getContext("2d");
    c.width = 500;
    c.height = 500;

    //getting the images data from the canvas
    scannedImg1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    scannedImg2 = ctx2.getImageData(0, 0, c2.width, c2.height);
    img1Data = scannedImg1.data;
    img2Data = scannedImg2.data;

    //performing the bitwise XOR operation
    for (let i = 0; i < img1Data.length; i++) {
      img1Data[i] = img1Data[i] ^ img2Data[i];
      if (i % 4 == 3) img1Data[i] = 255 - img1Data[i];
    }
    scannedImg1.data.set(img1Data);
    //putting the result on the canvas
    ctx.putImageData(scannedImg1, 0, 0);

    endTime = new Date().getTime(); //end time for the operation
    timeDiff = endTime - startTime;
    //show the time taken for the operation
    document.getElementById("time").innerHTML = timeDiff + " ms";
  }, 500);
});

//function to download the result image
download.addEventListener("click", function () {
  setTimeout(function () {
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = c.toDataURL();
    link.click();
    link.delete;
  }, 500);
});
