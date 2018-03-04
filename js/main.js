/*--------------- registration ---------------*/

var formHide = true;
var regField = document.forms.regFields;

$('.registration__btn').click(function () {
    $('.registration__congrats').hide();
    if (formHide == true) {
        $('.registration__form').slideDown(1000);
        formHide = false;
    } else {
        $('.registration__form').slideUp(1000);
        formHide = true;
    };
});

$('.registration__form-done').click(function () {
    name = regField[0].value;
    sname = regField[1].value;
    nick = regField[2].value;
    pass = regField[3].value;
    age = regField[4].value;
    country = regField[5].value;
    about = $('.registration__form textarea').val();

    if (name == '' || sname == '' || nick == '' || pass == '') {
        alert('please, fill up the required fields');
        return;
    };

    for (var i in users) {
        if (users[i].nick == nick) {
            alert('this nickname is already taken. please, choose another one');
            return;
        };
    };

    var newUser = new user();
    users.push(newUser);

    for (i = 0; i <= 5; i++) {
        regField[i].value = '';
    }

    $('.registration__form textarea').val('');

    $('.registration__form').hide();
    $('.registration__congrats').show();
    formHide = true;
});

$('.registration__sighIn').click(function () {
    var check = false;
    if ($('.registration__logIn input:eq(0)').val() == '' || $('.registration__logIn input:eq(1)').val() == '') {
        alert('please, enter your nickname and password');
    } else {
        for (var i in users) {
            if (users[i].nick == $('.registration__logIn input:eq(0)').val() && users[i].pass == $('.registration__logIn input:eq(1)').val()) {
                $('.page').css('display', 'block');
                $('.registration').css('display', 'none');
                $('header').css('height', '160px');
                $('.header__menu').css('display', 'flex');

                $('.profile__userData tr:eq(0) td:eq(0)').html(users[i].name + ' ' + users[i].sname);
                $('.profile__userData tr:eq(1) td:eq(1)').html(users[i].nick);
                $('.profile__userData tr:eq(2) td:eq(1)').html(users[i].age + ' y.o.');
                $('.profile__userData tr:eq(3) td:eq(1)').html(users[i].country);
                $('.profile__userData tr:eq(4) td:eq(0)').html('<p>about ' + users[i].name + ':</p>' + users[i].about);

                if (users[i].friends.length != 0) {
                    for (var f in users[i].friends) {
                        for (var u in users) {
                            if (users[u].nick == users[i].friends[f]) {
                                $('.profile__friends ul').append('<li><a href="#">' + users[u].name + ' ' + users[u].sname + '</a></li>');
                            };
                        };
                    };
                    $('.profile__friends p').text('friends list:');
                } else {
                    $('.profile__friends p').text('Your friends list is empty :(');
                };

                if (users[i].blackList.length != 0) {
                    for (var f in users[i].blackList) {
                        for (var u in users) {
                            if (users[u].nick == users[i].blackList[f]) {
                                $('.page__blackList ul').append('<li><a href="#">' + users[u].name + ' ' + users[u].sname + '</a></li>');
                            };
                        };
                    };
                    $('.page__blackList p').text('');
                } else {
                    $('.page__blackList p').text('Your black list is empty');
                    $('.page__blackList p').text('Your black list is empty');
                };

                if (users[i].posts.length != 0) {
                    for (var x = 0; x < users[i].posts.length; x++) {
                        $('<div class="page__post" id="' + users[i].posts[x].postId + '"><p class="page__postTime">' + users[i].posts[x].time[0] + ':' + users[i].posts[x].time[1] + ' ' + users[i].posts[x].time[2] + '-' + users[i].posts[x].time[3]+ '-' + users[i].posts[x].time[4] + '</p><p class="page__postTitle">' + users[i].posts[x].theme + '</p><p class="page__postText">' + users[i].posts[x].text + '</p></div>').appendTo('.page__blogPosts');

                        $('<form><input type="button" value="edit" class="editPost btnSimple btnYellow"><input type="button" value="remove" class="removePost btnSimple btnRed"></form>').appendTo($('.page__post:last-child'));
                    };
                };

                $('.registration__logIn input:eq(0)').val('');
                $('.registration__logIn input:eq(1)').val('');
                check = true;
                for (i = 0; i <= 5; i++) {
                    regField[i].value = '';
                }
                $('.registration__form textarea').val('');

                $('input[name="status"]:eq(0)').click();
                $('.page__statusMood tr:eq(0) td').html('online');

                $('.registration__form').hide();
                formHide = true;
            };
        };
        if (check == false) {
            alert('wrong nickname or password');
            $('.registration__logIn input:eq(0)').val('');
            $('.registration__logIn input:eq(1)').val('');
        };
    };
    $('.registration__congrats').hide();
    $('.header__menu li:eq(0) a').click();
});

