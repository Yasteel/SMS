var video;
var canvasElement;
var canvas;
var qrCode;
var scannerElement;
var oldQty;

function add_product()
{
  var productName = $('input.product').val();
  var category = $('.category').val();
  var quantity = $('div.stock_add input.quantity').val();

  if(valid(productName, 'string') && valid(category, 'select') && valid(quantity, 'num'))
  {

    var id = generateProductId(productName, category);
    console.log(id);
    $.post('php/addProduct.php',
    {
      id: id,
      productName: productName,
      category: category,
      quantity: quantity
    },
    function(data)
    {
      if(data == '0')
      {
        showAlert('Product already Exists', 2);
      }
      else if(data == '1')
      {
        showAlert('Record Added Successfully', 1);
        $('div.card.qr_code').addClass('show');
        generateQRCode(id);
        load_table();

      }else if(data == '2')
      {
        showAlert('Something went Wrong :(', 2);
      }
    });
  }
  else
  {
    if(!valid(productName, 'string'))
    {
      $('input.product').addClass('error');
    }

    if(!valid(category, 'select'))
    {
      $('.category').addClass('error');
    }

    if(!valid(quantity, 'num'))
    {
      $('div.stock_add input.quantity').addClass('error');
    }

    showAlert('Fill in Fields Correctly', 2)
  }
}

function load_products()
{
  $.post('php/loadProducts.php',
  function(data)
  {
    $('div.stock_edit select.product').html(data);
  });
}

function load_quantity()
{
  var id = $('div.stock_edit select.product').val();
  $.post('php/loadQuantity.php',{id: id},
  function(data){
    $('div.stock_edit input.quantity').val(data);
    oldQty = data;
  });
}

function edit_product()
{
  var id = $('div.stock_edit select.product').val();
  var quantity = $('div.stock_edit input.quantity').val();
  console.log(oldQty, quantity);

  if(!valid(quantity, 'num'))
  {
    $('div.stock_edit input.quantity').addClass('error');
    showAlert('Fill in Fields Correctly', 2);
  }
  else
  {
    $.post('php/editProduct.php',
    {
      id: id,
      newQty: quantity,
      oldQty: oldQty
    },
    function(data)
    {
      console.log(data);
      if(data == '1')
      {
        showAlert('Record Update Successful', 1);
        load_table();
      }
      else if(data == '2')
      {
        showAlert('Record Update Unsuccessful', 2);
      }
    });
  }
}

function load_table()
{
  var search = $('div.search input').val();
  $.post('php/loadTable.php',
  {
    type: 'bar',
    search: search
  },
  function(data)
  {
    $('div.report table tbody').html(data);
  });
}

function valid(input, type)
{
  if(input == '' || input == ' ')
  {
    return false;
  }
  else
  {
    if(type == 'num')
    {
      if($.isNumeric(input))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(type == 'select')
    {
      if(input == 'default')
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else if(type == 'email')
    {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input))
       {
         return true;
       }
       else
       {
         return false;
       }
    }
    else
    {
      return true;
    }
  }
}

function get_current_date()
{
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var today = days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  return today;
}

function clear()
{
  $('input.error, select.error').removeClass('error');
  $('div.card input').val('');
  $('div.stock_add select').val('default');
}

function open_scan(element)
{
  video = document.createElement("video");
  canvasElement = document.getElementById(element);
  canvas = canvasElement.getContext("2d");
  qrCode;

  navigator.mediaDevices.getUserMedia( { video: {facingMode: 'environment'} } ).then(function(stream){
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(scan);
  });
}

function scan()
{
  if (video.readyState === video.HAVE_ENOUGH_DATA)
  {
    canvasElement.hidden = false;
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert", });
    if (code)
    {
      canvasElement.hidden = true;

      try
      {
        var data = JSON.parse(code.data);
        console.log(data);
        set_product(data);
        killCam();
      }
      catch (e)
      {
        console.log(code.data);
        $('.status_message p').html('Waiting to Scan <span class="timer"><i class="fas fa-hourglass-start"></i></span><br><br>Invalid QR Code');
        setTimeout(function()
        {
          $('.status_message p').html('Waiting to Scan <span class="timer"><i class="fas fa-hourglass-start"></i></span>');

        }, 3000);
      }


    }
  }
  requestAnimationFrame(scan);
}

function killCam(e)
{
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++)
  {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;

  $('div.status_message p').html('Success  <i class="fas fa-check"></i>');
  setTimeout(function(){ $(scannerElement).removeClass('show'); }, 3000);
}

function set_product(obj)
{
  var id = obj.product_id;
  $('div.stock_edit select.product').val(id);

  load_quantity();
}

function generateProductId(productName, category)
{
  category = category.substring(0, 3);
  productName = productName.substring(0, 3);
  var len = category.length + productName.length;
  var rnd = Math.floor(Math.random() * 10);
  return `${category}${productName}${len}${rnd}`;
}

