function comprar() {
    let numBoletos = prompt("¿Cuántos boletos quieres comprar?");
    let precioBoletos = numBoletos * 10;
    let confirmacionCompra = confirm("El costo sería de " + precioBoletos + " Pesos. ¿Deseas confirmar la compra?");

    var idTransaccion = new Uint32Array(1);
    self.crypto.getRandomValues(idTransaccion);

    for (var i = 0; i < idTransaccion.length; i++) {
    }

    if (confirmacionCompra == true) {
        confirm("Gracias por tu compra, tu número de operación es " + idTransaccion);

        dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        dataLayer.push({
          event: "purchase", // Static value
          ecommerce: {
              transaction_id: idTransaccion,
              affiliation: "ADO web", 
              value: precioBoletos,
              tax: "0",
              currency: "MXN",
              coupon: null,
              items: [{
                item_name: "Veracruz - Puebla", // Origin and Destination
                item_id: "JAV - M4D", //Concatenate origin and destination ERPCO ID´s
                price: "10", // Price of ticket (visible price on search results card)
                item_brand: "ADO Platino", // Brand selected on search results
                item_category: "Adulto", // Kind of ticket (adulto, niño, INAPAM, Compra Anticipada, Por autobús paga menos)
                quantity: numBoletos
              }]
          }
        });
    }
}

function modificar() {
    let transaccionModificar = prompt("¿Cuál es tu ID de Transacción?");
    let boletosCompra = prompt("¿Cuántos boletos compraste?");
    let boletosModificar = prompt("¿Cuántos boletos quieres cancelar?");
    let confirmacionModificar = confirm("Vas a cancelar " + boletosModificar + " boletos, ¿deseas continuar?");

    if (confirmacionModificar == true) {
        confirm("Tus boletos fueron cancelados");

        if (boletosCompra - boletosModificar == 0) {
            dataLayer.push({ecommerce: null}); //Clear the previous ecommerce object
            dataLayer.push({
                event: "refund",
                ecommerce: {
                transaction_id: transaccionModificar
                }
            });
        } else {
            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            dataLayer.push({
                event: "refund",
                ecommerce: {
                    transaction_id: transaccionModificar, // Transaction ID
                    items: [{
                        item_name: "Veracruz - Puebla", // Origin and Destination
                        item_id: "JAV - M4D", // Concatenate origin and destination ERPCO ID´s
                        price: "10", // Price of ticket (visible on search results)
                        item_brand: "ADO Platino",
                        item_category: "Adulto", // Kind of ticket (adulto, niño, INAPAM, Compra Anticipada, Por autobús paga menos)
                        quantity: boletosModificar // Number of tickets purchased (only this kind of ticket, the other ones need to be another object)
                    }]
                }
            });
        }


    }

}