const express=require("express")
const app=express()
const bodyparser=require('body-parser')

const multer=require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/asserts/productImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})
 
var upload = multer({ storage: storage })

const jwt=require('jsonwebtoken')
const secretKey="flipzon"
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'kalai',
  database:'flipzon'
})

client.connect().then(()=>{console.log("Successfully connected")}).catch((e)=>{console.log(e)})

//client.query(`SELECT id, name, email, address, phone, password FROM "User"`).then((r)=>console.log(r.rows))
app.post('/register',(req,res)=>{
  name=req.body.User.name
  email=req.body.User.email
  address=req.body.User.address
  phone=req.body.User.phone
  password=req.body.User.password

  client.query(`SELECT * FROM "User" WHERE  (name=$1) OR (email=$2)`,[name,email],(err,result)=>{
        if(result.rows.length==0){
          client.query(`INSERT INTO "User"(name,email,address,phone,password) values($1,$2,$3,$4,$5)`,[name,email,address,phone,password],(err,result)=>{
              if(result.rowCount>0){
                token=jwt.sign(req.body.User,secretKey)
                return res.send(token)
              }
          })
        }
        else{
          return res.send("")
        }
    })

})

app.post('/login',(req,res)=>{
    username=req.body.User.username
    password=req.body.User.password
    client.query(`SELECT * FROM "User" WHERE  (name=$1 AND password=$2) OR (email=$1 AND password=$2)`,[username,password],(err,result)=>{
        if(result.rows.length==0){
          return res.send("")
        }
        token=jwt.sign(result.rows[0],secretKey)
        return res.send(token)
    })
})


// client.query(`SELECT p.pid,p.productname,p.rate,p.description,p.rating,c.category,b.brand FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,["SmartPhones"],(err,result)=>{
//   console.log(result.rows)
// })


app.get('/getProducts',(req,res)=>{
  category=req.query.category
  client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,[category],(err,result)=>{
        if(result.rowCount==0){
          return res.send([])
        }
        res.send(result.rows)
  })
})



app.post('/buyproduct',(req,res)=>{
  uid=req.body.Data.uid
  pid=req.body.Data.pid
  quantity=req.body.Data.quantity
  totalrate=req.body.Data.totalRate
  buyingdate=req.body.Data.buyingDate
  //console.log(buyingdate)
  client.query(`INSERT INTO "Buy"(uid,pid,quantity,total_amount,buying_date) VALUES($1,$2,$3,$4,$5)`,[uid,pid,quantity,totalrate,buyingdate],(err,result)=>{
    if(err){
      console.log(err)
      return res.send([])
    }
    else{
      return res.send([req.body.Data])
    }
  })
  // return res.send([req.body.Data])
})

app.post('/addtocart',(req,res)=>{
  uid=req.body.Product.uid
  pid=req.body.Product.pid
  //console.log(buyingdate)
  client.query(`SELECT * FROM "Cart" WHERE uid=$1 AND pid=$2`,[uid,pid],(err,result)=>{
    if(result.rowCount==0){
      client.query(`INSERT INTO "Cart"(uid,pid) VALUES($1,$2)`,[uid,pid],(err,result)=>{
        if(err){
          return res.send([])
        }
        else{
          return res.send([req.body.Data])
        }
      })
    }
    else{
      return res.send("Error")
    }
  })
  // return res.send([req.body.Data])
})

app.post('/cart',(req,res)=>{
  uid=req.body.User.uid
  client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Cart" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[uid],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(result.rows)
    }
  })
})

app.post('/orderedProducts',(req,res)=>{
  uid=req.body.User.uid
  client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Buy" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[uid],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      //console.log(result.rows)
      res.send(result.rows)
    }
  })
})

app.post('/deleteCart',(req,res)=>{
  cid=req.body.Data.cid
  uid=req.body.Data.uid
  client.query(`DELETE FROM "Cart" WHERE cart_id=$1`,[cid],(err,result)=>{
    client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Cart" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[uid],(err,result)=>{
      if(err){
        console.log(err)
      }
      else{
        res.send(result.rows)
      }
    })
  })

})

app.post("/getCartCount",(req,res)=>{
    uid=req.body.User.uid
    client.query(`SELECT * FROM "Cart" WHERE uid=$1`,[uid],(err,result)=>{
      res.send([result.rowCount])
    })
})

app.post("/cancelProduct",(req,res)=>{
  buyid=req.body.Product.buyid
  client.query(`Update "Buy" SET status=2 where buyid=$1`,[buyid],(err,result)=>{
    if(!err){
      res.send(['success'])
    }
    else{
      return res.send([])
    }
  })
})



