import banh_mi from '../assets/images/banhmi8.png'
import bun from '../assets/images/bun5.png'
import pho from '../assets/images/pho10.png'
import trang_mieng from '../assets/images/tm7.png'
import thuc_uong from '../assets/images/tu1.png'
import mon_phu from '../assets/images/mp5.png'

export const menuHome = [
    {
        path: "",
        text: "Trang chủ",
        end: true,
    },
    {
        path: "about",
        text: "Thông tin",
    },
    {
        path: "menu",
        text: "Thực đơn",
    },
    {
        path: "table",
        text: "Đặt bàn",
    },
]

export const menuFood = [
    {
        end: true,
        path: "all",
        text: "All"
    },
    {
        path: "banh-mi",
        text: "Bánh Mì",
        image: banh_mi
    },
    {
        path: "bun",
        text: "Bún",
        image: bun
    },
    {
        path: "pho",
        text: "Phở",
        image: pho
    },
    {
        path: "mon-phu",
        text: "Món Phụ",
        image: mon_phu
    },
    {
        path: "trang-mieng",
        text: "Tráng Miệng",
        image: trang_mieng
    },
    {
        path: "thuc-uong",
        text: "Thức Uống",
        image: thuc_uong
    },
]