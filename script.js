document.getElementById("cotizadorForm").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevenir el envío del formulario

  // Obtener valores del formulario
  const moneda = document.getElementById("moneda").value;
  const plan = document.getElementById("plan").value;
  const valorProducto = parseFloat(document.getElementById("valorProducto").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const descripcion = parseFloat(document.getElementById("descripcion").value);

  const tipoCambio = 7.95;  // Tipo de cambio fijo

  // Precio por libra según el plan
  let precioPorLibra = plan === "regular" ? 2.95 : 2.60;

  // Flete = (costo por libra * peso) * 1.12
  let flete = (precioPorLibra * peso) * 1.12;

  // Desaduanaje = Si valor del producto es menor a $100, entonces $2.80; si es mayor, $5.60
  let desaduanaje = valorProducto < 100 ? 2.80 : 5.60;

  // Entrega = $2.80 para Boxex Regular, $0 para Boxex Premium
  let entrega = plan === "regular" ? 2.80 : 0;

  // Flete efecto CIF = $1 por libra
  let fleteEfectoCIF = peso * 1;

  // Seguro CIF = valor del producto * 2.2%
  let seguroCIF = valorProducto * 0.022;

  // CIF = valor del producto + flete efecto CIF + seguro CIF
  let CIF = valorProducto + fleteEfectoCIF + seguroCIF;

  // DAI = CIF * arancel del producto
  let DAI = CIF * descripcion;

  // IVA = (CIF + DAI) * 12%
  let IVA = (CIF + DAI) * 0.12;

  // Cotización final
  let cotizacionFinal = valorProducto + flete + desaduanaje + entrega + DAI + IVA;

  // Si la moneda es quetzales, convertir la cotización
  if (moneda === "gtq") {
    flete *= tipoCambio;
    desaduanaje *= tipoCambio;
    entrega *= tipoCambio;
    DAI *= tipoCambio;
    IVA *= tipoCambio;
    cotizacionFinal *= tipoCambio;
  }

  // Mostrar resultados
  document.getElementById("resultado").innerHTML = `
    <h3>Boxex Services:</h3>
    <p><strong>Flete:</strong> ${moneda === "usd" ? "$" : "Q"}${flete.toFixed(2)}</p>
    <p><strong>Desaduanaje:</strong> ${moneda === "usd" ? "$" : "Q"}${desaduanaje.toFixed(2)}</p>
    <p><strong>Entrega:</strong> ${moneda === "usd" ? "$" : "Q"}${entrega.toFixed(2)}</p>

    <h3>Impuestos:</h3>
    <p><strong>DAI:</strong> ${moneda === "usd" ? "$" : "Q"}${DAI.toFixed(2)}</p>
    <p><strong>IVA:</strong> ${moneda === "usd" ? "$" : "Q"}${IVA.toFixed(2)}</p>

    <h3>Cotización Final:</h3>
    <p><strong>Total:</strong> ${moneda === "usd" ? "$" : "Q"}${cotizacionFinal.toFixed(2)}</p>
  `;
});