function generateQRCode(productId)
{
  $('.qr_img').attr('src',`http://api.qrserver.com/v1/create-qr-code/?data={"product_id": "${productId}"}&size=300x300`);
}

function showAlert(text, type, stay)
{
  $('div.alert_message p.message').html(text);
  if(type === 1)
  {
    $('div.alert_message').addClass('success');
    $('.message_type_icon').removeClass('fa-times');
    $('.message_type_icon').addClass('fa-check');
  }
  else if(type === 2)
  {
    $('div.alert_message').addClass('fail');
    $('.message_type_icon').addClass('fa-times');
    $('.message_type_icon').removeClass('fa-check');
  }
  $('div.alert_message').addClass('show');

  if(!stay)
  {
    setTimeout(function()
  {
    $('div.alert_message').removeClass('show');
    $('div.alert_message').removeClass('success');
    $('div.alert_message').removeClass('fail');
  }, 3200);
  }
}

function generateReport()
{
  var email = $('.email').val();

  if(!valid(email, 'email'))
  {
    $('input.email').addClass('error');
    showAlert('Invalid Email Address', 2);
  }
  else
  {
    $.post('php/generateReport.php',
    function(data)
    {
      if(data == '1')
      {
        showAlert('Sending Report...', 1, true);
      }
    })
      .done(function()
      {
        var today = get_current_date();
        var subject, filename, filePath;
        fileName = subject = "Stock Report " + today.split(' ')[2] + " " + today.split(' ')[3];
        fileName += ".pdf";
        filePath = "../docs/" + fileName;
        sendMail(email, subject, fileName, filePath);
      });
  }
}

function sendMail(destination, subject, fileName, filePath )
{
  console.log(destination, subject, fileName, filePath);
  $.post('php/email.php',
  {
    emailTo: destination,
    subject: subject,
    fileName: fileName,
    filePath: filePath
  },
  function(data){
    data == '1' ? showAlert('Stock Report Sent', 1) : showAlert('Stock Report Not Sent', 2);
  });
}

//////////////////////////////////////////////////////////////////////////////
//Event Handling

$(document).ready(function()
{
  $('span.date').html(get_current_date());

  $('.search_bar').keyup(function(e){
    if(e.keyCode === 13)
    {
      $('.btn_search').click();
    }
  });
});

$('.close_edit').click(function()
{
  document.getElementsByClassName('stock_edit')[0].classList.toggle('show');
  killCam();
  clear();
});

$('.close_add').click(function()
{
  document.getElementsByClassName('stock_add')[0].classList.toggle('show');
  $('.qr_img').attr('src', '');
  $('div.stock_add .card.qr_code').removeClass('show');
  clear();
});

$('.close_report').click(function()
{
  document.getElementsByClassName('send_report')[0].classList.toggle('show');
})

$('.btn_open_edit').click(function()
{
  document.getElementsByClassName('stock_edit')[0].classList.toggle('show');
  load_products();
});

$('.btn_open_add').click(function()
{
  document.getElementsByClassName('stock_add')[0].classList.toggle('show');
});

$('.btn_open_report').click(function()
{
  document.getElementsByClassName('send_report')[0].classList.toggle('show');
});

$('.btn_add').click(function()
{
  add_product();
});

$('.btn_download').click(function()
{
  var src = $('div.card_body img').attr('src');
  var fileName = `${$('div.stock_add input.product').val()}.png`;
  console.log(fileName);
  saveAs(src, fileName);
});

$('div.stock_edit button.btn_update').click(function()
{
  edit_product();
});

$('div.stock_edit select.product').change(function()
{
  load_quantity();
});

$('.btn_search').click(function()
{
  load_table();
});

$('div.stock_edit button.scan').click(function()
{
  $('div.status_message p').html('<p>Waiting to Scan <span class="timer"><i class="fas fa-hourglass-start"></i></span></p>');
  $('div.stock_edit div.scanner').addClass('show');
  scannerElement = 'div.stock_edit div.scanner';
  open_scan('canvas_add');
});

$('.btn_download_report').click(function()
{
});

$('.btn_send_report').click(function()
{
  generateReport();
});

/////////////////////////////////////////////////////////////////////////////
// Removes error highlight

$('input.product').on('click focus', function()
{
  $(this).removeClass('error');
});

$('.category').on('click focus', function()
{
  $(this).removeClass('error');
});

$('div.stock_add input.quantity').on('click focus', function()
{
  $(this).removeClass('error');
});

$('div.stock_edit input.quantity').on('click focus', function()
{
  $(this).removeClass('error');
});

$('div.send_report input.email').on('click focus', function()
{
  $(this).removeClass('error');
});

/////////////////////////////////////////////////////////////////////////////
