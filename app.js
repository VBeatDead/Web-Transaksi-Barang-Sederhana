const barangData = [
  { kode: "001", nama: "A", harga: 10000 },
  { kode: "002", nama: "B", harga: 20000 },
  { kode: "003", nama: "C", harga: 30000 },
];

document.addEventListener("DOMContentLoaded", () => {
  tampilkanDataBarang();
  const transaksiForm = document.getElementById("transaksiForm");
  transaksiForm.addEventListener("submit", tambahTransaksi);
});

function tampilkanDataBarang() {
  const barangTableBody = document.getElementById("barangTableBody");
  barangData.forEach((barang) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${barang.kode}</td><td>${barang.nama}</td><td>${barang.harga}</td>`;
    barangTableBody.appendChild(row);
  });
}

function tambahTransaksi(event) {
  event.preventDefault();

  const kodeInput = document.getElementById("kodeInput");
  const quantityInput = document.getElementById("quantityInput");
  const selectedBarang = barangData.find(
    (barang) => barang.kode === kodeInput.value
  );

  if (!selectedBarang) {
    alert("Kode barang tidak ditemukan");
    return;
  }

  const jumlah = parseInt(quantityInput.value);
  const totalHarga = selectedBarang.harga * jumlah;

  function promptBayar() {
    const bayar = window.prompt(
      `Total yang harus dibayar: ${totalHarga}\n\nMasukkan jumlah uang yang akan dibayarkan:`
    );

    if (bayar === null) {
      alert("Pembayaran dibatalkan");
      return;
    }

    const jumlahBayar = parseFloat(bayar);

    if (isNaN(jumlahBayar) || jumlahBayar < totalHarga || bayar === "") {
      alert(
        "Jumlah pembayaran tidak valid atau kurang dari total yang harus dibayar"
      );
      promptBayar();
      return;
    }

    const kembalian = jumlahBayar - totalHarga;

    alert(
      `Pembayaran berhasil!\n\nTotal yang harus dibayar: ${totalHarga}\nJumlah yang dibayarkan: ${jumlahBayar}\nKembalian: ${kembalian}`
    );
  }

  promptBayar();
}
