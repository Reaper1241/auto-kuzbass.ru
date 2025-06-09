export default function validatePhone(phone) {
    let clearPhone = phone.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
    return clearPhone.length === 11
}