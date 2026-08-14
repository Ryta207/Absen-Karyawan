let karyawan =
    JSON.parse(localStorage.getItem("karyawan")) || [];


/* =========================
   SIMPAN DATA
========================= */

function simpanData() {

    localStorage.setItem(
        "karyawan",
        JSON.stringify(karyawan)
    );

}


/* =========================
   TAMBAH KARYAWAN
========================= */

function tambahKaryawan() {

    const nama =
        document.getElementById("nama").value.trim();

    const gaji =
        Number(
            document.getElementById("gaji").value
        );

    if (nama === "" || gaji <= 0) {

        alert(
            "Masukkan nama dan gaji dengan benar."
        );

        return;
    }

    karyawan.push({

        nama: nama,

        gaji: gaji,

        hari: [
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],

        kasbon: 0

    });


    document.getElementById("nama").value = "";

    document.getElementById("gaji").value = "";


    simpanData();

    tampilkanData();

}


/* =========================
   TAMPILKAN DATA
========================= */

function tampilkanData() {

    const tbody =
        document.getElementById("dataKaryawan");


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    karyawan.forEach((item, index) => {


        /* Pastikan data hari tersedia */

        if (!Array.isArray(item.hari)) {

            item.hari = [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ];

        }


        while (item.hari.length < 7) {

            item.hari.push(0);

        }


        if (item.kasbon === undefined) {

            item.kasbon = 0;

        }


        let totalHari = 0;


        item.hari.forEach(hari => {

            totalHari += Number(hari);

        });


        const gajiKotor =
            totalHari *
            Number(item.gaji);


        const gajiBersih =
            gajiKotor -
            Number(item.kasbon);


        let hariHTML = "";


        item.hari.forEach(
            (nilai, hariIndex) => {


                hariHTML += `

                    <td>

                        <select
                            onchange="
                                ubahHari(
                                    ${index},
                                    ${hariIndex},
                                    this.value
                                )
                            "
                        >

                            <option
                                value="0"
                                ${nilai == 0
                                    ? "selected"
                                    : ""}
                            >
                                Libur
                            </option>


                            <option
                                value="0.5"
                                ${nilai == 0.5
                                    ? "selected"
                                    : ""}
                            >
                                ½ Hari
                            </option>


                            <option
                                value="1"
                                ${nilai == 1
                                    ? "selected"
                                    : ""}
                            >
                                Full
                            </option>

                        </select>

                    </td>

                `;

            }
        );


        tbody.innerHTML += `

            <tr>

                <td>

                    <strong>
                        ${item.nama}
                    </strong>

                </td>


                <td>

                    Rp ${Number(item.gaji)
                        .toLocaleString("id-ID")}

                </td>


                ${hariHTML}


                <td>

                    <strong>
                        ${totalHari}
                    </strong>

                </td>


                <td class="kotor">

                    Rp ${gajiKotor
                        .toLocaleString("id-ID")}

                </td>


                <td>

                    <input

                        class="kasbon"

                        type="number"

                        min="0"

                        value="${item.kasbon}"

                        onchange="
                            ubahKasbon(
                                ${index},
                                this.value
                            )
                        "

                    >

                </td>


                <td class="bersih">

                    Rp ${gajiBersih
                        .toLocaleString("id-ID")}

                </td>


                <td>


                    <button

                        type="button"

                        class="edit"

                        onclick="
                            editKaryawan(${index})
                        "

                    >

                        Edit

                    </button>


                    <button

                        type="button"

                        class="delete"

                        onclick="
                            hapusKaryawan(${index})
                        "

                    >

                        Hapus

                    </button>


                    <button

                        type="button"

                        class="print"

                        onclick="
                            cetakKaryawan(${index})
                        "

                    >

                        🖨️ Cetak

                    </button>


                    <button

                        type="button"

                        class="whatsapp"

                        onclick="
                            kirimWhatsApp(${index})
                        "

                    >

                        💬 WhatsApp

                    </button>


                </td>


            </tr>

        `;

    });


    simpanData();

}


/* =========================
   ABSENSI
========================= */

function ubahHari(
    index,
    hariIndex,
    nilai
) {

    if (!karyawan[index]) {
        return;
    }


    karyawan[index].hari[hariIndex] =
        Number(nilai);


    simpanData();

    tampilkanData();

}


/* =========================
   KASBON
========================= */

function ubahKasbon(
    index,
    nilai
) {

    if (!karyawan[index]) {
        return;
    }


    karyawan[index].kasbon =
        Number(nilai) || 0;


    simpanData();

    tampilkanData();

}


/* =========================
   EDIT KARYAWAN
========================= */

