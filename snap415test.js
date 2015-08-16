if (Meteor.isClient) {


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
        FB.api('/me?fields=id,name,email,relationship_status,work,birthday,location,education, posts', function(response) {
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



   Template.body.events({
        'click .fblogin': function (e) {
            e.preventDefault();
            console.log("You pressed the login button");
            facebookLogin();

            posts[0] = "This is task 0";
            console.log("new task set");
        },

       'click .fblogout': function (e) {
           e.preventDefault();
           console.log("You pressed the logout button");
           logout();
       }
   });





    Template.incomecategories.helpers({
        categories: function(){
            console.log('relationship =' + Session.get('relationship_status'));
            if (Session.get('relationship_status') == 'Married')
                return ["100000-300000", "300000-700000", "700000-10000000", "1000000-1500000"]
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

    Template.childrencategories.helpers({
        categories: function(){
            return ["0", "1", "2", "3"]

        }
    });

    Template.childrencategories.events({
        "change #category-select": function (event, template) {
            var category = $(event.currentTarget).val();
            console.log("childrencategory : " + category);
            // additional code to do what you want with the category
        }
    });

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
