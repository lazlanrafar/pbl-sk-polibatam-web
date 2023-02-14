export const ValidationRules = {
  data() {
    return {
      genericRequiredRule: (value, msg) => !!value || `${msg} harus diisi`,
      genericMinRule: (value, msg) =>
        value > 0 || `${msg} harus lebih besar dari 0`,
      genericNumberRule: (value, msg) => !isNaN(value) || `${msg} harus angka`,
      genericEmailRule: (value) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || `Email tidak valid`;
      },
      genericNumber16Rule: (value, msg) => {
        const pattern = /^\d{16}$/;
        return pattern.test(value) || `${msg} harus 16 digit angka`;
      },
    };
  },
};
