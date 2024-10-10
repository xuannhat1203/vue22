<template>
  <div>
    <select @change="onSortChange">
        <option value="1">--Chọn giá--</option>
        <option value="2">Thấp đến cao</option>
        <option value="3">Cao đến thấp</option>
      </select>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in listProduct" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>
            <img
              style="width: 100px; height: 60px"
              :src="product.image"
              alt=""
            />
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button @click="getProductDetail(product.id)">Get Details</button>
            <button @click="deleteProduct(product.id)">Delete</button>
            <button @click="editProduct(product.id)">Cập nhập</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <input placeholder="Tên sản phẩm" v-model="newProduct.name" type="text" />
      <input placeholder="Hình ảnh" v-model="newProduct.image" type="text" />
      <input placeholder="Giá" v-model="newProduct.price" type="text" />
      <input placeholder="Số lượng" v-model="newProduct.quantity" type="text" />
      <button @click="addProduct">ADD PRODUCT</button>
    </div>
    <div v-show="isButton">
      <input type="text" v-model="updateProduct.name" />
      <input type="text" v-model="updateProduct.price" />
      <input type="text" v-model="updateProduct.quantity" />
      <input type="text" v-model="updateProduct.image" />
      <button @click="confirmEdit">Cập Nhật</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const listProduct = ref([]);
const router = useRouter();
const id = ref(null);
const updateProduct = {
  name: "",
  price: "",
  quantity: "",
  image: "",
};
const newProduct = ref({
  name: "",
  price: "",
  quantity: "",
  image: "",
});
const inputValue = ref("");
const isButton = ref(false);
// Lấy
const getAllProduct = async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  listProduct.value = data;
};
onMounted(() => {
  getAllProduct();
});
const getProductDetail = (id) => {
  router.push(`/${id}`);
};
// Xóa
const deleteProduct = async (id) => {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
  getAllProduct();
};
// Thêm
const addProduct = async () => {
  const newP = {
    name: newProduct.value.name,
    image: newProduct.value.image,
    price: newProduct.value.price,
    quantity: newProduct.value.quantity,
  };

  await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newP),
  });
  newProduct.value = {
    name: "",
    price: "",
    quantity: "",
    image: "",
  };
  await getAllProduct();
};
// Cập nhật
const editProduct = async (productId) => {
  const productToEdit = listProduct.value.find(
    (product) => product.id === productId
  );
  if (productToEdit) {
    updateProduct.name = productToEdit.name;
    updateProduct.price = productToEdit.price;
    updateProduct.image = productToEdit.image;
    updateProduct.quantity = productToEdit.quantity;
    isButton.value = true;
    id.value = productId;
  }
};

const confirmEdit = async () => {
  const find = listProduct.value.find((product) => product.id === +id.value);
  if (find) {
    find.name = updateProduct.name;
    find.price = updateProduct.price;
    find.image = updateProduct.image;
    find.quantity = updateProduct.quantity;
  }
  await fetch(`http://localhost:3000/products/${id.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(find),
  });
  await getAllProduct();
  isButton.value = false;
  updateProduct.name = "";
  updateProduct.price = "";
  updateProduct.image = "";
  updateProduct.quantity = "";
};
// Hàm sắp xếp sản phẩm theo giá
const onSortChange = (event) => {
  const sortValue = event.target.value;
  if (sortValue === "2") {
    sortProducts();
  } else if (sortValue === "3") {
    sortProducts2();
  }
};
const sortProducts = () => {
  listProduct.value.sort((a, b) => {
    return parseFloat(a.price) - parseFloat(b.price);
  });
};
const sortProducts2 = () => {
  listProduct.value.sort((a, b) => {
    return parseFloat(b.price) - parseFloat(a.price); 
  });
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #007bff;
  color: white;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

img {
  border-radius: 5px;
}

input[type="text"] {
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: calc(25% - 12px);
}

button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

button:focus {
  outline: none;
}

button:last-child {
  background-color: #dc3545;
}

button:last-child:hover {
  background-color: #c82333;
}
</style>