function editKaryawan(index) {

    if (!karyawan[index]) {

        alert(
            "Karyawan tidak ditemukan."
        );

        return;
    }


    const namaBaru =
        prompt(
            "Nama karyawan:",
            karyawan[index].nama
        );


    if (namaBaru === null) {
        return;
    }


    const gajiBaru =
        prompt(
            "Gaji per hari:",
            karyawan[index].gaji
        );


    if (gajiBaru === null) {
        return;
    }


    if (
        namaBaru.trim() === "" ||
        Number(gajiBaru) <= 0
    ) {

        alert(
            "Data tidak valid."
        );

        return;
    }


    karyawan[index].nama =
        namaBaru.trim();


    karyawan[index].gaji =
        Number(gajiBaru);


    simpanData();

    tampilkanData();

}


/* =========================
   HAPUS
========================= */

function hapusKaryawan(index) {

    if (!karyawan[index]) {
        return;
    }


    if (
        !confirm(
            "Yakin ingin menghapus karyawan ini?"
        )
    ) {

        return;

    }


    karyawan.splice(
        index,
        1
    );


    simpanData();

    tampilkanData();

}


/* =========================
   FORMAT RUPIAH
========================= */

function rupiah(angka) {

    return Number(angka || 0)
        .toLocaleString("id-ID");

}


/* =========================
   NAMA HARI
========================= */

const namaHari = [

    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"

];


/* =========================
   STATUS HARI
========================= */

function statusHari(nilai) {

    nilai =
        Number(nilai);


    if (nilai === 1) {

        return "Full";

    }


    if (nilai === 0.5) {

        return "½ Hari";

    }


    return "Libur";

}


/* =====================================================
   RESET MINGGU
===================================================== */

function resetMinggu() {

    if (karyawan.length === 0) {

        alert(
            "Belum ada data karyawan."
        );

        return;
    }


    const yakin = confirm(

        "🔄 MULAI MINGGU BARU?\n\n" +

        "Data yang akan direset:\n\n" +

        "• Absensi Senin - Minggu\n" +

        "• Kasbon semua karyawan\n\n" +

        "Nama dan gaji karyawan tetap tersimpan.\n\n" +

        "Lanjutkan?"

    );


    if (!yakin) {

        return;

    }


    karyawan.forEach(item => {


        /* Reset 7 hari */

        item.hari = [

            0,
            0,
            0,
            0,
            0,
            0,
            0

        ];


        /* Reset kasbon */

        item.kasbon = 0;


    });


    /* Simpan data baru */

    simpanData();


    /* Refresh tabel */

    tampilkanData();


    alert(
        "✅ Minggu baru berhasil dimulai!"
    );

}


/* =========================
   BUAT LAPORAN
========================= */

function buatLaporan(item) {

    let totalHari = 0;


    item.hari.forEach(hari => {

        totalHari +=
            Number(hari);

    });


    const gajiKotor =
        totalHari *
        Number(item.gaji);


    const kasbon =
        Number(item.kasbon) || 0;


    const gajiBersih =
        gajiKotor -
        kasbon;


    let absensiHTML = "";


    item.hari.forEach(
        (nilai, indexHari) => {


            absensiHTML += `

                <tr>

                    <td>
                        ${namaHari[indexHari]}
                    </td>

                    <td>
                        ${statusHari(nilai)}
                    </td>

                </tr>

            `;

        }
    );


    const tanggal =
        new Date().toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    return `

<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>
    Laporan - ${item.nama}
</title>


<style>

* {
    box-sizing: border-box;
}


body {

    margin: 0;

    padding: 20px;

    font-family:
        Arial,
        sans-serif;

    color: #000;

    background: white;

}


.laporan {

    max-width: 800px;

    margin: auto;

}


h1 {

    text-align: center;

    margin-bottom: 5px;

}


h2 {

    text-align: center;

    margin-top: 0;

}


.info {

    margin: 25px 0;

}


table {

    width: 100%;

    border-collapse:
        collapse;

    margin-top: 20px;

}


th,
td {

    border:
        1px solid #000;

    padding: 10px;

    text-align: left;

}


th {

    background:
        #eeeeee;

}


.ringkasan {

    border:
        1px solid #000;

    padding: 15px;

    margin-top: 20px;

}


.ringkasan p {

    margin: 8px 0;

}


.gaji-bersih {

    font-size: 20px;

    font-weight: bold;

}


.tombol {

    text-align: center;

    margin-bottom: 25px;

}


button {

    border: none;

    background: #2563eb;

    color: white;

    padding: 12px 20px;

    border-radius: 8px;

    font-size: 16px;

    font-weight: bold;

}


.tanda-tangan {

    display: flex;

    justify-content:
        space-between;

    margin-top: 80px;

    text-align: center;

}


@media print {

    body {

        padding: 0;

    }


    .tombol {

        display: none;

    }


    @page {

        size: A4;

        margin: 15mm;

    }

}

</style>

</head>


<body>


<div class="laporan">


<div class="tombol">

<button onclick="window.print()">

🖨️ Cetak / Simpan PDF

</button>

</div>


<h1>
    LAPORAN GAJI KARYAWAN
</h1>


<h2>
    ABSEN-KARYAWAN
</h2>


<div class="info">

<p>

<strong>
    Nama:
</strong>

${item.nama}

</p>


<p>

<strong>
    Gaji per Hari:
</strong>

Rp ${rupiah(item.gaji)}

</p>


<p>

<strong>
    Periode:
</strong>

Mingguan

</p>

</div>


<table>

<thead>

<tr>

<th>
    Hari
</th>

<th>
    Kehadiran
</th>

</tr>

</thead>


<tbody>

${absensiHTML}

</tbody>

</table>


<div class="ringkasan">


<p>

Total Hari:

<strong>

${totalHari}
Hari

</strong>

</p>


<p>

Gaji Kotor:

<strong>

Rp ${rupiah(gajiKotor)}

</strong>

</p>


<p>

Kasbon:

<strong>

Rp ${rupiah(kasbon)}

</strong>

</p>


<p class="gaji-bersih">

Gaji Bersih:

Rp ${rupiah(gajiBersih)}

</p>


</div>


<p>

Tanggal Cetak:

${tanggal}

</p>


<div class="tanda-tangan">


<div>

Karyawan

<br><br><br>

__________________

<br>

${item.nama}

</div>


<div>

Penanggung Jawab

<br><br><br>

__________________

</div>


</div>


</div>


</body>

</html>

`;

}


