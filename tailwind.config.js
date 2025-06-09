/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      PrimaryPurple: "#633CFF",
      SecondaryPurple: "#BEADFF",
      LightPurple: "#EFEBFF",
      Black: "#333333",
      PrimaryGray: "#737373",
      SecondaryGray: "#D9D9D9",
      White: "#FFFFFF",
      SecondaryWhite: "#FAFAFA",
      Red: "#FF3939",
      Green: "#40f29a",
    },
    fontFamily: {
      instrument: "InstrumentSansRegular",
      instrumentBold: "InstrumentSansBold",
      instrumentSemiBold: "InstrumentSansSemiBold",
      Nayuki: "Nayuki",
      Outfit: "Outfit",
    },
    extend: {},
  },
  plugins: [],
};
