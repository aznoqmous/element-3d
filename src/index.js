import Element3d from './element-3d'

document.addEventListener('DOMContentLoaded', ()=>{
  let els = [...document.querySelectorAll('.element')]
  els.map(el => new Element3d(el))
})
