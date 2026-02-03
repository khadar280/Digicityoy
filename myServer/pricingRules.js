// Base prices and deductions for iPhones
module.exports = {
  basePrices: {
    iphone13: 450,
    iphone14: 600,
    iphone15: 750
  },
  deductions: {
    screen: {
      good: 0,
      cracked: 120
    },
    body: {
      like_new: 0,
      light: 30,
      heavy: 70
    },
    battery: {
      above90: 0,
      between80_89: 40,
      below80: 80
    }
  }
};
