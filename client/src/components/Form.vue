<script>
  import axios from "axios";
    export default {
        data() {
            return {
                accessKeyId: "",
                secretAccessKey: "",
                buckets: [],
                errorMessage: "",
            }
        },
        methods: {
            async fetchBuckets() {
                this.errorMessage = "";
                this.buckets= [];
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
    }
}}
</script>

<template>
    <div>
        <form @submit.prevent="fetchBuckets" class="w-full max-w-sm mt-10  ">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        AWS Key ID
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
             id="accessKeyId" 
             v-model="accessKeyId" 
             type="text" 
             placeholder="Past you Key ID"
             >
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
        AWS Key Secret
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
             id="secretAccessKey"
             v-model="secretAccessKey"                        
             type="password" 
             placeholder="******************"
             required
             >
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>

  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="submit">
        Log in
      </button>
    </div>
  </div>
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