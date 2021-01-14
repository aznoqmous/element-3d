export default class Element3d {

    constructor(element, options) {
        this.target = element

        this.options = Object.assign({
            speed: 1,
            perspective: 2000,
            maxSpeed: 0.5,
            parent: null
        }, options)

        this.parentElement = (this.options.parent) ? this.options.parent : element.parentElement

        this.isLooping = false

        this.currentRotation = {
            x: null,
            y: null
        }

        this.bind()
    }

    bind(){
        this.parentElement.addEventListener('mouseenter', this.mouseEnter.bind(this))
        this.parentElement.addEventListener('mouseleave', this.mouseLeave.bind(this))
        this.parentElement.addEventListener('mousemove', this.mouseMove.bind(this))
    }

    mouseEnter(event){
        this.targetRotation = this.getRotation(event.pageX, event.pageY)
        this.start()
    }

    mouseLeave(event){
        this.targetRotation = {x: 0, y: 0}
        this.start()
    }

    mouseMove(event){
        this.targetRotation = this.getRotation(event.pageX, event.pageY)
        this.start()
    }

    start(){
        if(this.isLooping) return;
        this.isLooping = true
        this.loop()
    }

    loop(){

        let tx = this.targetRotation.x - this.currentRotation.x
        let ty = this.targetRotation.y - this.currentRotation.y

        let abstot = Math.abs(tx) + Math.abs(ty)

        if(abstot > this.options.maxSpeed || abstot > this.options.maxSpeed) {
            tx = tx / abstot * this.options.maxSpeed
            ty = ty / abstot * this.options.maxSpeed
        }

        if( abstot < 1/1000 ) this.isLooping = false;

        this.currentRotation.x = this.currentRotation.x + tx * this.options.speed / 10
        this.currentRotation.y = this.currentRotation.y + ty * this.options.speed / 10
        this.target.style.transform = this.getTransform(this.currentRotation.x, this.currentRotation.y)

        if(this.isLooping) requestAnimationFrame(this.loop.bind(this))
    }

    getTransform(x, y){
        let rotationX = -y * 360 / 10,
        rotationY = x * 360 / 10
        return `perspective(${this.options.perspective}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
    }

    // x, y = cursor position inside this.parentElement
    getRotation(x, y){
        let rect = this.parentElement.getBoundingClientRect()
        x = (x - rect.x) / rect.width - 1 / 2
        y = (y - window.scrollY - rect.y) / rect.height - 1 / 2
        return {x, y}
    }
}
