const app = new PIXI.Application({ background: '#1099bb', width:0 });
document.body.appendChild(app.view);

// Css style for icons
const defaultIcon = 'url(\'https://cdn2.iconfinder.com/data/icons/flat-set-2/64/flat_set_2-07-64.png\'),auto';
const hoverIcon = 'url(\'https://pixijs.com/assets/bunny_saturated.png\'),auto';

// Add custom cursor styles to the body element
document.body.style.cursor = defaultIcon;

// Change cursor on mouse enter/leave events
app.view.addEventListener('mouseenter', () => {
  document.body.style.cursor = hoverIcon;
});

app.view.addEventListener('mouseleave', () => {
  document.body.style.cursor = defaultIcon;
});


let target ="Politics"

const containers = [
    document.getElementById("container1"),
    document.getElementById("container2"),
    document.getElementById("container3"),
    document.getElementById("container4"),

]
const textContainers=[
    document.getElementById("text1"),
    document.getElementById("text2"),
    document.getElementById("text3"),
    document.getElementById("text4")
    
]
const images =[
    document.getElementById("image1"),
    document.getElementById("image2"),
    document.getElementById("image3"),
    document.getElementById("image4")
]
const fetchResults = async(targetLocation)=>{
    let url = `https://newsapi.org/v2/everything?q=${targetLocation}&from=2023-05-30&sortBy=publishedAt&apiKey=81c3b0e84eb44195a770b6d84e26a963`;

    const res = await fetch(url);
    const data = await res.json();

    // data.articles.forEach((article) => {
    //     console.log(article.content);
    //   });

    for(let i=0;i<containers.length;i++){
        const article = data.articles[i];

        if(article){
            const title = truncateTitle(article.title);

            containers[i].innerHTML=`${title}`
            const content = truncateContent(article.content);

            textContainers[i].innerHTML = `${content}`

             images[i].src = article.urlToImage;
            // images[i].alt = "Article Image";
         }
}
}
const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    } else {
      return title;
    }
  };
  const truncateContent = (title) => {
    const words = title.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    } else {
      return title;
    }
  };
  
fetchResults(target);