<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Maladie Details</title>
</head>

<body>
    <h1>Maladie Details</h1>
    <p><strong>Nom Patient:</strong> {{ $maladie->patient->nom }} {{ $maladie->patient->prenom }}</p>
    <p><strong>Nom Maladie:</strong> {{ $maladie->nom_maladie }}</p>
    <p><strong>Description:</strong> {{ $maladie->description }}</p>
</body>

</html>