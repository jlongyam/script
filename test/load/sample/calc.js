script({ name: 'calc', require: ['sample/one.js', 'sample/two.js', 'sample/three.js'] })

function calc() {
  [one,two,three].forEach(function(val){
    console.log(val)
  })
}