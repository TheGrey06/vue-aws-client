<script>
  import axios from "axios";

  export default {
    data() {
      return {
        accessKeyId: "",
        secretAccessKey: "",
        buckets: [],
        errorMessage: "",
      };
    },
    methods: {
      async fetchBuckets() {
        this.errorMessage = "";
        this.buckets = [];
        try {
          const response = await axios.get("http://localhost:8080/api/v1/buckets", {
            headers: {
              "x-aws-access-key-id": this.accessKeyId,
              "x-aws-access-key-secret": this.secretAccessKey,
            },
          });
          this.buckets = response.data.Buckets || [];
        } catch (error) {
          console.error(error);
          this.errorMessage =
            error.response?.data?.error || "Failed to fetch buckets.";
        }
      },
    },
  };
</script>

<template>
  <div id="app">
    <h1>AWS S3 Bucket Viewer</h1>
    <form @submit.prevent="fetchBuckets">
      <div>
        <label for="accessKeyId">Access Key ID:</label>
        <input
          type="text"
          id="accessKeyId"
          v-model="accessKeyId"
          required
        />
      </div>
      <div>
        <label for="secretAccessKey">Secret Access Key:</label>
        <input
          type="password"
          id="secretAccessKey"
          v-model="secretAccessKey"
          required
        />
      </div>
      <button type="submit">Get Buckets</button>
    </form>
    <div v-if="buckets.length">
      <h2>Bucket List</h2>
      <ul>
        <li v-for="bucket in buckets" :key="bucket.Name">
          {{ bucket.Name }} (Created on: {{ new Date(bucket.CreationDate).toLocaleString() }})
        </li>
      </ul>
    </div>
    <div v-else-if="errorMessage">
      <p class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  form {
    margin-bottom: 20px;
  }

  form div {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error {
    color: red;
  }

  h2 {
    margin-top: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>