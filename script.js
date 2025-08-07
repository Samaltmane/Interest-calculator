// 🎨 Define full color themes
const colorThemes = [
  {
    name: "Cool Blue",
    bodyBg: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    textColor: "#222",
    inputBg: "#f0f5ff",
    buttonBg: "linear-gradient(135deg, #66a6ff, #89f7fe)",
    resultBg: "linear-gradient(135deg, #e0ecff, #f7fbff)",
  },
  {
    name: "Vibrant Purple",
    bodyBg: "linear-gradient(to right, #ff6ec4, #7873f5)",
    textColor: "#fff",
    inputBg: "#fdf1ff",
    buttonBg: "linear-gradient(to right, #7873f5, #ff6ec4)",
    resultBg: "rgba(255, 255, 255, 0.2)",
  },
  {
    name: "Calm Sky",
    bodyBg: "linear-gradient(to right, #e0eafc, #cfdef3)",
    textColor: "#333",
    inputBg: "#ffffff",
    buttonBg: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    resultBg: "#ffffffdd",
  },
  {
    name: "Elegant Night",
    bodyBg: "linear-gradient(135deg, #1e1e2f, #23242a)",
    textColor: "#eee",
    inputBg: "#2a2a3a",
    buttonBg: "linear-gradient(135deg, #667eea, #764ba2)",
    resultBg: "#2f2f3f",
  },
  {
    name: "Sunset Glow",
    bodyBg: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    textColor: "#222",
    inputBg: "#fff8f1",
    buttonBg: "linear-gradient(120deg, #f093fb, #f5576c)",
    resultBg: "#ffffffcc",
  }
];

// 🔁 Pick and apply a random theme on page load
window.onload = () => {
  const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

  document.body.style.transition = "background 1s ease-in-out, color 0.5s";
  document.body.style.background = theme.bodyBg;
  document.body.style.color = theme.textColor;

  const inputs = document.querySelectorAll("input, select");
  const button = document.querySelector("button");
  const result = document.getElementById("result");
  const container = document.querySelector(".container");

  inputs.forEach(el => {
    el.style.background = theme.inputBg;
    el.style.border = "none";
    el.style.borderRadius = "8px";
    el.style.padding = "0.75rem";
    el.style.boxShadow = "inset 0 0 5px rgba(0,0,0,0.1)";
    el.style.color = theme.textColor;
  });

  if (button) {
    button.style.background = theme.buttonBg;
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.padding = "0.9rem";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
  }

  if (result) {
    result.style.background = theme.resultBg;
    result.style.borderRadius = "10px";
    result.style.padding = "1.2rem";
    result.style.marginTop = "1.5rem";
    result.style.color = theme.textColor;
  }

  if (container) {
    container.style.boxShadow = "0 15px 45px rgba(0, 0, 0, 0.15)";
    container.style.background = "#ffffffcc";
    container.style.borderRadius = "16px";
    container.style.padding = "2rem";
  }
};

// 🔁 Show/hide "Compounded Per Year" input
function toggleFields() {
  const calcType = document.getElementById("calcType").value;
  const compounded = document.getElementById("compounded");

  compounded.style.display = (calcType === "compound") ? "block" : "none";
}

// 🧮 Main calculator logic
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
