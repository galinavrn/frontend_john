<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exeption;

  require "phpmailer/src/Exeption.php";
  require "phpmailer/src/PHPMailer.php";

  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  $mail->setLanguage("en", "phpmailer/language/");
  $mail->IsHTML(true);

  #from who
  $mail->setForm("galina.shadow@gmail.ru", "Who");
  #for who
  $mail->addAddress("galina.shadow@gmail.ru");
  #theme of letter
  $mail->Subject = "New message from www.johndoe.com";

  $radio = "Cookies";
  if ($_post["form_radio"] == "icecream") {
    $form_radio = "Icecream";
  }

  $body = "<h1>New letter!</h1>";

  if (trim(!empty($_post["form_name"]))) {
    $body.= "<p><strong>Name:</strong> ".$_post["form_name"]."</p>";
  }
  if (trim(!empty($_post["form_email"]))) {
    $body.= "<p><strong>E-mail:</strong> ".$_post["form_email"]."</p>";
  }
  if (trim(!empty($_post["form_select"]))) {
    $body.= "<p><strong>Theme:</strong> ".$_post["form_select"]."</p>";
  }
  if (trim(!empty($_post["form_message"]))) {
    $body.= "<p><strong>Message:</strong> ".$_post["form_message"]."</p>";
  }
  if (trim(!empty($_post["form_radio"]))) {
    $body.= "<p><strong>Choise:</strong> ".$radio."</p>";
  }
  if (trim(!empty($_files["form_file"]["tmp_name"]))) {
    $filePath = __dir__ . "/file/" . $_files["form_file"]["name"];
    if (copy($_files["form_file"]["tmp_name"], $filePath)) {
      $body.= "<p><strong>Atached file below:</strong></p>";
      $mail->addAttachment($filePath);
    }
  }
  
  $mail->Body = $body;

  #sending
  if (!$mail->send()) {
    $result = "Error";
  } else {
    $result = "Data tranfered!";
  }

  $response = ["message" => $result];

  header("Content-type: application/json");
  echo json_encode($response);
?>


