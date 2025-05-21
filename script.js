const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const daftarBarang = [
    {nama: "Buku", harga: 25000},
    {nama: "Pensil", harga: 2000},
    {nama: "Pulpen", harga: 3000},
    {nama: "Penghapus", harga: 1500},
    {nama: "Penggaris", harga: 5000},
];

const keranjangBelanja = [];

function tampilkanDaftarBarang() {
    console.log("\n--- Daftar Barang ---");
    daftarBarang.forEach((barang, index) => {
        console.log(`${index+1}. ${barang.nama} - Rp${barang.harga}`);
    });
    console.log("-----------------------\n");
}

function tambahItemKeKeranjang(indexBarang, jumlah) {
    if (indexBarang >= 1 && indexBarang <= daftarBarang.length && jumlah > 0 ) {
        const barangYangDipilih = daftarBarang[indexBarang-1];
        const itemDiKeranjang = keranjangBelanja.find(item => item.nama === barangYangDipilih.nama);

        if (itemDiKeranjang) {
            itemDiKeranjang.jumlah += jumlah;
        } else {
            keranjangBelanja.push({ ...barangYangDipilih, jumlah });
        }
        console.log(`${jumlah} ${barangYangDipilih.nama} ditambahkan ke keranjang.`);
    } else if (jumlah <= 0) {
        console.log("Kuantitas harus lebih dari 0.");
    } else {
        console.log("Nomor barang tidak valid.");
    }
}

function lihatKeranjang() {
    if (keranjangBelanja.length === 0) {
        console.log("Keranjang belanja kosong.");
        return;
    }

    console.log("\n--- Isi Keranjang Belanja ---");
    keranjangBelanja.forEach((item, index) => {
        console.log(`${index + 1}. ${item.nama} - Rp${item.harga} x ${item.jumlah} = Rp${item.harga*item.jumlah}`);
    });
    console.log("---------------------------\n");
}

function hapusItemDariKeranjang(nomorItem) {
    if (nomorItem >= 1 && nomorItem <= keranjangBelanja.length) {
        const itemYangDihapus = keranjangBelanja.splice(nomorItem-1, 1)[0];
        console.log(`${itemYangDihapus.nama} telah dihapus dari keranjang.`);
    } else {
        console.log("Nomor item di keranjang tidak valid.")
    }
}

function hitungTotal() {
    let total = 0;
    keranjangBelanja.forEach(item => {
        total += item.harga*item.jumlah;
    });
    return total;
}

function tampilkanTotal() {
    const totalBelanja = hitungTotal();
    console.log(`Total belanja: Rp${totalBelanja}\n`);
}

function cetakStruk() {
    if (keranjangBelanja.length === 0) {
        console.log("Keranjang belanja kosong. Tidak ada struk yang dapat dicetak.");
        return;
    }

    console.log("\n--- Struk Belanja ---");
    let totalBayar = 0;
    keranjangBelanja.forEach(item => {
        const subtotal = item.harga*item.jumlah;
        console.log(`${item.nama} (${item.jumlah} x Rp${item.harga}) = Rp${subtotal}`);
        totalBayar += subtotal;
    });
    console.log("----------------------");
    console.log(`Total Bayar: Rp${totalBayar}`);
    console.log("----------------------\n");
}

function prosesInput() {
    tampilkanDaftarBarang();
    readline.question('Masukkan nomor barang yang ingin dibeli (atau "lihat" untuk melihat keranjang, "hapus" untuk menghapus item, "total" untuk melihat total, "struk" untuk mencetak struk dan menyelesaikan, "selesai" untuk keluar tanpa mencetak struk): ', (input) => {
        if (input.toLowerCase() === 'lihat') {
            lihatKeranjang();
            prosesInput();
        } else if (input.toLowerCase() === 'hapus') {
            lihatKeranjang();
            if (keranjangBelanja.length > 0) {
                readline.question('Masukkan nomor item di keranjang yang ingin dihapus: ', (nomorInput) => {
                    const nomorItem = parseInt(nomorInput);
                    if (!isNaN(nomorItem)) {
                        hapusItemDariKeranjang(nomorItem);
                        prosesInput();
                    } else {
                        console.log("Input tidak valid. Masukkan nomor item yang benar.");
                        prosesInput();
                    }
                });
            } else {
                prosesInput();
            }
        } else if (input.toLowerCase() === 'total') {
            tampilkanTotal();
            prosesInput();
        } else if (input.toLowerCase() === 'struk') {
            cetakStruk();
            console.log("Terima kasih telah berbelanja!");
            readline.close();
        } else if (input.toLowerCase() === 'selesai') {
            console.log("Terima kasih telah menggunakan aplikasi kasir ini!");
            readline.close();
        } else {
            const nomorBarang = parseInt(input);
            if (!isNaN(nomorBarang)) {
                readline.question('Masukkan kuantitas: ', (kuantitasInput) => {
                    const kuantitas = parseInt(kuantitasInput);
                    if (!isNaN(kuantitas)) {
                        tambahItemKeKeranjang(nomorBarang, kuantitas);
                        prosesInput();
                    } else {
                        console.log("Kuantitas harus berupa angka.");
                        prosesInput();
                    }
                });
            } else {
                console.log("Input tidak valid. Masukkan nomor barang atau perintah yang benar.");
                prosesInput();
            }
        }
    });
}

console.log("Selamat datang di aplikasi kasir ini!");
prosesInput();