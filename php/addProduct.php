<?php
  include 'connection.php';

  $productId = $_REQUEST['id'];
  $productName = $_REQUEST['productName'];
  $category = $_REQUEST['category'];
  $quantity = $_REQUEST['quantity'];
  $date = date("Y-m-d h:i:s");
  $query = "";

  $query = "SELECT product_id FROM stock WHERE product_category='$category' && product_name='$productName';";

  $result = mysqli_query($conn, $query);

  if(mysqli_num_rows($result) > 0)
  {
    echo '0';
  }
  else
  {
    $query = "INSERT INTO stock (product_id,product_category, product_name, quantity, created_time, mod_time) VALUES('$productId', '$category', '$productName', '$quantity', '$date', '$date');";
    if(mysqli_query($conn, $query))
    {
      $query = "INSERT INTO record(product_id, update_date, change_type, old_quantity, new_quantity) VALUES ('$productId', '$date', 'New Stock', 0, '$quantity');";
      if(mysqli_query($conn, $query))
      {
        echo '1';
      }
      else
      {
        echo '2';
      }
    }else
    {
      echo '2';
    }
  }

  //Output Codes
  //1 - Success
  //2 - Database Error
  //0 - Record Already Exist in Table
?>
