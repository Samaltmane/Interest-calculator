// 🔁 Random Background Gradient on Load
const gradients = [
  "linear-gradient(135deg, #89f7fe, #66a6ff)",
  "linear-gradient(to right, #ff6ec4, #7873f5)",
  "linear-gradient(to right, #e0eafc, #cfdef3)",
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(120deg, #f6d365, #fda085)",
  "linear-gradient(135deg, #1e1e2f, #23242a)"
];
document.body.style.background = gradients[Math.floor(Math.random() * gradients.length)];

// 🔁 Show/hide "Compounded Per Year" input
function toggleFields() {
  const calcType = document.getElementById("calcType").value;
  const compounded = document.getElementById("compounded");

  compounded.style.display = (calcType === "compound") ? "block" : "none";
}

// 🧮 Calculate based on selected type
function calculate() {
  const type = document.getElementById("calcType").value;
  const P = parseFloat(document.getElementById("principal").value);
  const R = parseFloat(document.getElementById("rate").value);
  const T = parseFloat(document.getElementById("time").value);
  const N = parseFloat(document.getElementById("compounded").value) || 1;

  let resultText = "";

  if (isNaN(P) || isNaN(R) || isNaN(T)) {
    resultText = "❗ Please enter valid numbers.";
  } else if (type === "simple") {
    const SI = (P * R * T) / 100;
    resultText = `
      ✅ <strong>Simple Interest:</strong> ₹${SI.toFixed(2).toLocaleString()}<br>
      💰 <strong>Total Amount:</strong> ₹${(P + SI).toFixed(2).toLocaleString()}
    `;
  } else if (type === "compound") {
    const amount = P * Math.pow((1 + R / (100 * N)), N * T);
    const CI = amount - P;
    resultText = `
      ✅ <strong>Compound Interest:</strong> ₹${CI.toFixed(2).toLocaleString()}<br>
      💰 <strong>Total Amount:</strong> ₹${amount.toFixed(2).toLocaleString()}
    `;
  } else if (type === "loan") {
    const monthlyRate = R / 12 / 100;
    const months = T * 12;
    const EMI = (P * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = EMI * months;
    const totalInterest = totalPayment - P;

    resultText = `
      ✅ <strong>Monthly EMI:</strong> ₹${EMI.toFixed(2).toLocaleString()}<br>
      📈 <strong>Total Interest:</strong> ₹${totalInterest.toFixed(2).toLocaleString()}<br>
      💰 <strong>Total Payment:</strong> ₹${totalPayment.toFixed(2).toLocaleString()}
    `;
  }

  document.getElementById("result").innerHTML = resultText;
}
