const firebaseConfig = {
    apiKey: "AIzaSyDgjhup4oLJqvFuyiqe89cx1Jm4FOJcVGY",
    authDomain: "cms-project-eda4c.firebaseapp.com",
    projectId: "cms-project-eda4c",
    storageBucket: "cms-project-eda4c.appspot.com",
    messagingSenderId: "605487698777",
    appId: "1:605487698777:web:390ade14444d9c9f7b7248"
};

firebase.initializeApp(firebaseConfig);

const app = Vue.createApp({
    data(){
        return {
            // persons:[
            //     {firstname:"Bond", lastname:"James", email:"james@bond.com", sex:"y", date:"1999 July 17", image:"C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"},
            //     {firstname:"Trump", lastname:"Donald", email:"trump@maga.com", sex:"d", date:"1970 April 17", image:"C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"},
            //     {firstname:"Alah", lastname:"Akbar", email:"mia@khalifa.com", sex:"f", date:"1969 March 17", image:"C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"},
            //     {firstname:"Alah", lastname:"Aakbar", email:"memri@tv.com", sex:"m", date:"2020 Jan 17", image:"C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"}
            // ],
            persons:[],
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
            dateVerification:"false",
            testarray:[]
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
            if ((verification3 == "true") && (verification4 == "true")){
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
                // console.log(this.firstname,this.lastname,this.email,this.sex, this.date, this.image);
                this.persons.push({firstname: this.firstname, lastname: this.lastname, email:this.email, sex:this.sex, date:formatedDate, image:this.image});
                var selectedFile = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.onload = function(e){
                    this.persons[this.persons.length - 1].image = e.target.result;
                }.bind(this);
                reader.onerror = function(error){
                    alert(error);
                }
                reader.readAsDataURL(selectedFile);
                console.log(this.image)
                this.addToDB();
                this.persons = [];
                this.selectFromDB();
                this.clearContent();
            }else{
                console.log("error");
            }
        },

        clearContent(){
            this.firstname="";
            this.lastname="";
            this.email="";
            this.date="";
            this.image="C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png";
            this.sex="m";
        },

        deleteSortedContent(index, ogIndex){
            this.persons.splice(ogIndex,1);
            this.sortedPersons.splice(index,1);
        },

        uploadImage: function(){
            var selectedFile = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();
            reader.onload = function(e){
                this.image = e.target.result;
                document.getElementById("avatar").src=this.image;
            }.bind(this);
            reader.onerror = function(error){
                alert(error);
            };
            reader.readAsDataURL(selectedFile);
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
            rowsArray3.forEach(function (element, index){
                element.ogIndex = rowsArray2[index];
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
            console.log(this.sortedPersons[0])
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
        },

        addToDB(){
            let cloudDB = firebase.firestore();
            cloudDB.collection("Persons").add({
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                sex: this.sex,
                date: this.date,
                image: this.image
                }
            ).then(function (docRef){
                console.log("written with Id:",docRef.id)
                }
            ).catch(function(error){
                console.error("eroare", error)
            })
        },
        
        async selectFromDB(){
            let db = firebase.firestore();
            const snapshot = await db.collection("Persons").get()
            return snapshot.docs.map(doc => {
                this.persons.push(doc.data());
                this.persons[this.persons.length - 1].dbId = doc.id;
                console.log(this.persons);
            })
        },

        cevaaa(){
            console.log(this.persons[this.persons.length - 1].dbId)
        },

        deleteFromDB(id){
            let db = firebase.firestore();
            db.collection("Persons").doc(id).delete();
            this.persons = [];
            this.selectFromDB();
        },

        deleteFromSortedDB(id){
            let db = firebase.firestore();
            db.collection("Persons").doc(id).delete();
            this.persons = [];
            this.selectFromDB();
            if (this.sortingCurrently == "firstname"){
                this.sortColumnFirstname();
            }else if (this.sortingCurrently == "lastname"){
                this.sortColumnLastname();
            }else if (this.sortingCurrently == "email"){
                this.sortColumnEmail();
            
            }else if (this.sortingCurrently == "birthday"){

            }
        }

    },

    beforeMount(){
        this.selectFromDB()
    }
});

app.mount("#aici");


