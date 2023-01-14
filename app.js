document.body.innerHTML = '';
document.body.style.background="white";
var counter=0;
var area=document.createElement("hr");
var flag=false;
var catScr=document.createElement("div");
var  catImg=document.createElement("img");
var interval;
var model={
   
    init:function(){
        var srcs=["patty.jpg","possy.jpg","kiky.jpg","tom.jpg","tara.jpg"];
        
        return srcs;
    },
    //retutn the name of cats without jpg extension
    getCatsNames:function(){
        var srcs=this.init();
        var catsName=[];
        for (i=0;i<srcs.length;i++){
            var strArr=srcs[i].split(".");
            catsName[i]=strArr[0];
        }
        return catsName;

    }
};
var octopus={
    addCatsList:function(){
        
        var catsName=model.getCatsNames();
       for (i=0;i<catsName.length;i++){
            catsView.addButton(catsName[i]);

       }
        
    },
    
    
    createCatArea:function(catImg){
        catView.playingArea(catImg);
    },
    catClicks:function(img){
        catView.writeNumOfClicks(img);


    }
   

    

};
var catView={
   //create the playing area
   playingArea:function(img){
        console.log("play Here");
        area.style="border:1px blue solid;width: 900px;height: 600px;";
        area.className="catArea";
        document.body.appendChild(area);
        var coords=area.getBoundingClientRect();
        this.moveCat(img,coords.x,coords.y,coords.right,coords.bottom);

   },
   // loop over random position of cat image to change it's location 
   moveCat:function(movedCat,min_X,min_y,max_X,max_y){
    var self=this;

        interval=setInterval(() => {
            console.log("move");
            var catxy = self.getRandomPosition(movedCat,min_X,min_y,max_X,max_y);
            movedCat.style.left = catxy[0] + "px";
            movedCat.style.top = catxy[1] + "px";
            document.body.appendChild(movedCat);
        }, 2000);      
    
    
        
            
    
   
     
            
        },
   getRandomPosition:function(movedCat,min_X,min_y,max_X,max_y){
    var catx = (max_X-min_X);
    var caty = (max_y-min_y);
    var randomX = Math.floor(Math.random() * (catx+1))+(min_X);
    var randomY = Math.floor(Math.random() * (caty+1))+(min_y);
    return [randomX, randomY];
},
//write number of clicks next to the name of the selected cat
   writeNumOfClicks:function(img){
    if(flag===true){
        catScr.innerHTML='';
        flag=false;
        console.log("new cat is clicked!")
    }
    
    
        counter+=1;


    
    catScr.className="Scr";
    catScr.innerHTML=img.className+":"+ counter;
    document.body.appendChild(catScr);
   
    
}
   

};
var catsView={
    //firstly add buttons to start the game and add the event listnerto the buttons and to the images of cats
    
    addButton:function(catName){
        
       
        var catButton=document.createElement("button");
        catButton.innerHTML=catName;
        catButton.className=catName;
        catButton.style.cssText="border: 1px solid black; background-color:orange;height: 30px;width: 60px;color:white";
        catButton.addEventListener("click",function(catName){
            console.log("buttonclick");
            flag=true;
            counter=0;
            clearInterval(interval);
            catImg.src=this.innerHTML+".jpg";
            catImg.className=this.className;
            catImg.addEventListener('click',function(){
                
                octopus.catClicks(catImg);
                console.log(counter);
                
            })
            octopus.createCatArea(catImg);});
        document.body.appendChild(catButton);
        
            
        
    }

};

octopus.addCatsList();