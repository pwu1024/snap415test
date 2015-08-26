if (Meteor.isClient) {


    var ElecticVehicleCredit =
    {
        'Accord Plug-In Hybrid': 3626,
        'Azure Dynamics Transit Connect Electric Vehicle': 7500,
        'BMW i3 Sedan': 7500,
        'BMW i8': 3793,
        'Boulder Electric DV-500': 7500,
        'BYD e6 Electric Vehicle': 7500,
        'Fiat 500e': 7500,
        'CODA Sedan': 7500,
        'Electric Vehicles International (EVI) Electric truck': 7500,
        'EMC Model E36 (Electric Vehicle Manufactured by Electric Mobile Cars)': 7500,
        'Fisker Karma': 7500,
        'Ford Focus Electric': 7500,
        'Ford C-MAX Energi': 4007,
        'Ford Fusion Energi': 4007,
        'Cadillac ELR': 7500,
        'Chevrolet Volt': 7500,
        'Chevrolet Spark EV': 7500,
        'Kia Soul Electric': 7500,
        'Mercedes-Benz smart Coupe/Cabrio EV': 7500,
        'Mercedes-Benz B-Class EV': 7500,
        'Mitsubishi i-MiEV': 7500,
        'Nissan Leaf': 7500,
        'Porsche 918 Spyder': 3667,
        'Porsche Panamera S E Hybrid': 4751.80,
        'Porsche Caynee S E-Hybrid': 5335.60,
        'smart fortwo': 7500,
        'Tesla Roadster': 7500,
        'Tesla Model S': 7500,
        'Think City EV': 7500,
        'Toyota Prius Plug-in Electic Drive Vehicle': 2500,
        'Toyota RAV4 EV': 7500,
        'VIA 2500': 7500,
        'VIA 1500': 7500,
        'Volkswagen e-Golf': 7500,
        'Wheego LiFe Electric Vehicle': 7500,
        'Zenith Electric Van': 7500
    };

    var MortgageInterest = ["MORTGAGE","HOME OWNER","OUR HOUSE","NEW HOUSE", "MOVING TO A NEW HOUSE"];

    var Children = ["new baby","my daughter","my son"];


    window.fbAsyncInit = function() {
        FB.init({
            appId: '767971533313274',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.4' // use version 2.2
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            LoadInfo();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }


    function logout() {
        FB.logout(function(response) {
            // user is now logged out
        });
    }

    function facebookLogin() {
        var FB = window.FB;
        var scopes = 'public_profile,email, user_location, user_relationships, user_education_history, user_work_history, user_birthday, user_posts';

        FB.login(function(response) {
            if (response.status === 'connected') {
                console.log('The user has logged in!');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });

                FB.api('/me/permissions', function (response) {

                    console.log(response);

                } );
                LoadInfo();
            }
        }, {scope: scopes});
    }

    var relationship_status;


    function LoadInfo() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=id,name,email,relationship_status,work,birthday,location,education, posts, family', function(response) {
            console.log('Successful login for: ' + response);

            FB.api('/me/permissions', function (response) {

                console.log(response);

            } );

            console.log(response);

            document.getElementById('name_status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';

            document.getElementById('relationship_status').innerHTML =
                'Relationship status:' + response.relationship_status;

            relationship_status = response.relationship_status;
            Session.set('relationship_status',relationship_status);

            //console.log(response.relationship_status);
            //console.log(relationship_status);

            document.getElementById('work_status').innerHTML =
                'Work status:' + response.work[0].employer.name;

            document.getElementById('birthday').innerHTML =
                'Birthday:' + response.birthday;

            document.getElementById('location').innerHTML =
                'Location:' + response.location.name;

            document.getElementById('education').innerHTML =
                'Education:' + response.education[0].school.name +'('+ response.education[0].type + ')';

            if(response.family.data.length > 0)
            document.getElementById('family').innerHTML =
                'Family memeber:' + response.family.data[0].name +'('+ response.family.data[0].relationship + ')';



            var testpost = [];

            for(var i = 0; i< response.posts.data.length; i++)
            {
                testpost.push(response.posts.data[i].story);
            }

            document.getElementById('posts').appendChild(makeUL(testpost));



            console.log(response.posts);
        });
    }


  function makeUL(testarray) {
       // Create the list element:
       var list = document.createElement('ul');

       for(var i = 0; i < testarray.length; i++) {
           // Create the list item:
           var item = document.createElement('li');

           // Set its contents:
           item.appendChild(document.createTextNode(testarray[i]));

           // Add it to the list:
           list.appendChild(item);
        }

       // Finally, return the constructed list:
       return list;
  }


    function EITCCredit()
    {
        var numberofChildren = parseInt(Session.get('numberofChildren'));
        var income = parseInt(Session.get('income'));
        var relationship_status = Session.get('relationship_status');

        console.log('numberofchildren income relationship_status:'+numberofChildren+' '+income+' '+relationship_status);

        if(relationship_status == 'Married')
        {

            if(income<20330 && numberofChildren == 0)
                document.getElementById('eitccreditdetail').innerHTML =
                    'EITC Credit:' + ' $503';
            else if(income<44651 && numberofChildren == 1)
                document.getElementById('eitccreditdetail').innerHTML =
                    'EITC Credit:' + ' $3359';
            else if(income<49974 && numberofChildren == 2)
                document.getElementById('eitccreditdetail').innerHTML =
                    'EITC Credit:' + ' $5548';
            else if(income<53267 && numberofChildren >= 3)
                document.getElementById('eitccreditdetail').innerHTML =
                    'EITC Credit:' + ' $6242';
            else
                document.getElementById('eitccreditdetail').innerHTML =
                    'EITC Credit:' + ' unknown';
        }



    }


   Template.body.events({
        'click .fblogin': function (e) {
            e.preventDefault();
            console.log("You pressed the login button");
            facebookLogin();
        },

       'click .fblogout': function (e) {
           e.preventDefault();
           console.log("You pressed the logout button");
           logout();
       },

       "submit .income": function (event) {

           // Prevent default browser form submit

           event.preventDefault();



           // Get value from form element

           var income = event.target.income.value;

           console.log('income text:'+income);


           // Insert a task into the collection

           //Tasks.insert({

           //    text: text,

           //    createdAt: new Date() // current time

           //});


           Session.set('income',income);


           // Clear form

           //event.target.income.value = "";

       }


   });





    Template.incomecategories.helpers({
        categories: function(){
            console.log('relationship =' + Session.get('relationship_status'));
            if (Session.get('relationship_status') == 'Married')
                return ["0-150000", "300000-700000", "700000-10000000", "1000000-1500000"]
            else
                return ["150000-300000", "300000-700000", "700000-10000000", "1000000-1500000"]

        }
    });

    Template.incomecategories.events({
        "change #category-select": function (event, template) {
            var category = $(event.currentTarget).val();
            console.log("incomecategory : " + category);
            // additional code to do what you want with the category
        }
    });


    Template.filingstatus.helpers({
        categories: function(){
            console.log('relationship =' + Session.get('relationship_status'));
            if (Session.get('relationship_status') == 'Married')
                return ["filing jointly", "filing separatly"]
            else
                return ["single filer", "head of household"]

        }
    });

    Template.filingstatus.events({
        "change #category-select": function (event, template) {
            var category = $(event.currentTarget).val();
            console.log("filing status : " + category);
            // additional code to do what you want with the category
        }
    });


    Template.childrencategories.helpers({
        categories: function(){
            return ["0", "1", "2", "3", "4", "5", "6", "7", "8"]

        }
    });

    Template.childrencategories.events({
        "change #category-select": function (event, template) {
            var category = $(event.currentTarget).val();
            console.log("childrencategory : " + category);
            Session.set('numberofChildren',category);

            // additional code to do what you want with the category
        }
    });

    Template.eitccredit.events = {
        'click #eitccreditreview': function(){
            EITCCredit();
        }
    }

    /*

    Template.incomecategories.helpers({
        incomecategories: function(){

            console.log('relationship =' + Session.get('relationship_status'));
            if (Session.get('relationship_status') == 'Married')
            return ["100000-300000", "300000-700000", "700000-10000000", "1000000-1500000"]
            else
            return ["150000-300000", "300000-700000", "700000-10000000", "1000000-1500000"]
        }
    });

    Template.incomecategories.events({
        "change #incomecategory": function (event, template) {
            var incomecategory = $(event.currentTarget).val();
            console.log("incomecategory : " + incomecategory);
            // additional code to do what you want with the category
        }
    });


    Template.childrencategories.helpers({
        childrencategories: function(){

            //console.log('relationship =' + Session.get('relationship_status'));
            //if (Session.get('relationship_status') == 'Married')
                //return ["100000-300000", "300000-700000", "700000-10000000", "1000000-1500000"]
            //else
                return ["0", "1", "2", "3"]
        }
    });

    Template.childrencategories.events({
        "change #childrencategory": function (event, template) {
            var childrencategory = $(event.currentTarget).val();
            console.log("childrencategory : " + childrencategory);
            // additional code to do what you want with the category
        }
    });*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
