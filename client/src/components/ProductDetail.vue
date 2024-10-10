<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="find">
                    <td>{{ find.id }}</td>
                    <td>{{ find.name }}</td>
                    <td>
                        <img style="width: 100px; height: 60px" :src="find.image" alt="" />
                    </td>
                    <td>{{ find.price }}</td>
                    <td>{{ find.quantity }}</td>
                </tr>
                <tr v-else>
                    <td colspan="5">Product not found</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const listProduct = ref([]);
const route = useRoute();
const find = ref(null);

const getAllProduct = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    listProduct.value = data;
    const { id } = route.params;
    find.value = listProduct.value.find(product => product.id === +id);
};

onMounted(() => {
    getAllProduct();
});
</script>

<style></style>
