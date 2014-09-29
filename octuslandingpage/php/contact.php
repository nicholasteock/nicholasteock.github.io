<?php
	$name 		= $_POST['name'];
	$email 		= $_POST['email'];
	$phone 		= $_POST['phone'];
	$company 	= $_POST['company'];
	$request 	= $_POST['request'];

	$result = array( "result" => "success" );

	echo json_encode( $result );
?>