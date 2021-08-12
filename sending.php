<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require "phpmailer/src/PHPMailer.php";
  require "phpmailer/src/Exception.php";
  require "phpmailer/src/SMTP.php";
  
  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  $mail->setLanguage("en", "phpmailer/language/");

  #$mail->isSMTP();                                            //Send using SMTP
  #$mail->SMTPDebug = 0;                                       //Enable verbose debug output
  #$mail->Host       = "smtp.gmail.com";                       //Set the SMTP server to send through
  #$mail->Port       = 587;
  #$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  #$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  #$mail->Username   = "name.surname@gmail.com";               //SMTP username
  #$mail->Password   = "hello";                                //SMTP password
  #$mail->SMTPSecure = "tls";                                  //Enable implicit TLS encryption
    

  #from who
  $mail->setFrom("name.surname@gmail.com", "Name Surname");
  #for who
  $mail->addAddress("name.surname@gmail.com", "Name Surname");
  #theme of letter
  $mail->Subject = "New message from www.johndoe.com";
  $mail->IsHTML(true);

  $radio = "Cookies";
  if ($_POST["radio"] == "icecream") {
    $radio = "Icecream";
  }

  $body = "<h1>New letter!</h1>";

  if (trim(!empty($_POST["name"]))) {
    $body.= "<p><strong>Name:</strong> ".$_POST["name"]."</p>";
  }
  if (trim(!empty($_POST["email"]))) {
    $body.= "<p><strong>E-mail:</strong> ".$_POST["email"]."</p>";
  }
  if (trim(!empty($_POST["dropdown"]))) {
    $body.= "<p><strong>Theme:</strong> ".$_POST["dropdown"]."</p>";
  }
  if (trim(!empty($_POST["text"]))) {
    $body.= "<p><strong>Message:</strong> ".$_POST["text"]."</p>";
  }
  if (trim(!empty($_POST["radio"]))) {
    $body.= "<p><strong>Choise:</strong> ".$radio."</p>";
  }
  if (trim(!empty($_FILES["file"]["tmp_name"]))) {
    $filePath = __dir__ . "/file/" . $_FILES["file"]["name"];
    if (copy($_FILES["file"]["tmp_name"], $filePath)) {
      $body.= "<p><strong>Atached file below:</strong></p>";
      $mail->addAttachment($filePath);
    }
  }
  
  $mail->Body = $body;

  #sending
  if (!$mail->send()) {
    $message = "Error";
  } else {
    $message = "Data transferred!";
  }

  $response = ["message" => $message];

  header("Content-type: application/json");
  echo json_encode($response);
?>


