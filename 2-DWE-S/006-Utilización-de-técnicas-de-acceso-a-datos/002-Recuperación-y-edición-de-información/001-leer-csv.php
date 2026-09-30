<?php
$handle = fopen("datos.csv", "r");

while (($data = fgetcsv($handle, null, ",", "\"", "")) !== false) {
    print_r($data);
}

fclose($handle);