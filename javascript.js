const app = Vue.createApp({
    data(){
        return {
            persons:[
                {firstname:"Bond", lastname:"James", email:"james@bond.com", sex:"y", date:"2021 July 17"}
            ],
            firstname:"",
            lastname:"",
            email:"",
            date:"",
            image:"user-2935373_960_720.png",
            sex:"m",
            passable:"false",
            firstnameVerification:"false",
            lastnameVerification:"false",
            emailVerification:"false",
            dateVerification:"false"
        };
    },
    methods:{
        verifyContent(){

            let verification1 = "false";
            let verification2 = "false";
            let verification3 = "false";
            let verification4 = "false";
            let verification5 = "false";
            let verification6 = "false";
            let verification7 = "false";
            let regex = /[^a-zA-Z0-9]/g;
            let regexEmail = /[^a-zA-Z0-9@.]/g;
            let regexAt = /[@]/g;
            //firstname verification
            let firstnameUnwantedChars = this.firstname.match(regex);
            if (firstnameUnwantedChars == null ){
                verification1 = "true";
            }else{
                verification1 = "false";
                console.log("v1 error", firstnameUnwantedChars);
            }
            if (this.firstname.length > 4){
                verification2 = "true";
            }else{
                verification2 = "false";
                console.log("v2 error");
            }
            if ((verification2 == "true") && (verification1=="true")){
                this.firstnameVerification = "true";
            }else{
                this.firstnameVerification = "false";
            }
            //lastname verification
            let lastnameUnwantedChars = this.lastname.match(regex);
            if (lastnameUnwantedChars == null ){
                verification3 = "true";
            }else{
                verification3 = "false";
                console.log("v3 error");
            }
            if (this.lastname.length > 4){
                verification4="true";
            }else{
                verification4="false";
                console.log("v4 error");
            }
            if ((verification3 == "true") && (verification4=="true")){
                this.lastnameVerification = "true";
            }else{
                this.lastnameVerification = "false"
            }
            //email verification
            let emailUnwantedChars = this.email.match(regexEmail);
            if(emailUnwantedChars == null){
                verification5="true";
            }else{
                verification5="false";
                console.log("v5 error", emailUnwantedChars);
            }
            let emailAtChar = this.email.match(regexAt);
            if (emailAtChar == null){
                verification6="false";
                console.log("v6 error", this.email, emailAtChar);
            }else{
                verification6="true";
                console.log("v6 success", this.email, emailAtChar);
            }
            if (this.email.length > 4){
                verification7="true";
            }else{
                verification7="false";
                console.log("v7 error");
            }
            if ((verification7 == "true") && (verification6 == "true") && (verification5 == "true")){
                this.emailVerification = "true";
            }else{
                this.emailVerification = "false";
            }
            //date verification
            if (this.date.length != 0 ){
                this.dateVerification = "true";
            } else{
                this.dateVerification = "false";
                console.log("date error")
            }

            let months = {
                "01":"January",
                "02":"February",
                "03":"March",
                "04":"April",
                "05":"May",
                "06":"June",
                "07":"July",
                "08":"August",
                "09":"September",
                "10":"October",
                "11":"November",
                "12":"December"
            };

            let formatedDate = this.date.split("-")[0] + " " + months[this.date.split("-")[1]] + " " + this.date.split("-")[2];

            if ((this.dateVerification == "true")&&(this.emailVerification == "true")&&(this.lastnameVerification == "true")&&(this.firstnameVerification == "true")){
                console.log(this.firstname,this.lastname,this.email,this.sex, this.date)
                this.persons.push({firstname: this.firstname, lastname: this.lastname, email:this.email, sex:this.sex, date:formatedDate});
                console.log(this.persons[1]);
            }else{
                console.log("error")
            }
        },
        clearContent(){
            this.firstname="";
            this.lastname="";
            this.email="";
            this.date="";
            this.image="";
            this.sex="m"
        },
        deleteContent(index){
            this.persons.splice(index,1);
        }
    }
});

app.mount("#aici");