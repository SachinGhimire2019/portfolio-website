<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Set up email parameters
    $to = "sachinghimire374@gmail.com"; // Replace with your email address
    $subject = "Message from Contact Form";
    $body = "Name: $fullname\n\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Email sent successfully.";
    } else {
        http_response_code(500);
        echo "Failed to send email.";
    }
} else {
    http_response_code(403);
    echo "Access denied.";
}
?>
