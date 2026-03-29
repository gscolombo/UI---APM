
export default function formatPhoneNumber(phoneNumber: string | null) {
    if (phoneNumber == null) {
        return null;
    }


    // Remove non-numeric symbols
    let s = "";
    for (let c of phoneNumber)
        if (/[0-9]/.test(c))
            s += c;

    // Format phone number
    switch (s.length) {
        case 0:
            break
        case 1:
        case 2:
            s = "(" + s;
            break;
        case 3:
        case 4:
        case 5:
        case 6:
            s = "(" + s.slice(0, 2) + ") " + s.slice(2, 6);
            break;
        case 7:
        case 8:
        case 9:
        case 10:
            s = "(" + s.slice(0, 2) + ") " + s.slice(2, 6) + "-" + s.slice(6, 10);
            break;
        default:
            s = "(" + s.slice(0, 2) + ") " + s.slice(2, 7) + "-" + s.slice(7, 11);
    }

    return s
}