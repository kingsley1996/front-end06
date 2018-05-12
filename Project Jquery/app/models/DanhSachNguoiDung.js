function DanhSachNguoiDung() {
    this.DSND = [];
    this.themNguoiDung = function (nguoiDung) {
        this.DSND.push(nguoiDung);
    }
    this.timViTriNguoiDung = function (taiKhoan) {
        for (var i = 0; i < this.DSND.length; i++) {
            var nguoiDung = this.DSND[i];
            if (taiKhoan === nguoiDung.taiKhoan) {
                return i;
            }
        }
    }
    this.xoaTaiKhoan = function (taiKhoan) {
        var viTri = this.timViTriNguoiDung(taiKhoan);
        //phương thức xóa một phần tử trong mảng
        //(ts1,ts2): ts1 la vi tri cua phan tu can xoa
        //ts2 ke tu vi tri do xoa bao nhieu phan tu
        this.DSND.splice(viTri, 1);
    }
    this.timKiemNguoiDungTheoHoTen = function (tuKhoa) {
        var danhSachNguoiDungKQTK = new DanhSachNguoiDung();

        for(var i=0;i< this.DSND.length; i++)
        {
            var nguoiDung = this.DSND[i];
            //So sanh tung Hoten nguoi dung co chua tu khoa can tim khong
            if(nguoiDung.hoTen.trim().toLowerCase().search(tuKhoa) !==-1) {
                danhSachNguoiDungKQTK.themNguoiDung(nguoiDung);
            }

        }        

        return danhSachNguoiDungKQTK;
    }
    this.chinhSuaNguoiDung = function (nguoiDung) 
    {
        //tim vi tri nguoi dung
        var viTriNguoiDung = this.timViTriNguoiDung(nguoiDung.taiKhoan);
        //lay doi tuong nguoi dung tu vi tri do
        var nguoiDungChinhSua = this.DSND[viTriNguoiDung];
        nguoiDungChinhSua.matKhau = nguoiDung.matKhau;
        nguoiDungChinhSua.hoTen = nguoiDung.hoTen;
        nguoiDungChinhSua.email = nguoiDung.email;
        nguoiDungChinhSua.soDienThoai = nguoiDung.soDienThoai;
    }
}