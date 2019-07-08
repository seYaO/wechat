const { trim } = require('./index');

/**
 * 身份证号合法性验证
 * 支持15位和18位身份证号
 * 支持地址编码、出生日期、校验位验证
 * @param {*} value 
 */
const identityCardValidate = (value) => {
    const city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    value = trim(value);
    let tip = '', pass = true;
    
    if(!!value) {
        let reg15 = /^\d{8}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}$/i;
        let reg = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}(\d|X)$/i;
        if(value.length === 15 && !reg15.test(value)) {
            pass = false;
        }else if(value.length !== 15 && !reg.test(value)) {
            pass = false;
        }else if(!city[value.substr(0, 2)]) {
            pass = false;
        }else{
            // 18位身份证需要验证最后一位校验位
            if(value.length === 18){
                value = value.split('');
                // ∑(ai×Wi)(mod 11)
                // 加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                // 校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0, ai = 0, wi = 0;
                for(let i = 0; i < 17; i++){
                    ai = value[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if(parity[sum % 11] != value[17]){
                    pass = false;
                }
            }
        }
    }else{
        pass = false;
    }

    return pass;
}

/**
 * 匹配中文，英文，或者空格，并且移除空格至少包含2个字符
 * @param {*} value 
 */
const userNameValidate = (value) => {
    value = trim(value);
    let reg = /^[a-zA-Z\u4e00-\u9fa5\s]{2,100}$/;
    if(!value) return false;

    if(reg.test(value)) {
        if(value.indexOf('\\') !== -1){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

/**
 * 验证手机号码
 * @param {*} value 
 */
const phoneValidate = (value) => {
    let reg = /^(13[0-9]|14[135678]|15[0-9]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
    return reg.test(value);
}

/**
 * 验证邮箱
 * @param {*} value 
 */
const emailValidate = (value) => {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(value);
}

/**
 * 验证航班号
 * @param {*} value 
 */
const flightValidate = (value) => {
    let reg = /^([a-zA-z]|\d){5,7}$/;
    return reg.test(value);
}


module.exports = {
    identityCardValidate,
    userNameValidate,
    phoneValidate,
    emailValidate,
    flightValidate,
}