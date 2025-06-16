<?php
$host = 'sql100.infinityfree.com';
$db = 'if0_39197552_logs';
$user = 'if0_39197552'; // di default in XAMPP
$pass = '7AIIGePqXQbQ';     // di default in XAMPP
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Errore connessione DB']);
  exit;
}

// Ricevi i dati dal form
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Valida e salva
if ($phone && $email && $password) {
  $stmt = $pdo->prepare("INSERT INTO users (phone, email, password) VALUES (?, ?, ?)");
  $stmt->execute([$phone, $email, $password]);
  echo json_encode(['success' => true]);
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Dati mancanti']);
}
?>
