<template>
    <br>
    <br>
    <br>
    <br>

    <div v-for="error in formData.errors" :key="error.id">
        <div class="notification is-danger" style="margin-right:450px; margin-left:450px;">
            {{ error.text }}
        </div><br>
    </div>

    <div class="columns is-centered">

        <div class="column is-half" style="background:#d9d9d9; border-radius:5px;">

            <br>
        
            <label for="email"><strong>Email</strong></label>
                <input type="email" class="input" name="email" id="email" v-model="formData.email"><br><br>
            
            <label for="password"><strong>Senha</strong></label>
                <input type="password" class="input" name="password" id="password" v-model="formData.password"><br><br><br>

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
                email: "",
                password: "",
                errors: []
            }
        }
    },
    methods: {
        register(){

            if(this.formData.email == undefined || this.formData.email == "" || this.formData.email == " "){
                this.formData.errors.push({id: Date.now(),text: "Campo email e invalido ou nulo"})
            }
            if(this.formData.password == undefined || this.formData.password == "" || this.formData.password == " "){
                this.formData.errors.push({id: Date.now(),text: "Campo password e invalido ou nulo"})
            }

            if(this.formData.errors.length > 0){
                console.log("Campo Vazio")
            }else{

                const data = {
                    email: this.formData.email,
                    password: this.formData.password
                }

                axios.post('http://localhost/login',data).then(data => {
                    localStorage.setItem('token', data.data["token"]);
                    this.$router.push({ name: 'Home' });
                }).catch(err => {
                    const Arr = String(err).split(" ");
                    const error = Arr[Arr.length - 1];
                    
                    if(error == 404 || error == "404"){
                        this.formData.errors.push({id: Date.now(),text: "Email Nao Encontrado"});
                        return;
                    }
                    if(error == 401 || error == "401"){
                        this.formData.errors.push({id: Date.now(),text: "Senha Incorreta"});
                        return;
                    }
                    if(error == 501 || error == '501'){
                        this.formData.errors.push({id: Date.now(),text: "Erro interno, Tente novamente..."});
                        return;
                    }
                })
                
            }
        }
    }
}
</script>

<style scoped>

</style>