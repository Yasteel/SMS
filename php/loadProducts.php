<?php
  require 'connection.php';

  $query = "SELECT product_id, product_name FROM stock ORDER BY product_name;";
  $result = mysqli_query($conn, $query);
  if(mysqli_num_rows($result) > 0)
  {
    echo '<select class="product">';
    while($row = $result->fetch_assoc())
    {
      echo '<option value="'.$row['product_id'].'">'. $row['product_name'] .'</option>';
    }
    echo '</select>';
  }
  else
  {
    echo '<select class="product"><option value="">No Stock :( </option></select>';
  }

 ?>
