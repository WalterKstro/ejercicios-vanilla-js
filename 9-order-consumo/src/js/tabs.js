const wrapperLinks  =   document.querySelector('#nav')
const arrayLinks    =   Array.from(document.querySelectorAll('.tab__link'))
const arrayBody     =   Array.from(document.querySelectorAll('.tab__content'))

export const executeInteractiveTabs = () => wrapperLinks.addEventListener('click', callBackOfEventClick)

function callBackOfEventClick(e){
    const isAnchor = e.target.hasAttribute('href')
    if(isAnchor){
        const anchorText = e.target.textContent.toLowerCase()
        const indexActive = arrayBody.findIndex( ( {id} ) => id == anchorText )
        arrayBody.forEach( activeOrDisabled.bind(this, indexActive) )
    }
}

function activeOrDisabled(index,value,i){
    if(i == index) {
       value.classList.replace('disabled__tab','active__tab')
       arrayLinks[index].classList.replace('disabled__link','active__link')
    }else {
      value.classList.replace('active__tab','disabled__tab')
      arrayLinks[i].classList.replace('active__link','disabled__link')
    }
}
