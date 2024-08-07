function getProducts() {
  fetch('http://192.168.80.3:5003/api/products')
    .then((response) => response.json())
    .then((data) => {
      // Handle success
      console.log(data);

      let productsListBody = document.querySelector('#product-list tbody');
      productsListBody.innerHTML = '';

      data.forEach((product) => {
        let row = document.createElement('tr');

        // Name
        let nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // Email
        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Username
        let priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        // Actions
        let actionsCell = document.createElement('td');

        // Edit link
        let editLink = document.createElement('a');
        editLink.href = `/editProduct/${product.id}`;
        //editLink.href = `edit.html?id=${product.id}`;
        editLink.textContent = 'Edit';
        editLink.className = 'btn btn-primary mr-2';
        actionsCell.appendChild(editLink);

        // Delete link
        let deleteLink = document.createElement('a');
        deleteLink.href = '#';
        deleteLink.textContent = 'Delete';
        deleteLink.className = 'btn btn-danger';
        deleteLink.addEventListener('click', function () {
          deleteProduct(product.id);
        });
        actionsCell.appendChild(deleteLink);

        row.appendChild(actionsCell);

        productsListBody.appendChild(row);
      });
    });
}

function createProduct() {
  let data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
  };

  fetch('http://192.168.80.3:5003/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!(response.status === 201)) {
        throw new Error('Error creating product');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => console.error('Error:', error));
}

function deleteProduct(id) {
  console.log('Deleting product with id: ', id);
  if (confirm('Are you sure you want to delete this product?')) {
    fetch(`http://192.168.80.3:5003/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!(response.status === 202)) {
          throw new Error('Error deleting product');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        getProducts();
      })
      .catch((error) => console.error('Error:', error));
  }
}

function updateProduct() {
  let productId = document.getElementById('product-id').value;
  let data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
  };

  fetch(`http://192.168.80.3:5003/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!(response.status === 202)) {
        throw new Error('Error updating product');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => console.error('Error:', error));
}

function getProduct(id) {
  fetch(`http://192.168.80.3:5003/api/products/${id}`)
    .then((response) => {
      if (!(response.status === 200)) {
        throw new Error('Error getting product');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      document.getElementById('product-id').value = data.id;
      document.getElementById('name').value = data.name;
      document.getElementById('description').value = data.description;
      document.getElementById('price').value = data.price;
    })
    .catch((error) => console.error('Error:', error));
}
