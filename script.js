let tasks=[];
let editIndeks = -1;

const $inputTugas = $("#inputTugas");
const $btnTambah = $("#btnTambah");
const $daftarTugas = $("#daftarTugas");
const $inputTanggal = $("#dateInput");

// function edit tambah dan hapus
$btnTambah.click(function(){
    const teksTugas = $inputTugas.val();
    const tglTugas = $inputTanggal.val();

    if(teksTugas === "" || tglTugas === "") {
        alert("Data harus diisi!");
        return;
    }

    if(editIndeks === -1){
        tasks.push({
            teksTugas: teksTugas,
            tglTugas: tglTugas,
            status: 'todo'
        });
    }else{
        tasks[editIndeks].teksTugas = teksTugas;
        tasks[editIndeks].tglTugas = tglTugas;
        editIndeks = -1;
        $btnTambah.text("Tambah Tugas").css("background", "#0077b6");
    }
    $inputTugas.val("");
    $inputTanggal.val("");
    render();
});

// function untuk update list
function render() {
    $daftarTugas.empty();

    $.each(tasks, function(index, item) {
        let $listBaru = $("<li>").addClass(item.status);

        $listBaru.html(`
        <div>
        <strong>${item.teksTugas}</strong> <br>
        <small>${item.tglTugas}</small>
        </div>
        <div class="btn-group">
        <select onchange="updateStatus(${index}, this.value)">
            <option value="todo" ${item.status === 'todo' ? 'selected' : ''}>Todo</option>
            <option value="on-progress" ${item.status === 'on-progress' ? 'selected' : ''}>On Progress</option>
            <option value="done" ${item.status === 'done' ? 'selected' : ''}>Done</option>
        </select>
        <button class="edit" onclick="persiapanEdit(${index})">Edit</button>
        <button class="hapus" onclick="hapusTugas(${index})">Hapus</button>
        </div>
    `);

    $daftarTugas.append($listBaru);
});
}

function persiapanEdit(index) {
    $inputTugas.val(tasks[index].teksTugas);
    $inputTanggal.val(tasks[index].tglTugas);
    
    editIndeks = index; 

    $btnTambah.text("Simpan").css("background", "#fbc02d");
    $inputTugas.focus();
}

function hapusTugas(index) {
    if(confirm("Yakin hapus?")) {
        tasks.splice(index, 1);
        render();
    }
}

function updateStatus(index, statusBaru) {
    tasks[index].status = statusBaru;
    render();
}