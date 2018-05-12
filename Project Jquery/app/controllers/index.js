$(document).ready(function () {

    $("#btnThemNguoiDung").click(btnThemClick);

    function btnThemClick() {
        //goi nut btnModal_click
        $("#btnModal").trigger("click");

        var modal_title = "Them nguoi dung";
        $(".modal-title").html(modal_title);
        var modal_footer = `
        <button id="btnThemND" class="btn btn-success" type="button"> Them nguoi dung</button>
        <button id="btnDong" class="btn btn-danger" type="button">Dong</button>
        `
        $(".modal-footer").html(modal_footer);
    }
    //xu ly nut dong
    $("body").delegate("#btnDong", "click", function () {
        $(".close").trigger("click");
        //clear txt 
        $(".txtF").val("");
        //mo khoa input
        $("#TaiKhoan").attr("readonly", false);
        luuDanhSachNguoiDung();
    })
    var danhSachNguoiDung = new DanhSachNguoiDung();
    //sự kiện delegate: ủy nhiệm (đặt chỗ trước) khi thẻ chưa đc tạo để xử lý sự kiện
    $("body").delegate("#btnThemND", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        //khai báo đối tượng người dùng theo prototype NguoiDung
        var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT);
        // console.log(nguoiDung);
        danhSachNguoiDung.themNguoiDung(nguoiDung);
        //dùng plugin sweetAlert để thông báo thêm thành công
        swal("Thêm người dùng thành công", "Success !", "success");
        // console.log(danhSachNguoiDung.DSND);
        loadTableNguoiDung(danhSachNguoiDung.DSND);
    });
    //Load dữ liệu ra datatable
    function loadTableNguoiDung(DSND) {
        var noiDungTable = "";
        for (var i = 0; i < DSND.length; i++) {
            var nguoiDung = DSND[i];
            noiDungTable += `
            <tr class="trNguoiDung" taikhoan="${nguoiDung.taiKhoan}"
                                    matkhau="${nguoiDung.matKhau}"
                                    hoten="${nguoiDung.hoTen}"
                                    email="${nguoiDung.email}"
                                    sodienthoai="${nguoiDung.soDienThoai}"  
            >
                <td><input type ="checkbox" class="ckbTaiKhoan" value= "${nguoiDung.taiKhoan}" /></td>
                <td class="tdNguoiDung">${nguoiDung.taiKhoan}</td>
                <td class="tdNguoiDung">${nguoiDung.matKhau}</td>
                <td class="tdNguoiDung tdHoTen">${nguoiDung.hoTen}</td>
                <td class="tdNguoiDung">${nguoiDung.email}</td>
                <td class="tdNguoiDung">${nguoiDung.soDienThoai}</td>
            </tr>
            `

        }
        $('#tblDanhSachNguoiDung').html(noiDungTable);
    }

    //Lưu danh sách người dùng vào localStorage
    function luuDanhSachNguoiDung() {
        //chuyển đổi mảng DSND -> chuỗi JSON    
        var jsonDSND = JSON.stringify(danhSachNguoiDung.DSND);
        //lưu ý: chỉ lưu được dữ liêu, k lưu đc phương thức
        localStorage.setItem("DanhSachNguoiDung", jsonDSND);
    }

    //lấy danh sách người dùng từ localStorage
    function layDanhSachNguoiDung() {
        if (localStorage.getItem("DanhSachNguoiDung")) {
            //lấy chuỗi từ localStorage
            var jsonDSND = localStorage.getItem("DanhSachNguoiDung");
            //Parse chuỗi json -> object là mảng DSND
            danhSachNguoiDung.DSND = JSON.parse(jsonDSND);
            //goi phuong thuc load table nguoi dung
            loadTableNguoiDung(danhSachNguoiDung.DSND);
        }
    }

    //Goi ham lay danh sach Nguoi dung khi script vua load xong
    layDanhSachNguoiDung();

    //Phuong thuc xoa phan tu 
    $("#btnXoaNguoiDung").click(function () {
        //Duyet danh sach co selector la ckbTaiKhoan bằng hàm each()
        $(".ckbTaiKhoan").each(function () {
            //$(this) đại diện cho seletor đang đc duyệt
            var taiKhoan = $(this).val();
            //Kiểm tra xem no đang được checked hay không
            if ($(this).is(":checked")) {
                danhSachNguoiDung.xoaTaiKhoan(taiKhoan);
            }
        });
        swal("Xóa người dùng!", "Thành công", "success");

        loadTableNguoiDung(danhSachNguoiDung.DSND);
    });

    //su kien go phim vao input search (hàm keyup)
    $("#txtTuKhoa").keyup(function () {
        var tuKhoa = $(this).val();
        tuKhoa = tuKhoa.trim().toLowerCase(); //loai bo khoang trong dau cuoi
        var danhSachNguoiDungKQTK = danhSachNguoiDung.timKiemNguoiDungTheoHoTen(tuKhoa);
        loadTableNguoiDung(danhSachNguoiDungKQTK.DSND);
        inDamTuKhoa(tuKhoa);
    });
    //Viet phuong thuc click cho trNguoiDung
    $("body").delegate(".tdNguoiDung", "click", function () {

        //hien thi pop up Modal
        $("#btnModal").trigger("click");

        //lấy thông tin từ thẻ cha
        var trNguoiDung = $(this).parent();

        //Tao noi dung cho popupmodal
        var modal_title = "Cập nhật"
        var modal_footer = `
        <button id="btnCapNhat" class="btn btn-success" type="button"> Cap Nhat</button>
        <button id="btnDong" class="btn btn-danger" type="button">Dong</button>

        `
        $(".modal-title").html(modal_title);
        $(".modal-footer").html(modal_footer);
        
        //lay thong tin tu the 
        var taiKhoan = trNguoiDung.attr("taikhoan");
        var matKhau = trNguoiDung.attr("matkhau");
        var hoTen = trNguoiDung.attr("hoten");
        var email = trNguoiDung.attr("email");
        var soDienThoai = trNguoiDung.attr("sodienthoai");

        //Dom den input trong popup modal cap nhat -> gan gia tri len cac textbox control
        $("#TaiKhoan").val(taiKhoan);
        $("#MatKhau").val(matKhau);
        $("#HoTen").val(hoTen);
        $("#Email").val(email);
        $("#SoDienThoai").val(soDienThoai);

        //khoa textbox tai khoan
        $("#TaiKhoan").attr("readonly", true);

        
    });
    $("body").delegate("#btnCapNhat", "click", function () {
        //lay thong tin nguoi dung sau khi nguoi dung thay doi
        var taiKhoan = $("#TaiKhoan").val();
        var matKhau = $("#MatKhau").val();
        var hoTen = $("#HoTen").val();
        var email = $("#Email").val();
        var soDienThoai = $("#SoDienThoai").val();

        //
        var nguoiDungChinhSua = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDienThoai);
        danhSachNguoiDung.chinhSuaNguoiDung(nguoiDungChinhSua);

        //Sau khi cap nhat load lai table

        $(".close").trigger("click");
        //Mo khoa nut input
        $("#TaiKhoan").attr("readonly", false);
        //clear txt 
        $(".txtF").val("");
        //
        //dùng plugin sweetAlert để thông báo thêm thành công
        swal("Chỉnh sửa người dùng thành công", "Success !", "success");
        luuDanhSachNguoiDung();
        loadTableNguoiDung(danhSachNguoiDung.DSND);
    });

    //Viet ham xu ly highlight Tu khoa 
    function inDamTuKhoa(tuKhoa) {
        tuKhoa = tuKhoa.toLowerCase().trim();
        var doDai = tuKhoa.length;
        //Duyệt tất cả các tdHoTen
        $(".tdHoTen").each(function(){
            var chuoiBanDau = $(this).html().toLowerCase().trim();
            var viTriTuKhoa = chuoiBanDau.search(tuKhoa);
            if(viTriTuKhoa !==-1)
            {
                // hàm substring(ts1,ts2) : trích xuất 1 chuỗi từ chuỗi ban đầu
                // với ts1: vị trí bắt đầu, ts2: vị trí kết thúc(lưu ý: không lấy ts2)
                var chuoiKetQua =  `
                    ${chuoiBanDau.substring(0,viTriTuKhoa)}
                    <span class="inDam">${tuKhoa}</span>
                    ${chuoiBanDau.substring(viTriTuKhoa+doDai)} 
                
                `
                $(this).html(chuoiKetQua);
            }
        });
    }
});