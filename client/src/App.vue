<script>
    import Navbar from "./components/Navbar.vue"
    import Form from "./components/Form.vue"
    export default {
  components: {
    Navbar,
    Form
  }
}
</script>

<template>
    <div>
      <Navbar/>
      <div class="flex flex-col items-center justify-center bg-gray-100 p-4">
        <Form/>
      </div>

    </div>
        
 
</template>