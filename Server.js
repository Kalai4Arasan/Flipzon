const express=require("express")
const app=express()
const bodyparser=require('body-parser')
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
  client.query(`SELECT p.pid,p.productname,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,[category],(err,result)=>{
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
  client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Buy" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[6],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{
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

app.listen(process.env.PORT|4200,(err)=>{
    console.log("Connected to the server...",process.env.PORT|4200)
})