/*--------------- menu ---------------*/

for (var i = 0; i <= 3; i++) {
    $('.header__menu li:eq(' + i + ') a').click(function () {
        $('.header__menu li a').removeClass('header__active');
        $(this).addClass('header__active');
        $('div.aPage').hide();
        $('.' + $(this).attr('title') + '').show();
    });
};

$('.header__menu li:eq(4) a').click(function () {
    $('.page').css('display', 'none');
    $('.registration').css('display', 'flex');
    $('.header__menu').css('display', 'none');
    $('header').css('height', '150px');
    $('#findReset').click();
    $('.profile__friends ul li').remove();
    $('.page__blackList ul li').remove();
    $('.profile__friends table').css('display', 'none');
    $('.page__blackList table').css('display', 'none');
    $('#profile__mood :first').attr('selected', 'selected');
    $('.page__statusMood tr:eq(1) td').html('');
    $('.page__blogPosts').empty();
});

/*--------------- profile ---------------*/

$('input[name="status"]').click(function () {
    var status = $('input[name="status"]:checked').attr('title');
    $('.page__statusMood tr:eq(0) td').html(status);
});

$('#profile__mood').change(function () {
    var mood = $('#profile__mood option:selected').text();
    if (mood == 'mood:') {
        $('.page__statusMood tr:eq(1) td').html('');
    } else {
        $('.page__statusMood tr:eq(1) td').html(mood);
    }
});

$('input[value="edit"]').click(function () {
    var title = $(this).attr('title');
    var nick = $('td[title="nick"]').text();

    for (var i in users) {
        if (users[i].nick == nick) {
            var currentUser = users[i];
            break;
        };
    };

    if (title == "about") {
        var newData = prompt('tell us something new about you:');
        if (newData == null) {
            return;
        };
        currentUser.about = newData;

    } else if (title == "name") {
        var newName = prompt('enter your first name:');
        if (newName == null) {
            return;
        };
        var newSname = prompt('enter your last name:');
        if (newSname == null) {
            return;
        };

        if (newName == '' || newSname == '') {
            alert('none of these fields should not be empty. Please, try again');
            return;
        };

        currentUser.name = newName;
        currentUser.sname = newSname;

    } else if (title == "age") {
        var newAge = +prompt('enter your age:');

        if (isNaN(newAge) == true) {
            alert('incorrect input');
            return;
        } else if (newAge == null || newAge == 0) {
            return;
        };

        currentUser.age = newAge;

    } else {
        var newData = prompt('enter your ' + title + ':');

        if (newData == null) {
            return;
        };

        if (title == 'nick') {
            for (var i in users) {
                if (users[i].nick == newData) {
                    alert('this nickname is already taken. please, choose another one');
                    return;
                };
            };
            for (var i in users) {
                for (var f in users[i].friends) {
                    if (users[i].friends[f] == currentUser.nick) {
                        users[i].friends[f] = newData;
                    };
                };
            };
            for (var i in users) {
                for (var f in users[i].blackList) {
                    if (users[i].blackList[f] == currentUser.nick) {
                        users[i].blackList[f] = newData;
                    };
                };
            };
            currentUser.nick = newData;
        } else if (title == 'country') {
            currentUser.country = newData;
        };
    };

    $('.profile__userData tr:eq(0) td:eq(0)').html(currentUser.name + ' ' + currentUser.sname);
    $('.profile__userData tr:eq(1) td:eq(1)').html(currentUser.nick);
    $('.profile__userData tr:eq(2) td:eq(1)').html(currentUser.age + ' y.o.');
    $('.profile__userData tr:eq(3) td:eq(1)').html(currentUser.country);
    $('.profile__userData tr:eq(4) td:eq(0)').html('<p>about ' + users[i].name + ':</p>' + currentUser.about);
});

