let karyawan = JSON.parse(localStorage.getItem("karyawan")) || [];

const hari = [
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
    "minggu"
];

function simpanData() {
    localStorage.setItem("karyawan", JSON.stringify(karyawan));
}

function formatRupiah(angka) {
    return Number(angka || 0).toLocaleString("id-ID");
}


// ===============================
// TAMPILKAN DATA
// ===============================

function tampilkanData() {

    let tbody = document.getElementById("dataKaryawan");

    tbody.innerHTML = "";

    karyawan.forEach((item, index) => {

        // Data lama
        if (!item.absen) {

            item.absen = {
                senin: 0,
                selasa: 0,
                rabu: 0,
                kamis: 0,
                jumat: 0,
                sabtu: 0,
                minggu: 0
            };

        }

        if (item.kasbon === undefined) {
            item.kasbon = 0;
        }

        if (item.potongan === undefined) {
            item.potongan = 0;
        }


        // ===============================
        // HITUNG TOTAL HARI
        // ===============================

        let totalHari = 0;

        hari.forEach(namaHari => {

            totalHari += Number(
                item.absen[namaHari] || 0
            );

        });


        // ===============================
        // HITUNG GAJI
        // ===============================

        let gajiKotor =
            totalHari * Number(item.gaji);


        // ===============================
        // BATASI POTONGAN
        // ===============================

        let potongan =
            Number(item.potongan) || 0;

        let totalKasbon =
            Number(item.kasbon) || 0;


        // Potongan tidak boleh melebihi kasbon
        if (potongan > totalKasbon) {

            potongan = totalKasbon;

            item.potongan = totalKasbon;

        }


        // ===============================
        // SISA KASBON
        // ===============================

        let sisaKasbon =
            totalKasbon - potongan;


        // ===============================
        // GAJI BERSIH
        // ===============================

        let gajiBersih =
            gajiKotor - potongan;


        // ===============================
        // KOLOM ABSEN
        // ===============================

        let kolomHari = "";

        hari.forEach(namaHari => {

            let nilai =
                item.absen[namaHari] || 0;

            kolomHari += `

                <td>

                    <select
                        class="absen-select"
                        onchange="
                        ubahAbsen(
                            ${index},
                            '${namaHari}',
                            this.value
                        )
                        "
                    >

                        <option value="0"
                            ${nilai == 0 ? "selected" : ""}>
                            Libur
                        </option>

                        <option value="0.5"
                            ${nilai == 0.5 ? "selected" : ""}>
                            ½ Hari
                        </option>

                        <option value="1"
                            ${nilai == 1 ? "selected" : ""}>
                            Full
                        </option>

                    </select>

                </td>

            `;

        });


        // ===============================
        // TAMPILKAN BARIS
        // ===============================

        tbody.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${item.nama}
                    </strong>
                </td>

                <td>
                    Rp ${formatRupiah(item.gaji)}
                </td>

                ${kolomHari}

                <td class="total-hari">
                    ${totalHari}
                </td>

                <td>
                    Rp ${formatRupiah(gajiKotor)}
                </td>


                <!-- KASBON -->

                <td>

                    <input
                        class="kasbon-input"
                        type="number"
                        min="0"
                        value="${totalKasbon}"
                        onchange="
                            ubahKasbon(
                                ${index},
                                this.value
                            )
                        "
                    >

                </td>


                <!-- POTONGAN -->

                <td>

                    <input
                        class="kasbon-input"
                        type="number"
                        min="0"
                        value="${potongan}"
                        onchange="
                            ubahPotongan(
                                ${index},
                                this.value
                            )
                        "
                    >

                </td>


                <!-- SISA KASBON -->

                <td>

                    <strong>
                        Rp ${formatRupiah(sisaKasbon)}
                    </strong>

                </td>


                <!-- GAJI BERSIH -->

                <td class="gaji-bersih">

                    <strong>
                        Rp ${formatRupiah(gajiBersih)}
                    </strong>

                </td>


                <!-- AKSI -->

                <td>

                    <button
                        class="edit-btn"
                        onclick="
                            editKaryawan(${index})
                        "
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="
                            hapus(${index})
                        "
                    >
                        Hapus
                    </button>

                </td>

            </tr>

        `;

    });

    simpanData();
}


// ===============================
// TAMBAH KARYAWAN
// ===============================

function tambahKaryawan() {

    let nama =
        document
        .getElementById("nama")
        .value
        .trim();

    let gaji =
        document
        .getElementById("gaji")
        .value;


    if (nama === "" || gaji === "") {

        alert(
            "Nama dan gaji harus diisi!"
        );

        return;
    }


    karyawan.push({

        nama: nama,

        gaji: Number(gaji),

        kasbon: 0,

        potongan: 0,

        absen: {

            senin: 0,
            selasa: 0,
            rabu: 0,
            kamis: 0,
            jumat: 0,
            sabtu: 0,
            minggu: 0

        }

    });


    document
        .getElementById("nama")
        .value = "";

    document
        .getElementById("gaji")
        .value = "";


    tampilkanData();
}


// ===============================
// ABSEN
// ===============================

function ubahAbsen(
    index,
    namaHari,
    nilai
) {

    karyawan[index]
        .absen[namaHari] =
        Number(nilai);


    tampilkanData();
}


// ===============================
// TAMBAH / EDIT KASBON
// ===============================

function ubahKasbon(
    index,
    nilai
) {

    nilai = Number(nilai) || 0;


    if (nilai < 0) {
        nilai = 0;
    }


    karyawan[index].kasbon =
        nilai;


    // Kalau kasbon dikurangi
    // dan potongan lebih besar
    // dari kasbon baru

    if (
        karyawan[index].potongan >
        nilai
    ) {

        karyawan[index].potongan =
            nilai;

    }


    tampilkanData();
}


// ===============================
// POTONGAN KASBON
// ===============================

function ubahPotongan(
    index,
    nilai
) {

    nilai = Number(nilai) || 0;


    if (nilai < 0) {
        nilai = 0;
    }


    let kasbon =
        Number(
            karyawan[index].kasbon
        ) || 0;


    // Potongan tidak boleh
    // lebih besar dari kasbon

    if (nilai > kasbon) {

        alert(
            "Potongan tidak boleh lebih besar dari kasbon!"
        );

        nilai = kasbon;

    }


    karyawan[index].potongan =
        nilai;


    tampilkanData();
}


// ===============================
// EDIT KARYAWAN
// ===============================

function editKaryawan(index) {

    let namaBaru =
        prompt(
            "Edit nama karyawan:",
            karyawan[index].nama
        );


    if (namaBaru === null) {
        return;
    }


    namaBaru =
        namaBaru.trim();


    if (namaBaru === "") {

        alert(
            "Nama tidak boleh kosong!"
        );

        return;
    }


    let gajiBaru =
        prompt(
            "Edit gaji per hari:",
            karyawan[index].gaji
        );


    if (gajiBaru === null) {
        return;
    }


    gajiBaru =
        Number(gajiBaru);


    if (
        gajiBaru <= 0 ||
        isNaN(gajiBaru)
    ) {

        alert(
            "Gaji tidak valid!"
        );

        return;
    }


    karyawan[index].nama =
        namaBaru;

    karyawan[index].gaji =
        gajiBaru;


    tampilkanData();
}


// ===============================
// HAPUS
// ===============================

function hapus(index) {

    let yakin =
        confirm(
            "Apakah Anda yakin ingin menghapus " +
            karyawan[index].nama +
            "?"
        );


    if (!yakin) {
        return;
    }


    karyawan.splice(index, 1);


    tampilkanData();
}


// ===============================
// JALANKAN
// ===============================

tampilkanData();
