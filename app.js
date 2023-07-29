// jshint eversion:6

const express=require("express");
const bodyParser= require("body-parser");
const mongoose=require('mongoose');
const app = express();
const _ = require('lodash');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


// let items=["Eat","Sleep","Repeat"];
// let workItems=[];

// ///////////////////////////////////////////////////////////
// Creating the mongodb database

mongoose.connect("mongodb+srv://admin-siddharth:siddharth123@cluster0.qaum7zm.mongodb.net/todolistDB",{useNewUrlParser: true});

const itemsSchema={
    name: String
};

const Item = mongoose.model('Item',itemsSchema);

const item1 =new Item({
    name: "Welcome to your todoList!"
});

const item2=new Item({
    name: "Hit the + button to add a new item."
});

const item3=new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems=[item1,item2,item3];

const listSchema ={
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


var day="";
app.get("/", function(req,res){
   var today=new Date;
   var currentDay=today.getDay();
   day="";


   
//    if(currentDay===6 || currentDay===0){
//     day="weekend";
//    }else{
//     day="weekday";
//    }



    // if(currentDay===0){
    //     day="Sunday";
    // }
    // else if(currentDay===1){
    //     day="Monday";
    // }
    // else if(currentDay===2){
    //     day="Tuesday";
    // }
    // else if(currentDay===3){
    //     day="Wednesday";
    // }
    // else if(currentDay===4){
    //     day="Thursday";
    // }
    // else if(currentDay===5){
    //     day="Friday";
    // }
    // else {
    //     day="Saturday";
    // }
    // switch (currentDay) {
    //     case 0:
    //         day="Sunday"
    //         break;
    //     case 1:
    //         day="Monday"
    //         break;
    //     case 2:
    //         day="Tuesday"
    //         break;
    //     case 3:
    //         day="Wednesday"
    //         break;
    //     case 4:
    //         day="Thursday"
    //         break;
    //     case 5:
    //         day="Friday"
    //         break;
    //     case 6:
    //         day="Saturday"
    //         break;
    //     default:
    //         console.log("Error is equal to:"+currentDay);
    //         break;
    // }

    var options={
        weekday:"long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    var day=today.toLocaleDateString("eng-US", options);


    Item.find({}).then(foundItems => {
        // console.log(foundItems);

        if(foundItems.length===0){
            Item.insertMany(defaultItems).then(function (){
                    console.log("Successfully added the items to the database!");
            }).catch(function(err){
                console.log(err);
            });
            res.redirect("/");
        }else{
            res.render('list',{listTitle: "Today", newListItems: foundItems});
        }
       });
});


app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}).then(foundList => {
        if(!foundList){
            // Create a new list
            const list = new List({
                name: customListName,
                items: defaultItems
            });
            list.save();
            res.redirect("/" + customListName);
            // console.log("Doesn't Exists");
        }
        else{
            // Just display the existing one
            res.render("list", {listTitle:foundList.name, newListItems: foundList.items});
            // console.log("Exists");
        }
    }).catch(err => {
        console.log(err);
    });
    
    // console.log(req.params.customListName);
})

app.post("/",function(req,res){
    // console.log(req.body);
    // let item=req.body.newItem;
    // // console.log(item);

    // if(req.body.list==='Work'){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     items.push(item);
    //     res.redirect("/");
    // }
    

    const itemName=req.body.newItem;
    const listName=req.body.list;

    const item = new Item({
        name: itemName,
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name: listName}).then(foundList => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        }).catch(err => {
            console.log(err);
        });
        }
});



app.post("/delete", function(req, res){
    const checkedItemId=req.body.checkbox;
    const listName=req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId).then(nothing => {
            // console.log("Checked item is deleted from the database");
            res.redirect("/");
        }).catch(err => {
            console.log(err);
        });
    }
    else{
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}}).then(ron => {
            res.redirect("/" + listName);
        }).catch(err => {
            console.log(err);
        });
    }
    
    
});


// app.get("/work", function(req,res){
//     res.render('list', {listTitle: "Work List", newListItems: workItems});
// });

// app.post("/work", function(req,res){
    
//     let item=req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });

app.get("/about", function(req,res){
    res.render('about');
});

app.listen(6969, function(){
    console.log("Server is running on the port 6969");
});