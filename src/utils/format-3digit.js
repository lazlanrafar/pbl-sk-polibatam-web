export default function format3Digit(number) {
  return new Intl.NumberFormat("id-ID").format(number);
}
