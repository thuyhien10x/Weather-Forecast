<?php
$apiKey = 'b3ab4225250043daa85181022241405';  
$location = isset($_GET['location']) ? $_GET['location'] : 'New York'; 
// Ensure the location is URL-encoded to handle spaces or special characters
$encodedLocation = urlencode($location);

$url = "https://api.weatherapi.com/v1/forecast.json?key={$apiKey}&q={$encodedLocation}&days=6&aqi=yes&alerts=no";


$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

