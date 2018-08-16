const mongoose = require("mongoose");
const Group = require("./models/Group");
const Comment   = require("./models/comment");

const data = [
    {
        name: "Imperial Outpost D&D",
        image: "https://vignette.wikia.nocookie.net/dnd4/images/a/a1/Aventuras_en_la_Marca_del_Este_gaming_group.jpg/revision/latest?cb=20130714033450",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Megaton Games Pathfinder",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxc4LNFtV0t2EUyuUFDEMhfS_heCYAnIkAz869ZsYRuVfuoLq",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "West Elm Vampire",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMb1XtxagbSk4oFde6I09sOLC4psmbxB9WMkLDOEGwPuVZpW0L",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

const seedDB = () => {
   //Remove all Groups
   Group.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Groups!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few Groups
            data.forEach(function(seed){
                Group.create(seed, function(err, Group){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a Group");
                        //create a comment
                        Comment.create(
                            {
                                text: "This group is great, but I wish there were more snacks",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    Group.comments.push(comment);
                                    Group.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
