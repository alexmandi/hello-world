// Url for the request 
var url = 'http://d22vmlz7i1p2m8.cloudfront.net:80/';

fetch(url + "products", { method: 'GET' })
    .then(Result => Result.json())
    .then(string => {
        var products = string.data;
        let content = '';
        if (products.length == 0) {
            content += `
                        <tr>
                            <td>No products</td>
                        </tr>
                        `
        }
        let counter = 0;
        products.forEach(product => {
            counter++;
            content += `
                            <tr>
                                <td>${counter}</td>
                                <td>${product.serial}</td>
                                <td>${product.name}</td>
                                <td>${product.price}&euro;</td>
                                <td>${product.category.description}</td>
                            </tr>
                        `
        })
        document.querySelector("#table-body-products").innerHTML = content;
    })
    .catch(errorMsg => { console.log(errorMsg); });


function getOrder(form) {
    id = form.orderId.value;
    fetch(url + "orders/" + id, { method: 'GET' })
        .then(Result => Result.json())
        .then(string => {
            var order = string.data;
            let content = '';
            if (order == null) {
                content += `
                                <h2>Order not found</h2>
                            `
            }
            else {
                content += `
                            <div class="row" align="center">
                            <div class="col">
                                <h4>Customer</h4>
                                <form>
                                    <fieldset disabled>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">First Name</label>
                                                <input class="form-control" value="${order.customer.firstname}">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="inputPassword4">Last Name</label>
                                                <input class="form-control" value="${order.customer.lastname}">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputEmail4">Email</label>
                                                <input class="form-control" value="${order.customer.email}">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="inputPassword4">Address</label>
                                                <input class="form-control" value="${order.customer.address}">
                                            </div>
                                        </div>
                                        <br>
                                        <h4>Order Details</h4>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Submission Date</label>
                                                <input class="form-control" value="${order.submitDate}">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>Payment Method</label>
                                                <input class="form-control" value="${order.paymentMethod}">
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>Total Cost</label>
                                                <input class="form-control" value="${order.cost}">
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                                <table class="table table-hover">
                                    <thead>
                                    <tr class="table-light">
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Individual Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    `
                        order.orderItems.forEach(item => {
                            content += `
                                        <tr class="table">
                                            <td>${item.product.name}</td>
                                            <td align="center">${item.quantity}</td>
                                            <td align="right">${item.price}</td>
                                        </tr>
                                        `
                        })
                        content+=`
                                    </tbody>
                                    </table>
                                    </div>
                                    </div>
                                 `
            }
            document.querySelector("#order-result").innerHTML = content;
        })
        .catch(errorMsg => { console.log(errorMsg); });
}    