app.get('/getOfferedProducts',(req,res)=>{
  client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.discount>0`,(err,result)=>{
        if(result.rowCount==0){
          return res.send([])
        }
        res.send(result.rows)
  })
})

// app.post('/addReview',(req,res)=>{
//   pid=req.body.Review.pid
//   uid=req.body.Review.uid
//   review=req.body.Review.review

// })


app.post('/adminLogin',(req,res)=>{
  adminname=req.body.Admin.adminname
  password=req.body.Admin.password
  client.query(`SELECT * FROM "Admin" WHERE  (admin_name=$1 AND password=$2) OR (admin_mail=$1 AND password=$2)`,[adminname,password],(err,result)=>{
      if(result.rows.length==0){
        return res.send("")
      }
      token=jwt.sign(result.rows[0],secretKey)
      return res.send(token)
  })
})

app.get('/getCategories',(req,res)=>{
  client.query(`SELECT * FROM "Category"`,(err,result)=>{
    if(!err){
      return res.send(result.rows)
    }
    else{
      return res.send([])
    }
  })
})

app.post('/addCategory',(req,res)=>{
  category=req.body.Category
  client.query(`INSERT INTO "Category"(category) VALUES($1)`,[category],(err,result)=>{
    if(!err){
      client.query(`SELECT * FROM "Category"`,(err,result)=>{
        if(!err){
          return res.send(result.rows)
        }
        else{
          return res.send([])
        }
      })
    }
    else{
      console.log(err)
    }
  })

})

app.get('/getBrands',(req,res)=>{
  client.query(`SELECT b.bid,b.brand,c.category FROM "Brands" AS b ,"Category" AS c WHERE c.category=ANY(b.categories::text[]) ORDER BY b.bid DESC`,(err,result)=>{
    if(!err){
      return res.send(result.rows)
    }
    else{
      return res.send([])
    }
  })
})


app.post('/addBrand',(req,res)=>{
  categories="{"
  for (let i=0;i<req.body.Brand.CategoryList.length;i++){
      if(i==req.body.Brand.CategoryList.length-1){
        categories+=req.body.Brand.CategoryList[i]
      }
      else{
        categories+=req.body.Brand.CategoryList[i]+","
      }
  }
  categories+="}"
  brand=req.body.Brand.brand
  console.log(categories)
  client.query(`INSERT INTO "Brands"(brand,categories) VALUES($1,$2)`,[brand,categories],(err,result)=>{
    if(!err){
      client.query(`SELECT b.brand,c.category FROM "Brands" AS b ,"Category" AS c WHERE c.category=ANY(b.categories::text[]) ORDER BY b.bid DESC`,(err,result)=>{
        if(!err){
          //console.log(result.rows)
          return res.send(result.rows)
        }
        else{
          return res.send([])
        }
      })
    }
    else{
      console.log(err)
    }
  })

})


app.get("/allProducts",(req,res)=>{
  client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images,c.cid,b.bid FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid in (SELECT cid FROM "Category") ORDER BY p.pid DESC`,(err,result)=>{
    if(result.rowCount==0){
      return res.send([])
    }
    res.send(result.rows)
  })
})

app.post('/addNewProduct',upload.array('images',12),(req,res)=>{
  productname=req.body.name
  brand=req.body.brand
  category=req.body.category
  description=req.body.description
  rate=req.body.rate
  rating=req.body.rating
  images="{"
  for (let i=0;i<req.files.length;i++){
      if(i==req.files.length-1){
        images+=req.files[i].filename
      }
      else{
        images+=req.files[i].filename+","
      }
  }
  images+="}"
  client.query(`INSERT INTO "Products" (productname,bid,cid,description,rate,images,rating) VALUES($1,$2,$3,$4,$5,$6,$7)`,[productname,brand,category,description,rate,images,rating],(err,result)=>{
    if(!err){
      return res.send(['Success'])
    }
    else{
      console.log(err)
    }
  })
})

app.post('/allOrders',(req,res)=>{
  cid=req.body.cid
  client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Buy" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND d.cid=b.cid AND c.id=a.uid AND e.bid=b.bid AND b.cid=$1`,[cid],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
      //console.log(result.rows)
      return res.send(result.rows)
    }
  })
})

app.post('/addDates',(req,res)=>{
  buyid=req.body.Dates.buyid
  shipping=req.body.Dates.shipping
  delivery=req.body.Dates.delivery

  client.query(`UPDATE "Buy" SET shiping_date=$1 , delivery_date=$2, status=3 WHERE buyid=$3 `,[shipping,delivery,buyid],(err,result)=>{
    if(!err){
      return res.send(["Success"])
    }
    else{
      console.log(err)
    }
  })
})

app.post('/addReview',(req,res)=>{
  uid=req.body.Data.uid
  pid=req.body.Data.pid
  buyid=req.body.Data.buyid
  rating=req.body.Data.rating
  review=req.body.Data.review
  date=new Date()
  
  client.query(`INSERT INTO "Reviews"(buyid,uid,pid,rating,review,uploaded_date) VALUES($1,$2,$3,$4,$5,$6)`,[buyid,uid,pid,rating,review,date],(err,result)=>{
    if(!err){
      return res.send(['Success'])
    }
    else{
      console.log(err)
    }
  })

})

app.post('/getReviews',(req,res)=>{
  pid=req.body.Data.pid

  client.query(`SELECT r.*,u.name,u.email FROM "Reviews" AS r,"User" AS u WHERE r.uid=u.id AND pid=$1`,[pid],(err,result)=>{
    if(!err){
      //console.log(result.rows)
      return res.send(result.rows)
    }
    else{
      console.log(err)
    }
  })
})

app.post('/allReviews',(req,res)=>{
  uid=req.body.Data
  console.log(uid)
  client.query(`SELECT * from "Reviews" WHERE uid=$1`,[uid],(err,result)=>{
    if(!err){
      console.log(result.rows)
      return res.send(result.rows)
    }
    else{
      console.log(err)
    }
  })
})



app.listen(process.env.PORT|4200,(err)=>{
    console.log("Connected to the server...",process.env.PORT|4200)
})