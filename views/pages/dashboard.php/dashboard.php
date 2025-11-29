<?php
// dashboard.php

// Example data (replace later with DB query or backend API)
$totals = [
    "Patients" => 120,
    "Prescriptions" => 56,
    "Appointments" => 18,
    "Pharmacies" => 8
];

// Function to render dashboard cards (from your old code)
function renderDashboardCards($data) {
    foreach ($data as $title => $value) {
        echo "
        <div class='card'>
            <h3>{$title}</h3>
            <p>{$value}</p>
            <a href='#'>View &raquo;</a>
        </div>
        ";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="dashboard_style.css"> <!-- external CSS -->
</head>
<body>

    <h1>Welcome Admin Dashboard</h1>

    <div class="dashboard" id="dashboard-container">
        <?php renderDashboardCards($totals); ?>
    </div>

    <!-- JS file -->
    <script src="dashboard.js"></script>

</body>
</html>
