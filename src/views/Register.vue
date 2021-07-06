<template>
    <br>
    <br>
    <br>
    <br>

    <div v-for="(error,index) in formData.errors" :key="index">
        <div class="notification is-danger" style="margin-right:450px; margin-left:450px;">
            {{ error }}
        </div><br>
    </div>

    <div class="columns is-centered">

        <div class="column is-half" style="background:#d9d9d9; border-radius:5px;">

            <br>

            <label for="name"><strong>Nome</strong></label>
                <input type="text" class="input" name="name" id="name" v-model="formData.name" required><br><br>
        
            <label for="email"><strong>Email</strong></label>
                <input type="email" class="input" name="email" id="email" v-model="formData.email" required><br><br>
            
            <label for="password"><strong>Senha</strong></label>
                <input type="password" class="input" name="password" id="password" v-model="formData.password" required><br><br><br>

            <button class="button is-success" name="register" id="register" @click="register()">Registrar</button><br>


        </div>
        
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return {
            formData:{
                name: "",
                email: "",
                password: "",
                errors: []
            }
        }
    },
    methods: {
        register(){
            if(this.formData.name == undefined || this.formData.name == "" || this.formData.name == " "){
                this.formData.errors.push("Campo name e invalido ou nulo")
            }
            if(this.formData.email == undefined || this.formData.email == "" || this.formData.email == " "){
                this.formData.errors.push("Campo email e invalido ou nulo")
            }
            if(this.formData.password == undefined || this.formData.password == "" || this.formData.password == " "){
                this.formData.errors.push("Campo password e invalido ou nulo")
            }

            if(this.formData.errors.length > 0){
                console.log("Campo Vazio")
            }else{

                const data = {
                    name: this.formData.name,
                    email: this.formData.email,
                    password: this.formData.password
                }

                axios.post('http://localhost/user',data).then(data => {
                    console.log(data)
                    window.location.href = "http://localhost:8080/login"
                }).catch(err => {console.error(err)})

            }
        }
    }
}
</script>

<style scoped>

</style>