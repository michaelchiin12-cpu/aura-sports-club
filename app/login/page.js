function handleLogin(e) {
  e.preventDefault();

  if (!nama || !password) {
    setError("Lengkapi data.");
    return;
  }

  loginUser({
    nama,
    role: "Administrator",
  });

  router.push("/dashboard");
}