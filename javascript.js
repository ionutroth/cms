const app = Vue.createApp({
    data(){
        return {
            persons:[
                {firstname:"Bond", lastname:"James", email:"james@bond.com", sex:"y", date:"1999 July 17"},
                {firstname:"Trump", lastname:"Donald", email:"trump@maga.com", sex:"d", date:"1970 April 17"},
                {firstname:"Alah", lastname:"Akbar", email:"mia@khalifa.com", sex:"f", date:"1969 March 17"},
                {firstname:"Alah", lastname:"Aakbar", email:"memri@tv.com", sex:"m", date:"2020 Jan 17"}
            ],
            sortedPersons:[],
            sorting:false,
            sortingCurrently:"",
            firstname:"",
            lastname:"",
            email:"",
            date:"",
            image:"C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png",
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
                this.persons.push({firstname: this.firstname, lastname: this.lastname, email:this.email, sex:this.sex, date:formatedDate, image:this.image});
                console.log(this.persons[1]);
                this.clearContent();
            }else{
                console.log("error")
            }
        },

        clearContent(){
            this.firstname="";
            this.lastname="";
            this.email="";
            this.date="";
            this.image="C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png";
            this.sex="m"
        },

        deleteContent(index){
            this.persons.splice(index,1);
        },

        uploadImage: function(){
            var selectedFile = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();
            reader.onload = function(e){
                this.image = e.target.result
                console.log(this.image)
            };
            reader.onerror = function(error){
                alert(error);
            };
            reader.readAsDataURL(selectedFile);
            console.log(this.image)
        },

        sortColumnFirstname(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.firstname + "_" + index)
            });
            rowsArray.sort();
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[1]))
            });
            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            if (this.sortingCurrently == "firstname"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting);
                this.sortingCurrently = "";
            }else{
                this.sortingCurrently = "firstname";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting)
            }
        },

        sortColumnLastname(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.lastname + "_" + index)
            });
            rowsArray.sort();
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[1]))
            });
            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            if (this.sortingCurrently == "lastname"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting)
                this.sortingCurrently=""
            }else{
                this.sortingCurrently = "lastname";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting)
            }
        },

        sortColumnEmail(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.email + "_" + index)
            });
            rowsArray.sort();
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[1]))
            });

            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            if (this.sortingCurrently == "email"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting)
                this.sortingCurrently ="";
            }else{
                this.sortingCurrently = "email";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting)
            }
        },

        sortColumnSex(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.sex + "_" + index)
            });
            rowsArray.sort();
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[1]))
            });
            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            if (this.sortingCurrently == "sex"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting)
                this.sortingCurrently = "";
            }else{
                this.sortingCurrently = "sex";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting)
            }
        },

        sortColumnBirthday(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.date + "_" + index)
            });
            rowsArray.sort();
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[1]))
            });
            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            if (this.sortingCurrently == "birthday"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting);
                this.sortingCurrently ="";
            }else{
                this.sortingCurrently = "birthday";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting);
            }
        },

        selectFemale(){
            var rowsArray = [];
            var tablecopy = this.persons;
            this.persons.forEach(function (person,index){
                if (person.sex == "f")
                rowsArray.push(tablecopy[index])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sortingCurrently == "f"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting);
                this.sortingCurrently ="";
            }else{
                this.sortingCurrently = "f";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting);
            }
        },

        selectMale(){
            var rowsArray = [];
            var tablecopy = this.persons;
            this.persons.forEach(function (person,index){
                if (person.sex == "m")
                rowsArray.push(tablecopy[index])
            });
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sortingCurrently == "m"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting);
                this.sortingCurrently ="";
            }else{
                this.sortingCurrently = "m";
                if (this.sorting == false){
                    this.sorting = !this.sorting
                }
                console.log(this.sortingCurrently, this.sorting);
            }
        },

        searchFirstname(){
            var rowsArray = [];
            var tablecopy = this.persons;
            var selection = document.getElementById("firstnameinput").value.toLowerCase();
            this.persons.forEach(function(person, index){
                if(person.firstname.toLowerCase().search(selection) != -1){
                    rowsArray.push(tablecopy[index])
                }
            })
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sorting == false){
                this.sorting = !this.sorting
            }
        },

        searchLastname(){
            var rowsArray = [];
            var tablecopy = this.persons;
            var selection = document.getElementById("lastnameinput").value.toLowerCase();
            this.persons.forEach(function(person, index){
                if(person.lastname.toLowerCase().search(selection) != -1){
                    rowsArray.push(tablecopy[index])
                }
            })
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sorting == false){
                this.sorting = !this.sorting
            }
        },

        searchEmail(){
            var rowsArray = [];
            var tablecopy = this.persons;
            var selection = document.getElementById("emailinput").value.toLowerCase();
            this.persons.forEach(function(person, index){
                if(person.email.toLowerCase().search(selection) != -1){
                    rowsArray.push(tablecopy[index])
                }
            })
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sorting == false){
                this.sorting = !this.sorting
            }
        },

        searchBirthday(){
            var rowsArray = [];
            var tablecopy = this.persons;
            var start = parseInt(document.getElementById("start").value);
            var stop = parseInt(document.getElementById("stop").value);

            this.persons.forEach(function(person, index){
                if ((parseInt(person.date.split(" ")[0]) < stop) && (parseInt(person.date.split(" ")[0]) > start)){
                    rowsArray.push(tablecopy[index])
                }
            })
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray))
            if (this.sorting == false){
                this.sorting = !this.sorting
            }
        }


        // uploadImage(e){
        //     const selectedImage = e.target.files[0];
        //     this.convertImg(selectedImage);
        //     console.log(this.image)
        // },
        // convertImg(fileObj) {
        //     const reader = new FileReader();

        //     reader.onload = (e) => {
        //         this.image = e.target.result;
        //     };
        //     reader.readAsBinaryString(fileObj)
        
        // uploadImage: function() {    
        //     var file = document
        //       .querySelector('input[type=file]')
        //       .files[0];
        //     var reader = new FileReader();
        //     reader.onload = function(e) {
        //       vm.imageSrc = e.target.result             
        //     };
        //     reader.onerror = function(error) {
        //       alert(error);
        //     };
        //     reader.readAsDataURL(file);      
        //   }
    }
});

app.mount("#aici");