slet let karyawan =
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
        document.getElementById(
            "dataKaryawan"
        );


    tbody.innerHTML = "";


    karyawan.forEach(
        (item, index) => {


        if (!Array.isArray(item.hari)) {

            item.hari = [
                0, 0, 0, 0, 0, 0, 0
            ];

        }


        while (item.hari.length < 7) {

            item.hari.push(0);

        }


        if (item.kasbon === undefined) {

            item.kasbon = 0;

        }


        let totalHari = 0;


        item.hari.forEach(
            hari => {

                totalHari +=
                    Number(hari);

            }
        );


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
                            ${
                                nilai == 0
                                ? "selected"
                                : ""
                            }
                        >
                            Libur
                        </option>


                        <option
                            value="0.5"
                            ${
                                nilai == 0.5
                                ? "selected"
                                : ""
                            }
                        >
                            ½ Hari
                        </option>


                        <option
                            value="1"
                            ${
                                nilai == 1
                                ? "selected"
                                : ""
                            }
                        >
                            Full
                        </option>

                    </select>

                </td>

            `;

        });


        tbody.innerHTML += `

            <tr>


                <td>

                    <strong>
                        ${item.nama}
                    </strong>

                </td>


                <td>

                    Rp
                    ${rupiah(item.gaji)}

                </td>


                ${hariHTML}


                <td>

                    <strong>
                        ${totalHari}
                    </strong>

                </td>


                <td class="kotor">

                    Rp
                    ${rupiah(gajiKotor)}

                </td>


                <td>

                    <input

                        class="kasbon"

                        type="number"

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

                    Rp
                    ${rupiah(gajiBersih)}

                </td>


                <td>


                    <button
                        class="edit"
                        onclick="
                        editKaryawan(${index})
                        "
                    >
                        Edit
                    </button>


                    <button
                        class="delete"
                        onclick="
                        hapusKaryawan(${index})
                        "
                    >
                        Hapus
                    </button>


                    <button
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
   UBAH ABSENSI
========================= */

function ubahHari(
    index,
    hariIndex,
    nilai
) {

    karyawan[index].hari[hariIndex] =
        Number(nilai);


    simpanData();

    tampilkanData();

}


/* =========================
   UBAH KASBON
========================= */

function ubahKasbon(
    index,
    nilai
) {

    karyawan[index].kasbon =
        Number(nilai) || 0;


    simpanData();

    tampilkanData();

}


/* =========================
   EDIT
========================= */

function editKaryawan(index) {

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

    const yakin =
        confirm(
            "Yakin ingin menghapus karyawan ini?"
        );


    if (!yakin) {

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
   RUPIAH
========================= */

function rupiah(angka) {

    return Number(
        angka || 0
    ).toLocaleString("id-ID");

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

    nilai = Number(nilai);


    if (nilai === 1) {

        return "Full";

    }


    if (nilai === 0.5) {

        return "½ Hari";

    }


    return "Libur";

}


/* =========================
   BUAT TEKS LAPORAN
========================= */

function buatTeksLaporan(item) {

    let totalHari = 0;


    item.hari.forEach(
        hari => {

            totalHari +=
                Number(hari);

        }
    );


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
                namaHari[indexHari]
                + " : "
                + statusHari(nilai)
                + "\n";

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


    return `📋 *LAPORAN GAJI KARYAWAN*
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

}


/* =========================
   KIRIM WHATSAPP
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


    const pesan =
        buatTeksLaporan(item);


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(pesan);


    window.location.href =
        url;

}


/* =========================
   FORWARD SEMUA
========================= */

function kirimSemuaWhatsApp() {

    if (karyawan.length === 0) {

        alert(
            "Belum ada data karyawan."
        );

        return;

    }


    let pesan =
        "📋 *LAPORAN GAJI KARYAWAN*\n";

    pesan +=
        "*ABSEN-KARYAWAN*\n\n";


    karyawan.forEach(
        (item, index) => {

            let totalHari = 0;


            item.hari.forEach(
                hari => {

                    totalHari +=
                        Number(hari);

                }
            );


            const gajiKotor =
                totalHari *
                Number(item.gaji);


            const kasbon =
                Number(item.kasbon) || 0;


            const gajiBersih =
                gajiKotor -
                kasbon;


            pesan +=
                `👤 *${item.nama}*\n`;


            pesan +=
                `Total Hari: ${totalHari}\n`;


            pesan +=
                `Gaji Kotor: Rp ${rupiah(gajiKotor)}\n`;


            pesan +=
                `Kasbon: Rp ${rupiah(kasbon)}\n`;


            pesan +=
                `💵 *Gaji Bersih: Rp ${rupiah(gajiBersih)}*\n`;


            if (
                index <
                karyawan.length - 1
            ) {

                pesan +=
                    "\n--------------------\n\n";

            }

        }
    );


    pesan +=
        "\n📱 Dikirim dari Absen-Karyawan";


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(pesan);


    window.location.href =
        url;

}


/* =========================
   JALANKAN
========================= */

tampilkanData();
