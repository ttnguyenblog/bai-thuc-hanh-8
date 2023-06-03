// Khai báo dữ liệu
var dulieu = [
    {
        STT: 1,
        Ten: 'Core i3 7100',
        Hang: 'Intel',
        NgaySX: '2011-11-20',
        Gia: 3450000
    },
    {
        STT: 2,
        Ten: 'Core i5 4430',
        Hang: 'Intel',
        NgaySX: '2012-9-9',
        Gia: 5430000
    }
];

// Định dạng tiền

function formatMoneyVND(money) {
    if (money === 0) {
        return 0;
    }
    var tmp = money.toString().split('').reverse().join('');
    var formatted = [];
    var len = tmp.length;
    var b = true;
    while (b) {
        if (tmp.indexOf(',') > 0) {
            tmp = tmp.replace(',', '');
            b = true;
        } else {
            b = false;
        }
    }
    b = true;
    while (b) {
        len = tmp.length;
        if (len % 3 !== 0) {
            tmp = tmp.toString() + '0';
            b = true;
        } else {
            b = false;
        }
    }
    for (var i = 0; i < tmp.length; i += 3) {
        formatted.push(tmp[i] + tmp[i + 1] + tmp[i + 2]);
    }
    formatted = formatted.toString().split('').reverse().join('');
    b = true;
    while (b) {
        if (formatted[0] === '0' || formatted[0] === ',') {
            formatted = formatted.substr(1);
            b = true;
        } else {
            b = false;
        }
    }
    for (var index = 0; index < formatted.length; index++) {
        if (formatted[index] === ',') {
            formatted = formatted.replace(',', '.');
        }
    }
    return formatted;
}

//Load data
var table = document.getElementById('myTable');

function addData(element) {
    var row = table.insertRow();
    row.insertCell().innerHTML = element.STT;
    row.insertCell().innerHTML = element.Ten;
    row.insertCell().innerHTML = element.Hang;
    row.insertCell().innerHTML = element.NgaySX;
    row.insertCell().innerHTML = formatMoneyVND(element.Gia);
}

function loadData() {
    dulieu.forEach(addData);
}


//Kiểm tra trùng dữ liệu

function kiemtra(){

    var checkTrung = false;
    for (var i = 0; i < dulieu.length; i++) {
        if (dulieu[i].Ten.trim().toLowerCase() === txtTen.value.trim().toLowerCase()) {
            checkTrung = true;
            break;
        }
    }
    return checkTrung;
}


//Check dữ liệu

function checkThongTin(){

    var txtTen = document.getElementById('txtTen');
    var txtHang = document.getElementById('txtHang');
    var dNgaySX = document.getElementById('dNgaySX');
    var fGia = document.getElementById('fGia');

    var checkTen = document.getElementById('checkTen');
    var checkHang = document.getElementById('checkHang');
    var checkNgaySX = document.getElementById('checkNgaySX');
    var checkGia = document.getElementById('checkGia');

    //Kiểm tra tên

    if(txtTen.value==''){
        checkTen.innerHTML='<span>Không được để trống!</span>';
    }else if (kiemtra()){
        checkTen.innerHTML='<span>Sản phẩm đã tồn tại!</span>';
    }else{
        checkTen.innerHTML='';
    }


    // kiểm tra hãng
    if(txtHang.value===''){
        checkHang.innerHTML='<span>Không được để trống!</span>';
    }else{
        checkHang.innerHTML='';
    }



    // kiểm tra ngày sản xuất
    if(dNgaySX.value.trim().length==0){
        checkNgaySX.innerHTML='<span>Không được để trống!</span>';
    }else if (Date.parse(dNgaySX.value) >= Date.now()) {
        checkNgaySX.innerHTML='Ngày sản xuất không được lớn hơn ngày hiện tại';
    }else{
        checkNgaySX.innerHTML='';
    }


    //kiểm tra giá
    if(fGia.value===''){
        checkGia.innerHTML='<span>Không được để trống!</span>';
    }else if (isNaN(parseInt(fGia.value))) {
        checkGia.innerHTML='Nhập sai định dạng giá';
    }else{
        checkGia.innerHTML='';
    }

    if(checkTen.innerHTML === '' && checkHang.innerHTML === '' && checkNgaySX.innerHTML === '' && checkGia.innerHTML === ''){
        them();
    }

}

function them() {
    var vxl = {
        STT: dulieu.length + 1,
        Ten: txtHang.value,
        Hang: txtHang.value,
        NgaySX: dNgaySX.value,
        Gia: parseInt(fGia.value)
    };
    dulieu.push(vxl);
    addData(vxl);
    huy();
}


function huy() {
    document.getElementById('txtTen').value = '';
    document.getElementById('txtHang').value = '';
    document.getElementById('dNgaySX').value = '';
    document.getElementById('fGia').value = '';

    document.getElementById('checkTen')= '';
    document.getElementById('checkHang')= '';
    document.getElementById('checkNgaySX')= '';
    document.getElementById('checkGia')= '';
}


