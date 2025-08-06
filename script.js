function toggleFields() {
  const type = document.getElementById("calcType").value;
  const compoundField = document.getElementById("compounded");

  compoundField.style.display = (type === "compound") ? "block" : "none";
}

function calculate() {
  const type = document.getElementById("calcType").value;
  const P = parseFloat(document.getElementById("principal").value);
  const R = parseFloat(document.getElementById("rate").value);
  const T = parseFloat(document.getElementById("time").value);
  const N = parseFloat(document.getElementById("compounded").value) || 1;

  let resultText = "";

  if (isNaN(P) || isNaN(R) || isNaN(T)) {
    resultText = "Please enter valid numbers.";
  } else if (type === "simple") {
    const SI = (P * R * T) / 100;
    resultText = `Simple Interest: ₹${SI.toFixed(2)}<br>Total Amount: ₹${(P + SI).toFixed(2)}`;
  } else if (type === "compound") {
    const amount = P * Math.pow((1 + R / (100 * N)), N * T);
    const CI = amount - P;
    resultText = `Compound Interest: ₹${CI.toFixed(2)}<br>Total Amount: ₹${amount.toFixed(2)}`;
  } else if (type === "loan") {
    const monthlyRate = R / 12 / 100;
    const months = T * 12;
    const EMI = (P * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = EMI * months;
    const totalInterest = totalPayment - P;
    resultText = `Monthly EMI: ₹${EMI.toFixed(2)}<br>Total Interest: ₹${totalInterest.toFixed(2)}<br>Total Payment: ₹${totalPayment.toFixed(2)}`;
  }

  document.getElementById("result").innerHTML = resultText;
}