/*--------------- people ---------------*/

$('#findPeople').click(function () {
    var x = $('.page__people input:eq(0)').val();
    if (x == '') {
        return;
    };

    $('.page__peopleList li').remove();

    var nameX = '';
    var snameX = '';
    var check = false;

    for (var i in x) {
        if (x[i] != ' ' && check == false) {
            nameX += x[i];
        } else if (x[i] == ' ') {
            check = true;
        } else if (check == true) {
            snameX += x[i];
        };
    };

    for (var i in users) {
        if (users[i].name.toLowerCase() == nameX.toLowerCase() && users[i].sname.toLowerCase() == snameX.toLowerCase()) {
            $('.page__peopleList').append('<li><a href="#">' + users[i].name + ' ' + users[i].sname + '</a></li>');
        } else if (users[i].sname.toLowerCase() == snameX.toLowerCase()) {
            $('.page__peopleList').append('<li><a href="#">' + users[i].nameX + ' ' + users[i].sname + '</a></li>');
        } else if (users[i].sname.toLowerCase() == nameX.toLowerCase()) {
            $('.page__peopleList').append('<li><a href="#">' + users[i].name + ' ' + users[i].sname + '</a></li>');
        };
    };

    if ($('.page__peopleList li').length == 0) {
        alert('no results');
    };

    $('.page__people input:eq(0)').val('');
    $('.page__people table').css('display', 'none');
});

$('#findReset').click(function () {
    $('.page__people input:eq(0)').val('');
    $('.page__peopleList li').remove();
    $('.page__people table').css('display', 'none');
});

$('body').on('click', '.page__peopleList li a', function () {
    for (var i in users) {
        if (users[i].name + ' ' + users[i].sname == $(this).text()) {
            var currentUser = users[i];
            break;
        };
    };

    $('.page__people table').css('display', 'block');

    if ($('.profile__userData tr:eq(1) td:eq(1)').text() == currentUser.nick) {
        $('#addFriend').prop('disabled', true);
        $('#blackList').prop('disabled', true);
        $('#addFriend').removeClass('btnSimple btnBlue');
        $('#blackList').removeClass('btnSimple btnGrey');
    } else {
        $('#addFriend').prop('disabled', false);
        $('#blackList').prop('disabled', false);
        $('#addFriend').addClass('btnSimple btnBlue');
        $('#blackList').addClass('btnSimple btnGrey');
    }

    $('.page__people table tr:eq(0) th').html(currentUser.name + ' ' + currentUser.sname);
    $('.page__people table tr:eq(1) td:eq(1)').html(currentUser.nick);
    $('.page__people table tr:eq(2) td:eq(1)').html(currentUser.age + ' y.o.');
    $('.page__people table tr:eq(3) td:eq(1)').html(currentUser.country);
    $('.page__people table tr:eq(4) td:eq(1)').html(currentUser.about);
});