/* =========================
   CETAK SATU KARYAWAN
========================= */

function cetakKaryawan(index) {

    const item =
        karyawan[index];


    if (!item) {

        alert(
            "Karyawan tidak ditemukan."
        );

        return;
    }


    const laporan =
        buatLaporan(item);


    const jendela =
        window.open(
            "",
            "_blank"
        );


    if (!jendela) {

        alert(
            "Popup diblokir oleh browser. " +
            "Izinkan popup untuk website ini."
        );

        return;
    }


    jendela.document.open();

    jendela.document.write(
        laporan
    );

    jendela.document.close();

}


/* =========================
   CETAK SEMUA
========================= */

function cetakSemua() {

    if (karyawan.length === 0) {

        alert(
            "Belum ada data karyawan."
        );

        return;
    }


    let laporanSemua = "";


    karyawan.forEach(
        (item, index) => {


            laporanSemua +=
                buatLaporan(item);


            if (
                index <
                karyawan.length - 1
            ) {

                laporanSemua += `

                    <div
                        style="
                            page-break-after:
                            always;
                        "
                    ></div>

                `;

            }

        }
    );


    const jendela =
        window.open(
            "",
            "_blank"
        );


    if (!jendela) {

        alert(
            "Popup diblokir oleh browser. " +
            "Izinkan popup untuk website ini."
        );

        return;
    }


    jendela.document.open();

    jendela.document.write(
        laporanSemua
    );

    jendela.document.close();

}


/* =========================
   WHATSAPP
========================= */

function kirimWhatsApp(index) {

    const item =
        karyawan[index];


    if (!item) {

        alert(
            "Karyawan tidak ditemukan."
        );

        return;
    }


    let totalHari = 0;


    item.hari.forEach(hari => {

        totalHari +=
            Number(hari);

    });


    const gajiKotor =
        totalHari *
        Number(item.gaji);


    const kasbon =
        Number(item.kasbon) || 0;


    const gajiBersih =
        gajiKotor -
        kasbon;


    let absensi = "";


    item.hari.forEach(
        (nilai, indexHari) => {

            absensi +=

                `${namaHari[indexHari]} : ` +
                `${statusHari(nilai)}\n`;

        }
    );


    const tanggal =
        new Date().toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    const pesan =

`📋 *LAPORAN GAJI KARYAWAN*
*ABSEN-KARYAWAN*

👤 *Nama:* ${item.nama}

💰 *Gaji per Hari:* Rp ${rupiah(item.gaji)}

📅 *ABSENSI*

${absensi}

📊 *RINGKASAN*

Total Hari : ${totalHari} Hari
Gaji Kotor : Rp ${rupiah(gajiKotor)}
Kasbon : Rp ${rupiah(kasbon)}

💵 *GAJI BERSIH*

Rp ${rupiah(gajiBersih)}

📅 Tanggal: ${tanggal}`;


    const url =

        "https://wa.me/?text=" +
        encodeURIComponent(pesan);


    window.location.href = url;

}


/* =========================
   JALANKAN
========================= */

tampilkanData();
