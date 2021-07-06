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

            <button class="button is-success" name="register" id="register" @click="Edit()">Editar</button><br>


        </div>
        
    </div>
</template>

<script>
import axios from "axios"
export default {
    created(){
        axios.get(`http://localhost/user/id/${this.user.id}`).then(data => {
            const idUser = this.user.id
            const user = data["data"]["0"]

            this.user = user
            this.user['id'] = idUser
            
            this.formData["name"] = user["name"]
            this.formData["email"] = user["email"]
            console.log(this.user)
        }).catch(err => {console.error(err)})
    },
    data(){
        return {
            formData:{
                name: "",
                email: "",
                errors: []
            },
            user: {
                id: this.$route.params.id
            }
        }
    },
    methods: {
        Edit(){
            if(this.formData.name == undefined || this.formData.name == "" || this.formData.name == " "){
                this.formData.errors.push("Campo name e invalido ou nulo")
            }
            if(this.formData.email == undefined || this.formData.email == "" || this.formData.email == " "){
                this.formData.errors.push("Campo email e invalido ou nulo")
            }

            if(this.formData.errors.length > 0){
                console.log("Campo Vazio")
            }else{

                const data = {
                    name: this.formData.name,
                    email: this.formData.email
                }

                const req = {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }

                axios.put(`http://localhost/edit/user/${this.user['id']}`,data,req).then(data => {
                    console.log(data)
                    this.$router.push({ name: 'Users' })
                }).catch(err => {console.error(err)})

            }
        }
    }
}
</script>

<style scoped>

</style>