$('#addFriend').click(function () {
    var addNick = ($('.page__people table tr:eq(1) td:eq(1)').text());
    var currentNick = $('.profile__userData tr:eq(1) td:eq(1)').text();

    for (var i in users) {
        if (users[i].nick == currentNick) {
            var currentUser = users[i];
            break;
        };
    };

    for (var i in users) {
        if (users[i].nick == addNick) {
            var addUser = users[i];
            break;
        };
    };

    if (addUser.blackList.length != 0) {
        for (var i in addUser.blackList) {
            if (addUser.blackList[i] == currentNick) {
                alert('unfotrunately, this user forbade you to add him/her to your friends list');
                return;
            };
        };
    };

    if (currentUser.blackList.length != 0) {
        for (var i in currentUser.blackList) {
            if (currentUser.blackList[i] == addNick) {
                alert('remove this user from your black list before');
                return;
            };
        };
    };

    if (currentUser.friends.length != 0) {
        for (var i in currentUser.friends) {
            if (currentUser.friends[i] == addNick) {
                alert('this user is already your friend');
                return;
            };
        };
    };

    currentUser.friends.push(addNick);

    $('.profile__friends ul').append('<li><a href="#">' + addUser.name + ' ' + addUser.sname + '</a></li>');

    $('.profile__friends p').text('friends list:');

    if ($('.profile__friends ul li').size() > 5) {
        $('.profile__friends ul').css('overflow-y', 'scroll');
    };
});

$('#blackList').click(function () {
    var addNick = ($('.page__people table tr:eq(1) td:eq(1)').text());
    var currentNick = $('.profile__userData tr:eq(1) td:eq(1)').text();

    for (var i in users) {
        if (users[i].nick == currentNick) {
            var currentUser = users[i];
            break;
        };
    };

    for (var i in users) {
        if (users[i].nick == addNick) {
            var addUser = users[i];
            break;
        };
    };

    if (currentUser.friends.length != 0) {
        for (var i in currentUser.friends) {
            if (currentUser.friends[i] == addNick) {
                alert('remove this user from your friends list before');
                return;
            };
        };
    };

    if (currentUser.blackList.length != 0) {
        for (var i in currentUser.blackList) {
            if (currentUser.blackList[i] == addNick) {
                alert('this user is already in your black list');
                return;
            };
        };
    };

    if (addUser.friends.length != 0) {
        for (var i in addUser.friends) {
            if (addUser.friends[i] == currentNick) {
                var x = prompt("you have been added to user's friends list. are you sure that you want to add this user to the black list? you will be automatically removed frome user's friends list. Y/N");
                if (x == 'Y' || x == 'y') {
                    var rem = addUser.friends.indexOf(currentNick);
                    addUser.friends.splice(rem, 1)
                } else {
                    return;
                };
            };
        };
    };

    currentUser.blackList.push(addNick);

    $('.page__blackList ul').append('<li><a href="#">' + addUser.name + ' ' + addUser.sname + '</a></li>');

    $('.page__blackList p').text('');
});

$('body').on('click', '.profile__friends ul li a', function () {
    for (var i in users) {
        if (users[i].name + ' ' + users[i].sname == $(this).text()) {
            var currentUser = users[i];
            break;
        };
    };

    $('.profile__friends table').css('display', 'block');

    $('.profile__friends table tr:eq(0) td:eq(0)').html(currentUser.name + ' ' + currentUser.sname);
    $('.profile__friends table tr:eq(1) td:eq(1)').html(currentUser.nick);
    $('.profile__friends table tr:eq(2) td:eq(1)').html(currentUser.age + ' y.o.');
    $('.profile__friends table tr:eq(3) td:eq(1)').html(currentUser.country);
    $('.profile__friends table tr:eq(4) td:eq(1)').html(currentUser.about);
});

$('body').on('click', '.page__blackList ul li a', function () {
    for (var i in users) {
        if (users[i].name + ' ' + users[i].sname == $(this).text()) {
            var currentUser = users[i];
            break;
        };
    };

    $('.page__blackList table').css('display', 'block');

    $('.page__blackList table tr:eq(0) td:eq(0)').html(currentUser.name + ' ' + currentUser.sname);
    $('.page__blackList table tr:eq(1) td:eq(1)').html(currentUser.nick);
    $('.page__blackList table tr:eq(2) td:eq(1)').html(currentUser.age + ' y.o.');
    $('.page__blackList table tr:eq(3) td:eq(1)').html(currentUser.country);
    $('.page__blackList table tr:eq(4) td:eq(1)').html(currentUser.about);
});

