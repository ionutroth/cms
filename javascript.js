const firebaseConfig = {
    apiKey: "AIzaSyDgjhup4oLJqvFuyiqe89cx1Jm4FOJcVGY",
    authDomain: "cms-project-eda4c.firebaseapp.com",
    projectId: "cms-project-eda4c",
    storageBucket: "cms-project-eda4c.appspot.com",
    messagingSenderId: "605487698777",
    appId: "1:605487698777:web:390ade14444d9c9f7b7248"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

const app = Vue.createApp({
    data(){
        return {
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
            testarray:[],
            firstNameSearch:"",
            lastNameSearch:"",
            emailSearch:"",
            dateStartSearch:"",
            dateEndSearch:"",
            emailModal:"",
            firstnameModal:"",
            lastnameModal:"",
            dateModal:"",
            sexModal:"",
            imageModal:"",
            editElementId:""
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

            if ((this.dateVerification == "true")&&(this.emailVerification == "true")&&(this.lastnameVerification == "true")&&(this.firstnameVerification == "true")){
                if (this.image != "C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"){
                    let selectedFile = document.querySelector('input[type=file]').files[0];
                    let reader = new FileReader();
                    reader.onload = function(e){
                        this.image = e.target.result;
                    }.bind(this)
                    reader.onerror = function(error){
                    alert(error);
                }
                reader.readAsDataURL(selectedFile);
                }else{
                    this.image = "C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png"
                }
                
                console.log(this.image)
                this.addToDB()
            }else{
                console.log("error");
            }
        },

        //get persons
        async searchSortPersons(){
            this.persons = [];
            const snapshot = await db.collection("Persons").get()
            return snapshot.docs.map(doc => {
                var validRow = "true";
                //search selection in firstname field
                if(this.firstNameSearch != ""){
                    var rowFirstname = doc.data().firstname.toLowerCase();
                    var selectionFirstname = this.firstNameSearch.toLowerCase();
                    if (rowFirstname.search(selectionFirstname) == -1){
                        validRow = "false";
                    }    
                }
                //search selection in lastname field
                if(this.lastNameSearch != ""){
                    var rowLastname = doc.data().lastname.toLowerCase();
                    var selectionLastname = this.lastNameSearch.toLowerCase();
                    if (rowLastname.search(selectionLastname) == -1){
                        validRow = "false";
                    }   
                }
                //search selection in email field
                if(this.emailSearch != ""){
                    var rowEmail = doc.data().email.toLowerCase();
                    var selectionEmail = this.emailSearch.toLowerCase();
                    if (rowEmail.search(selectionEmail) == -1){
                        validRow = "false";
                    }
                }
                //search selection by date start
                if (this.dateStartSearch != ""){
                    var rowDate = Date.parse(doc.data().date)
                    var start = Date.parse(this.dateStartSearch)
                    if (start > rowDate){
                        validRow = "false";
                    }
                }
                //search selection by date end
                if (this.dateEndSearch != ""){
                    var rowDate = Date.parse(doc.data().date)
                    var end = Date.parse(this.dateEndSearch)
                    if (end < rowDate){
                        validRow = "false";
                    }
                }

                //insert row in persons as object
                if (validRow == "true"){
                    this.persons.push(doc.data());
                    this.persons[this.persons.length - 1].dbId = doc.id;
                } 
            })
        },

        //clear all search fields
        clearSearchFields(){
            this.emailSearch = "";
            this.firstNameSearch = "";
            this.lastNameSearch = "";
            this.dateStartSearch = "";
            this.dateEndSearch = ""
        },

        //clear all form fields
        clearContent(){
            this.firstname="";
            this.lastname="";
            this.email="";
            this.date="";
            this.image="C:\\Users\\IonutRoth\\Documents\\GitHub\\cms\\user-2935373_960_720.png";
            this.sex="m";
            document.getElementById("avatar").src=this.image;
        },

        // change image on form
        uploadImage(){
            let selectedFile = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();
            reader.onload = function(e){
                this.image = e.target.result;
                document.getElementById("avatar").src=this.image;
            }.bind(this);
            reader.onerror = function(error){
                alert(error);
            };
            reader.readAsDataURL(selectedFile);
        },

        uploadImageModal(){
            let selectedFile = document.querySelector("#imageModal").files[0];
            let reader = new FileReader();
            reader.onload = function(e){ 
                this.imageModal= e.target.result;
                document.getElementById("avatarModal").src=this.imageModal;
            }.bind(this)
            reader.onerror = function(error){
                alert(error);
            };
            reader.readAsDataURL(selectedFile);
        },

        //sort persons by firstname by alphabet
        sortColumnFirstname(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.firstname.toLowerCase() + "_" + index)
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
            console.log(this.sortedPersons[0])
        },

        sortColumnLastname(){
            var rowsArray = [];
            var rowsArray2 = [];
            var rowsArray3 = [];
            var tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.lastname.toLowerCase() + "_" + index)
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
                rowsArray.push(person.email.toLowerCase() + "_" + index)
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

            console.log(rowsArray,rowsArray.sort())
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

        sortColumnFemale(){
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

        sortColumnAvatar(){
            let rowsArray = [];
            let rowsArray2 = [];
            let rowsArray3 = [];
            let tablecopy = this.persons
            this.persons.forEach(function (person,index){
                rowsArray.push(person.image + "_" + index)
            })
            console.log(rowsArray)
            rowsArray.sort((a,b) => a.length - b.length);
            rowsArray.forEach(function (item){
                rowsArray2.push(parseInt(item.split("_")[-1]))
            });
            
            rowsArray2.forEach(function (item){
                rowsArray3.push(tablecopy[item])
            });
            
            this.sortedPersons = JSON.parse(JSON.stringify(rowsArray3))
            
            if (this.sortingCurrently == "avatar"){
                this.sorting = !this.sorting;
                console.log(this.sortingCurrently, this.sorting);
                this.sortingCurrently = "";
            }
            else{
                this.sortingCurrently = "avatar";
                if (this.sorting = false){
                    this.sorting = !this.sorting
                }
            }
            console.log("merge")
        },

        sortColumnMale(){
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

        //add element to db
        async addToDB(){
            await db.collection("Persons").add({
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                sex: this.sex,
                date: this.date,
                image: this.image
                }
            ).then(function (){
                this.persons=[];
                this.selectFromDB()
                this.clearContent()
            }.bind(this))
        },
        
        //get all stuff from db
        async selectFromDB(){
            this.persons = [];
            const snapshot = await db.collection("Persons").get()
            return snapshot.docs.map(doc => {
                this.persons.push(doc.data());
                this.persons[this.persons.length - 1].dbId = doc.id;
                
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
    
                let formatedDate = doc.data().date.split("-")[0] + " " + months[doc.data().date.split("-")[1]] + " " + doc.data().date.split("-")[2];
                this.persons[this.persons.length - 1].date = formatedDate
                // console.log(this.persons);
            })
        },

        //delete element from db and refresh
        async deleteFromDB(id){
            await db.collection("Persons").doc(id).delete();
            this.selectFromDB();
        },

        //update element from db and refresh
        async updatePersonModal(){
            var idEdit = this.editElementId;
            let selectedFile = document.querySelector("#imageModal").files[0];
            let reader = new FileReader();
            reader.onload = function(e){ 
                this.imageModal= e.target.result;
            }.bind(this)
            reader.onerror = function(error){
                alert(error);
            };
            reader.readAsDataURL(selectedFile);
            await db.collection("Persons").doc(idEdit).update({
                firstname: this.firstnameModal,
                lastname: this.lastnameModal,
                email: this.emailModal,
                sex: this.sexModal,
                date: this.dateModal,
                image: this.imageModal
            }).then(function(){
                this.selectFromDB()
                this.clearModalInfo()
            }.bind(this))
        },

        //clear modal variables
        clearModalInfo(){
            this.firstnameModal = "",
            this.lastnameModal = "",
            this.emailModal = "",
            this.sexModal = "",
            this.date = "",
            this.imageModal = ""
        },

        //get info for the person that undergoes editing 
        async loadPersonModal(id){
            this.editElementId = id;
            console.log(this.editElementId);
            const snapshot = await db.collection("Persons").doc(id);
            snapshot.get().then(doc =>{
                console.log(doc.data())
                this.sexModal = doc.data().sex;
                this.firstnameModal = doc.data().firstname;
                this.lastnameModal = doc.data().lastname;
                this.lastname = doc.data().lastname;
                this.emailModal = doc.data().email;
                this.dateModal = doc.data().date;
                this.imageModal = doc.data().image;
            })
        },

        resetSorting(){
            this.sorting = !this.sorting
        }

    },
    beforeMount(){
        this.selectFromDB()
    }
});

app.mount("#aici");
