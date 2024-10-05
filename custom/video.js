
// second convart start
function timeFindOut(time) {
  let year = parseInt(time / 31536000);
  let remain = time % 31536000;

  let day = parseInt(remain / 86400); 
  remain = remain % 86400;

  let hour = parseInt(remain / 3600); 
  remain = remain % 3600;

  let minutes = parseInt(remain / 60);
  remain = remain % 60; 

  let result = '';

  if (year > 0) result += `${year} year `;
  if (day > 0) result += `${day} day `;
  if (hour > 0) result += `${hour} hour `;
  if (minutes > 0) result += `${minutes} minute `;
  
  return result.trim() + ' ago';
}

// second convart end


// active class remove start
const removeActive = () =>{
  const classGet = document.getElementsByClassName('category-btn')
  for(button of classGet){
    button.classList.remove('active')
  }
}




// fetch buttons load start
const buttonLoad = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => buttonDisplay(data.categories))
  .catch(error => console.log(error))
}
// fetch buttons load end




// buttons display start
const buttonDisplay = (category) => {
  const buttonIdGet = document.getElementById('buttonContainer')
  category.forEach((items) => {
    const buttonContainer = document.createElement('div')
    buttonContainer.innerHTML = `
     <button id='btn-${items.category_id}' onclick='categoryVideo(${items.category_id})' class='btn category-btn'>${items.category}</button>
   `
    buttonIdGet.appendChild(buttonContainer)
  })
}
// buttons display end
buttonLoad()


  // fetch load button category  (3) number start
  const categoryVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    removeActive()
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add('active')
    console.log(activeBtn)
    displayVideo(data.category)
  })
  .catch(error => console.log(error))
   console.log(id)
  }
  // fetch load button category  (3) number End





// fetch load video start
const videoCardLoad = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideo(data.videos))
  .catch(error => console.log(error))
}
// fetch load video end



// load video display start
const displayVideo = (videos) => {
  const gridContainer = document.getElementById('gridContainer')
  gridContainer.innerHTML=""
  if(videos.length == 0){
    gridContainer.classList.remove('grid')
  gridContainer.innerHTML=`
  <div class=' h-[500px] flex items-center flex-col justify-center'>
  <img src="assets/Icon.png"/>
   <p>No Data</p>
  </div>
  `
  } else{
    gridContainer.classList.add('grid')

  }
  videos.forEach((video) => {
    const makeDiv = document.createElement('div')
    console.log(video)
    makeDiv.classList = ('card bg-base-100 mt-10')
    makeDiv.innerHTML = `
       <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="rounded-xl w-full h-full object-cover" />
      ${video.others.posted_date.length == 0 ? '' : `<span class='absolute bottom-2 right-2 bg-black rounded-sm p-1 text-white/70 text-xs'>
      ${timeFindOut(video.others.posted_date)}
      </span>` }
      
  </figure>
  <div class="">

  <div class="flex  mt-4 gap-3">
    <img class='w-10 h-10 rounded-full ring-1 ring-green-500 p-1' src=${video.authors[0].profile_picture}/>
    <h2 class='font-bold text-xl'>${video.title}</h2?
  </div>

  <div class='flex gap-3 items-center'>
    <p class=' font-normal text-gray-600'>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified == true ? `<img class='w-4 h-4' src='https://img.icons8.com/?size=16&id=h5ARXnFVFdPI&format=png'/>` : ''}
    
  </div>

    <p class=' font-normal text-gray-600'>${video.others.views}</p>

    
  </div>
    `
    gridContainer.appendChild(makeDiv)
  })
}
// load video display end
videoCardLoad()