$('body').on('click', '.profile__friends table tr:eq(5) td:eq(0) input', function () {
    var currentNick = $('.profile__userData tr:eq(1) td:eq(1)').text();

    var removeNick = $('.profile__friends table tr:eq(1) td:eq(1)').text();

    for (var i in users) {
        if (users[i].nick == currentNick) {
            var currentUser = users[i];
            break;
        };
    };

    for (var i in currentUser.friends) {
        if (currentUser.friends[i] == removeNick) {
            currentUser.friends.splice(i, 1);
        };
    };

    for (var i = 0; i < $('.profile__friends ul li').size(); i++) {
        if ($('.profile__friends table tr:eq(0) td:eq(0)').text() == $('.profile__friends ul li a:eq(' + i + ')').text()) {
            $('.profile__friends ul li:eq(' + i + ')').remove();
            break;
        }
    };

    if ($('.profile__friends ul li').size() <= 5) {
        $('.profile__friends ul').css('overflow-y', 'visible');
    };

    $('.profile__friends table').css('display', 'none');

    if (currentUser.friends.length == 0) {
        $('.profile__friends p').text('Your friends list is empty :(');
    };
});

$('body').on('click', '.page__blackList table tr:eq(5) td:eq(0) input', function () {
    var currentNick = $('.profile__userData tr:eq(1) td:eq(1)').text();

    var removeNick = $('.page__blackList table tr:eq(1) td:eq(1)').text();

    for (var i in users) {
        if (users[i].nick == currentNick) {
            var currentUser = users[i];
            break;
        };
    };

    for (var i in currentUser.blackList) {
        if (currentUser.blackList[i] == removeNick) {
            currentUser.blackList.splice(i, 1);
        };
    };

    for (var i = 0; i < $('.page__blackList ul li').size(); i++) {
        if ($('.page__blackList table tr:eq(0) td:eq(0)').text() == $('.page__blackList ul li a:eq(' + i + ')').text()) {
            $('.page__blackList ul li:eq(' + i + ')').remove();
            break;
        };
    };

    $('.page__blackList table').css('display', 'none');

    if (currentUser.blackList.length == 0) {
        $('.page__blackList p').text('Your black list is empty');
    };
});

$('body').on('click', '.profile__friends table tr:eq(5) td:eq(1) input', function () {
    $('.profile__friends table').css('display', 'none');
});

$('body').on('click', '.page__blackList table tr:eq(5) td:eq(1) input', function () {
    $('.page__blackList table').css('display', 'none');
});

/*--------------- blog ---------------*/

$('.page__blogTools input:eq(1)').click(function () {
    var themeBlog = $('.page__blogTools input:eq(0)').val();
    var textBlog = $('.page__blogTools textarea').val();

    if (textBlog == '') {
        alert('you cannot make a post without text');
        return;
    };

    var nick = $('td[title="nick"]').text();

    for (var i in users) {
        if (users[i].nick == nick) {
            var currentUser = users[i];
            break;
        };
    };

    var postTime = new Date();

    var postDate = [postTime.getHours().toString(), postTime.getMinutes().toString(), (parseInt(postTime.getMonth()) + 1).toString(), postTime.getDate().toString(), postTime.getFullYear().toString()];
    
    for(var i = 0; i <= 3; i++){
        if(postDate[i].length < 2){
            var tempDate = postDate[i];
            postDate[i] = '0' + tempDate;
        };
    };

    function post() {
        this.time = postDate;
        this.theme = themeBlog;
        this.text = textBlog;
        this.postId = currentUser.posts.length;
    };

    var makePost = new post;

    currentUser.posts.push(makePost);
    currentPost = currentUser.posts[currentUser.posts.length - 1];

    $('<div class="page__post" id="' + currentPost.postId + '"><p class="page__postTime">' + currentPost.time[0] + ':' + currentPost.time[1] + ' ' + currentPost.time[2] + '-' + currentPost.time[3] + '-' + currentPost.time[4] + '</p><p class="page__postTitle">' + currentPost.theme + '</p><p class="page__postText">' + currentPost.text + '</p></div>').appendTo('.page__blogPosts');

    $('<form><input type="button" value="edit" class="editPost btnSimple btnYellow"><input type="button" value="remove" class="removePost btnSimple btnRed"></form>').appendTo($('.page__post:last-child'));

    $('.page__blogTools input:eq(0)').val('');
    $('.page__blogTools textarea').val('');
});

