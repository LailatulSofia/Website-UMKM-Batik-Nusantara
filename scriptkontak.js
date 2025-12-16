document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // FORM KONTAK
  // =========================
  const formKontak = document.getElementById("formKontak");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  function setKontakMessage(errors) {
    if (!errorMsg || !successMsg) return;

    if (errors.length > 0) {
      errorMsg.innerHTML = errors.map(e => `• ${e}`).join("<br>");
      successMsg.textContent = "";
    } else {
      errorMsg.textContent = "";
      successMsg.textContent = "";
    }
  }

  function validateKontak() {
    const errors = [];

    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const hp = document.getElementById("hp");
    const kategori = document.getElementById("kategori");
    const tgl = document.getElementById("tgl");
    const pesan = document.getElementById("pesan");

    // Nama wajib
    if (!nama.value.trim()) errors.push("Nama wajib diisi.");

    // Email wajib & format sederhana
    const emailVal = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) errors.push("Email wajib diisi.");
    else if (!emailPattern.test(emailVal)) errors.push("Format email tidak valid.");

    // HP wajib angka
    const hpVal = hp.value.trim();
    const hpPattern = /^[0-9]+$/;
    if (!hpVal) errors.push("Nomor HP wajib diisi.");
    else if (!hpPattern.test(hpVal)) errors.push("Nomor HP harus angka saja.");
    else if (hpVal.length < 10 || hpVal.length > 13) errors.push("Nomor HP minimal 10 digit dan maksimal 13 digit.");

    // Kategori wajib pilih (butuh option value="")
    if (!kategori.value) errors.push("Kategori pesan wajib dipilih.");

    // Tanggal wajib dan tidak boleh sebelum hari ini
    if (!tgl.value) {
      errors.push("Tanggal pengiriman pesan wajib diisi.");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(tgl.value);
      if (selected < today) errors.push("Tanggal tidak boleh sebelum hari ini.");
    }

    // Pesan minimal 10 karakter (biar “aman”)
    if (pesan.value.trim().length < 10) errors.push("Pesan minimal 10 karakter.");

    setKontakMessage(errors);
    return errors.length === 0;
  }

  if (formKontak) {
    // Submit
    formKontak.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = validateKontak();
      if (!ok) return;

      successMsg.textContent = "Pesan berhasil dikirim!";
      errorMsg.textContent = "";
      formKontak.reset();
    });

    // Realtime validation
    ["input", "blur", "change"].forEach(evt => {
      formKontak.addEventListener(evt, () => validateKontak(), true);
    });

    // Tombol Clear Data (punya kamu)
    const clearButton = document.getElementById("clearButton");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        formKontak.reset();
        setKontakMessage([]);
        if (successMsg) successMsg.textContent = "";
      });
    }
  }
  
  const formWebinar = document.getElementById("formWebinar");
  const successWebinar = document.getElementById("successWebinar");

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg || "";
  }

  function validateWebinarField() {
    const nama = document.getElementById("namaWebinar");
    const email = document.getElementById("emailWebinar");
    const hp = document.getElementById("hpWebinar");
    const topik = document.getElementById("topikWebinar");
    const setuju = document.getElementById("setujuWebinar");

    let valid = true;

    // Nama lengkap: wajib, min 3
    const namaVal = nama.value.trim();
    if (!namaVal) { setError("errorNamaWebinar", "Nama lengkap wajib diisi."); valid = false; }
    else if (namaVal.length < 3) { setError("errorNamaWebinar", "Minimal 3 karakter."); valid = false; }
    else setError("errorNamaWebinar", "");

    // Email: wajib, valid, bukan yahoo.com
    const emailVal = email.value.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) { setError("errorEmailWebinar", "Email wajib diisi."); valid = false; }
    else if (!emailPattern.test(emailVal)) { setError("errorEmailWebinar", "Format email tidak valid."); valid = false; }
    else if (emailVal.endsWith("@yahoo.com")) { setError("errorEmailWebinar", "Email tidak boleh menggunakan domain yahoo.com."); valid = false; }
    else setError("errorEmailWebinar", "");

    // No HP: wajib angka
    const hpVal = hp.value.trim();
    const hpPattern = /^[0-9]+$/;
    if (!hpVal) { setError("errorHpWebinar", "No HP wajib diisi."); valid = false; }
    else if (!hpPattern.test(hpVal)) { setError("errorHpWebinar", "No HP harus angka saja."); valid = false; }
    else setError("errorHpWebinar", "");

    // Topik: wajib pilih
    if (!topik.value) { setError("errorTopikWebinar", "Wajib pilih topik webinar."); valid = false; }
    else setError("errorTopikWebinar", "");

    // Checkbox: wajib centang
    if (!setuju.checked) { setError("errorSetujuWebinar", "Wajib menyetujui syarat & ketentuan."); valid = false; }
    else setError("errorSetujuWebinar", "");

    return valid;
  }

  function validateWebinarAll() {
    const ok = validateWebinarField();
    if (successWebinar) successWebinar.textContent = "";
    return ok;
  }

  if (formWebinar) {
    // Submit
    formWebinar.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateWebinarAll()) return;

      successWebinar.textContent = "Pendaftaran webinar berhasil! Sampai jumpa di acara 😊";
      formWebinar.reset();

      // bersihin error setelah reset
      setError("errorNamaWebinar", "");
      setError("errorEmailWebinar", "");
      setError("errorHpWebinar", "");
      setError("errorTopikWebinar", "");
      setError("errorSetujuWebinar", "");
    });

    // Realtime validation
    ["input", "blur", "change"].forEach(evt => {
      formWebinar.addEventListener(evt, () => validateWebinarField(), true);
    });

    // Tombol Clear Webinar
    const clearWebinar = document.getElementById("clearWebinar");
    if (clearWebinar) {
      clearWebinar.addEventListener("click", () => {
        formWebinar.reset();
        if (successWebinar) successWebinar.textContent = "";
        setError("errorNamaWebinar", "");
        setError("errorEmailWebinar", "");
        setError("errorHpWebinar", "");
        setError("errorTopikWebinar", "");
        setError("errorSetujuWebinar", "");
      });
    }
  }
});