$('body').on('click', '.editPost', function () {
    $('.page__blogEdit').show();
    $('.page__blogTools input:eq(1)').hide();

    var editId = $(this).closest('.page__post').attr('id');

    $('.page__blogTools input:eq(0)').val($('.page__post[id="' + editId + '"] p:eq(1)').text());
    $('.page__blogTools textarea').val($('.page__post[id="' + editId + '"] p:eq(2)').text());

    $('.page__blogEdit input:eq(0)').attr('title', editId);
    $('html, body').animate({scrollTop: 0},500);
});

$('.page__blogEdit input:eq(0)').click(function () {
    var nick = $('td[title="nick"]').text();

    for (var i in users) {
        if (users[i].nick == nick) {
            var currentUser = users[i];
            break;
        };
    };
    
    currentUser.posts[$(this).attr('title')].theme = $('.page__blogTools input:eq(0)').val();
    currentUser.posts[$(this).attr('title')].text = $('.page__blogTools textarea').val();
    
    $('.page__post[id="' + $(this).attr('title') + '"] p:eq(1)').text($('.page__blogTools input:eq(0)').val());
    $('.page__post[id="' + $(this).attr('title') + '"] p:eq(2)').text($('.page__blogTools textarea').val());

    $('.page__blogEdit').hide();
    $('.page__blogTools input:eq(1)').show();

    $('.page__blogTools input:eq(0)').val('');
    $('.page__blogTools textarea').val('');
});

$('.page__blogEdit input:eq(1)').click(function () {
    $('.page__blogEdit').hide();
    $('.page__blogTools input:eq(1)').show();

    $('.page__blogTools input:eq(0)').val('');
    $('.page__blogTools textarea').val('');
});

$('body').on('click', '.removePost', function () {
    var id = $(this).closest('.page__post').attr('id');
    $(this).closest('.page__post').remove();
    var nick = $('td[title="nick"]').text();
    for (var i in users) {
        if (users[i].nick == nick) {
            var currentUser = users[i];
            break;
        };
    };
    for(var post in currentUser.posts){
        if(currentUser.posts[post].postId == id){
            currentUser.posts.splice(post, 1);
        }
    }
    $('.page__blogEdit input:eq(1)').click();
});

/*--------------- buttons ---------------*/

$('.btnGrey').mousedown(function(){
	$(this).css('background', 'linear-gradient(#C0C0C0, #DCDCDC)');
});

$('.btnGrey').mouseup(function(){
	$(this).css('background', 'linear-gradient(#DCDCDC, #C0C0C0)');
});

$('.btnBlue').mousedown(function(){
	$(this).css('background', 'linear-gradient(#00008B, #0000FF)');
});

$('.btnBlue').mouseup(function(){
	$(this).css('background', 'linear-gradient(#0000FF, #00008B)');
});

$('.btnRed').mousedown(function(){
	$(this).css('background', 'linear-gradient(#800000, #FF0000)');
});

$('.btnRed').mouseup(function(){
	$(this).css('background', 'linear-gradient(#FF0000, #800000)');
});

$('.btnYellow').mousedown(function(){
	$(this).css('background', 'linear-gradient(#808000, #FFFF00)');
});

$('.btnYellow').mouseup(function(){
	$(this).css('background', 'linear-gradient(#FFFF00, #808000)');
});

/*--------------- users ---------------*/

var users = [
    {
        name: 'Jack',
        sname: 'Smith',
        nick: 'jSmith',
        pass: '12345',
        age: 23,
        country: 'Ireland',
        about: 'I like fishing and swimming',
        blackList: [],
        friends: [],
        posts: []
    }
]

function user() {
    this.name = name;
    this.sname = sname;
    this.nick = nick;
    this.pass = pass;
    this.age = age;
    this.country = country;
    this.about = about;
    this.blackList = [];
    this.friends = [];
    this.posts = [];
}